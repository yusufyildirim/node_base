
const Joi = require('../utils/joi');
const redis = require('../redis');
const { User } = require('../models');
const { LogicError } = require('../utils/errors');
const hash = require('../utils/hash');
const { auth } = require('../middlewares');

async function register(req, res, next) {
  try {
    const params = await Joi.validate(req.body, User.schema);
    const { email, password } = params;

    const isUserExists = await User
      .query()
      .where('email', email)
      .first();

    if (isUserExists) throw new LogicError('user_exists');

    const user = await User
      .query()
      .insert({ ...params, password: hash.password(password) });

    const token = auth.generateToken(user.id);

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
}

async function login(req, res, next) {
  try {
    const params = await Joi.validate(req.body, User.schema);
    const { email, password } = params;

    const user = await User
      .query()
      .where('email', email)
      .first();

    if (!user) throw new LogicError('username_password_wrong');
    const isPasswordMatches = hash.compare(password, user.password);
    if (!isPasswordMatches) throw new LogicError('username_password_wrong');

    const token = auth.generateToken(user.id);
    const tokens = await redis.getAccessTokens(user.id) || {};

    // if mobile device and web can access same time send Platform in header
    const platform = req.get('Platform');

    if (platform && platform === 'mobile') {
      tokens.mobile = token;
    } else {
      tokens.web = token;
    }
    await redis.setAccessToken({ userId: user.id, tokens });

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  register,
  login,
};
