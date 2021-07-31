const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.string().required().min(2).max(30),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    movieId: Joi.string().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    image: Joi.string()
      .pattern(/^(http:|https:)\/\/(w{3}\.)?[^а-яё\s]*$/)
      .required().min(2)
      .max(80),
    trailer: Joi.string()
      .pattern(/^(http:|https:)\/\/(w{3}\.)?[^а-яё\s]*$/)
      .required().min(2)
      .max(80),
    thumbnail: Joi.string()
      .pattern(/^(http:|https:)\/\/(w{3}\.)?[^а-яё\s]*$/)
      .required().min(2)
      .max(80),
  }),
}),
postMovie);

router.delete('/:movieId ', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}),
deleteMovie);

module.exports = router;
