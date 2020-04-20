const { NotFoundError, ForbiddenError } = require('../errors');
const { ARTICLE_NOT_FOUND, NOT_OWNER } = require('../configs/constants');

const Articles = require('../models/article');


module.exports.getArticles = (req, res, next) => {
  const user = req.user._id;

  Articles.find({})
    .select('+owner')
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError(ARTICLE_NOT_FOUND);
      } return articles;
    })
    .then((articles) => {
      const arr = [];
      articles.forEach((elem) => {
        if (elem.owner.toString() === user) {
          arr.push(elem);
        }
      });

      res.send(arr);
    })
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Articles.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};


module.exports.deleteArticle = (req, res, next) => {
  const user = req.user._id;

  Articles.findById(req.params.articleId)
    .select('+owner')
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError(ARTICLE_NOT_FOUND);
      } return articles;
    })
    .then((articles) => {
      if (!(articles.owner.toString() === user)) {
        throw new ForbiddenError(NOT_OWNER);
      }

      Articles.findByIdAndRemove(req.params.articleId)
        .then((article) => {
          res.send({ data: article });
        })
        .catch(next);
    })
    .catch(next);
};
