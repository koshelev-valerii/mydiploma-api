const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const celebrateArticles = celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).unknown(),
});

module.exports = celebrateArticles;
