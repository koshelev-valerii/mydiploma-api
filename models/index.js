const Article = require('./article');
const User = require('./user');

module.exports = (app) => {
  app.set('models', { Article, User });

  return app;
};
