const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  IdNotValid,
  movieCreateIncorrect,
  deleteMovieForbid,
  movieDeleted,
  movieIdNotFound,
} = require('../utils/db');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new RequestError(movieCreateIncorrect);
      }
      next(error);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      const movieUserId = movie.owner.toString();
      const UserId = req.user._id;
      if (movieUserId !== UserId) {
        throw new ForbiddenError(deleteMovieForbid);
      }
      return movie.remove()
        .then(() => res.send({ message: movieDeleted }));
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError(movieIdNotFound);
      }
      if (error.name === 'CastError') {
        throw new RequestError(IdNotValid);
      }
      next(error);
    })
    .catch(next);
};
