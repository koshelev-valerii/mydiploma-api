const jwt = require('jsonwebtoken');
const { USER_NOT_FOUND, USER_HAS_REGISTERED } = require('../configs/constants');
const { NotFoundError, BadRequestError } = require('../errors');
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

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return User.create({
          email,
          password,
          name,
        })
          .then((users) => {
            const NewUser = users;
            NewUser.password = '********';
            res.send({ data: users });
          })
          .catch(next);
      }
      throw new BadRequestError(USER_HAS_REGISTERED);
    })
    .catch(next);
};


module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .select('-_id')
    .select('-password')
    .select('-__v')
    .then((users) => {
      if (!users) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send({ data: users });
    })
    .catch(next);
};
