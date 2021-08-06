const { serverError, serverErrorText } = require('../utils/db');

module.exports = (error, req, res, next) => {
  const { statusCode = serverError, message } = error;
  res
    .status(statusCode)
    .send({
      message: statusCode === serverError
        ? serverErrorText
        : message,
    });
  next();
};
