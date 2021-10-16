const { autorizationError } = require('../utils/db');

class AutorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = autorizationError;
  }
}

module.exports = AutorizationError;
