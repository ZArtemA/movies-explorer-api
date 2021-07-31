const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const ForbiddenError = require('../errors/forbidden-err');

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
        throw new RequestError('Переданы некорректные данные при создании фильма.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      const movieUserId = movie.owner.toString();
      const UserId = req.user._id;
      if (movieUserId !== UserId) {
        throw new ForbiddenError('Нельзя удалить чужой фильм.');
      }
      movie.remove();
      return res.send(movie);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Фильм с указанным _id не найдена.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      next(error);
    })
    .catch(next);
};
