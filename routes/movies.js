const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');
const { unvalidImage, unvalidTrailer, unvalidThumbnail } = require('../utils/db');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(unvalidImage);
    }),
    trailer: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(unvalidTrailer);
    }),
    thumbnail: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(unvalidThumbnail);
    }),
  }),
}),
postMovie);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number(),
  }).unknown(true),
}),
deleteMovie);

module.exports = router;
