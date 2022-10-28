const { celebrate, Joi } = require('celebrate');
const movieRouter = require('express').Router();

const regularExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

movieRouter.get('/movies', getMovies);

movieRouter.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regularExp),
      trailerLink: Joi.string().required().pattern(regularExp),
      thumbnail: Joi.string().required().pattern(regularExp),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

movieRouter.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;
