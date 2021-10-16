const { conflictRequestError } = require('../utils/db');

class MongoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictRequestError;
  }
}

module.exports = MongoError;
