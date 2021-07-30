const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
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
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new RequestError('Переданы некорректные данные при создании карточки.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      const cardUserId = card.owner.toString();
      const UserId = req.user._id;
      if (cardUserId !== UserId) {
        throw new ForbiddenError('Нельзя удалить чужую карточку.');
      }
      card.remove();
      return res.send(card);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      next(error);
    })
    .catch(next);
};
