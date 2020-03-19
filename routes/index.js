const { Joi } = require('celebrate');
const joiObjectId = require('joi-objectid');
const router = require('express').Router();

const { NotFoundError } = require('../errors');
const { NOT_FOUND } = require('../configs/constants');

const users = require('./users');
const articles = require('./articles');

Joi.objectId = joiObjectId(Joi);

router.use(users);
router.use(articles);
router.all('*', () => new NotFoundError(NOT_FOUND));

module.exports = router;
