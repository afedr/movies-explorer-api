const defaultRoute = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

defaultRoute.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});


module.exports = defaultRoute;
