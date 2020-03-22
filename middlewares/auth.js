const jwt = require('jsonwebtoken');
const { INVALID_EMAIL_OR_PASSWORD, UNAUTHORIZED } = require('../configs/constants');
const { UnauthorizedError } = require('../errors');
const { SECRET_STRING } = require('../configs/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD);
  }

  req.user = payload;

  next();
};
