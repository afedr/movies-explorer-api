
const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movie');

movieRouter.get('/movies', getMovies);


movieRouter.post('/movies', createMovie);


movieRouter.delete('/movies/:_id', deleteMovie);

module.exports = movieRouter;