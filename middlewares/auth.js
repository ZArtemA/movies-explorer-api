const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/authorization-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AutorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' });
  } catch (error) {
    next(new AutorizationError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
