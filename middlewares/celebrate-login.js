const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const celebrateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).unknown(),
});

module.exports = celebrateLogin;
