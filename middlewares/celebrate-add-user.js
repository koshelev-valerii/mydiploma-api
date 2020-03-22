const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const celebrateAddUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).unknown(),
});

module.exports = celebrateAddUser;
