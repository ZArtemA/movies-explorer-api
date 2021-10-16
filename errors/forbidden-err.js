const { forbiddenError } = require('../utils/db');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbiddenError;
  }
}

module.exports = ForbiddenError;
