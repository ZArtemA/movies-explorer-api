const { requestError } = require('../utils/db');

class RequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = requestError;
  }
}

module.exports = RequestError;
