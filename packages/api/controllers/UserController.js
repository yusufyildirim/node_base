const Joi = require('../utils/joi');
const { User } = require('../models');


/*
 *
 * USER OPERATIONS
 *
 */
async function userList(req, res, next) {
  try {
    const { page, pageSize, search, column, order } = await Joi.validate(req.query, User.filters);

    const data = await User
      .query()
      .modify((queryBuilder) => {
        if (search) {
          const term = `%${search}%`;
          queryBuilder.where('firstname', 'like', term);
          queryBuilder.orWhere('lastname', 'like', term);
        }
      })
      .page(page, pageSize)
      .orderBy(column, order);

    return res.json(data);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

module.exports = {
  /* USER OPERATIONS */
  userList,
};
