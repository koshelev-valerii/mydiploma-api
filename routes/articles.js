const router = require('express').Router();
const celebrateArticles = require('../middlewares/celebrate-articles');
const { getArticles, addArticle, deleteArticle } = require('../controllers/articles');

router.get('/articles', getArticles);
router.post('/articles', celebrateArticles, addArticle);
router.delete('/articles/:articleId', deleteArticle);

module.exports = router;
