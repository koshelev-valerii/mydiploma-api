const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../errors');
const { INVALID_EMAIL_OR_PASSWORD } = require('../configs/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value}${INVALID_EMAIL_OR_PASSWORD}`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync([this.password, this.salt].join(), 10);
  next();
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .select('+salt')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD);
      }

      return bcrypt.compare([password, user.salt].join(), user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('User', userSchema);
