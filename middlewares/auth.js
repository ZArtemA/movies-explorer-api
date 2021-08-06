const jwt = require('jsonwebtoken');
const { authRequired } = require('../utils/db');
const AutorizationError = require('../errors/authorization-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AutorizationError(authRequired));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' });
  } catch (error) {
    next(new AutorizationError(authRequired));
  }
  req.user = payload;
  next();
};
