const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const AutorizationError = require('../errors/authorization-err');
const MongoError = require('../errors/mongo-err');
const {
  userIdNotFound,
  IdNotValid,
  userIncorrect,
  userAlreadyExist,
  userCreateIncorrect,
  userDublicateEmail,
  errorUserorPassword,
  userExit,
} = require('../utils/db');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getLoggedUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError(userIdNotFound);
      }
      if (error.name === 'CastError') {
        throw new RequestError(IdNotValid);
      }
      next(error);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new RequestError(userIncorrect);
      }
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new MongoError(userAlreadyExist);
      }
      next(error);
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError(userIdNotFound);
      }
      if (error.name === 'CastError') {
        throw new RequestError(IdNotValid);
      }
      if (error.name === 'ValidationError') {
        throw new RequestError(userCreateIncorrect);
      }
      if (error.codeName === 'DuplicateKey') {
        throw new MongoError(userDublicateEmail);
      }
      next(error);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },

      );
      return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7 }).send({ token });
    })
    .catch(() => {
      next(new AutorizationError(errorUserorPassword));
    });
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: userExit });
};
