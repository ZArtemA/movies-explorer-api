const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
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
  }).unknown(true),
}),
deleteMovie);

module.exports = router;
