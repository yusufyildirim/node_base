const { User } = require('../models');
const { LogicError } = require('../utils/errors');
const hash = require('../utils/hash');
const { auth } = require('../middlewares');

async function register(req, res, next) {
  const { email, password, firstname, lastname } = req.body;

  try {
    const isUserExists = await User
      .query()
      .where('email', email)
      .first();

    if (isUserExists) throw new LogicError('user_exists');

    const user = await User
      .query()
      .insert({
        email: email.toLowerCase(),
        password: hash.password(password),
        firstname,
        lastname,
      })
      .catch(() => { throw new LogicError('unable_to_create_user'); });

    const token = auth.generateToken(user.id);

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User
      .query()
      .where('email', email.toLowerCase())
      .first();

    if (!user) throw new LogicError('username_password_wrong');

    const isPasswordMatches = hash.compare(password, user.password);
    if (!isPasswordMatches) throw new LogicError('username_password_wrong');

    const token = auth.generateToken(user.id);

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  register,
  login,
};
