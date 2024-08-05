class HTTPError extends Error {
  constructor(statusCode, message, context) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}

module.exports = { HTTPError };
