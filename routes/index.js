const { Joi } = require('celebrate');
const joiObjectId = require('joi-objectid');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const celebrateLogin = require('../middlewares/celebrate-login');
const celebrateAddUser = require('../middlewares/celebrate-add-user');
const { login, createUser } = require('../controllers/users');

const { NotFoundError } = require('../errors');
const { NOT_FOUND } = require('../configs/constants');

const users = require('./users');
const articles = require('./articles');

Joi.objectId = joiObjectId(Joi);

router.post('/signin', celebrateLogin, login);
router.post('/signup', celebrateAddUser, createUser);

router.use(auth);

router.use(users);
router.use(articles);
router.all('*', () => new NotFoundError(NOT_FOUND));

module.exports = router;
