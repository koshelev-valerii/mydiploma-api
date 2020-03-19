const jwt = require('jsonwebtoken');
const { USER_NOT_FOUND } = require('../configs/constants');
const { NotFoundError } = require('../errors');
const User = require('../models/user');
const { SECRET_STRING } = require('../configs/config');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_STRING,
        { expiresIn: '7d' },
      );

      return res
        .set({
          authorization: `Bearer ${token}`,
        })
        .cookie('jwt', {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  return User.create({
    email,
    password,
    name,
  })
    .then((users) => {
      users.password = '********';
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      users.password = '********';
      res.send({ data: users });
    })
    .catch(next);
};
