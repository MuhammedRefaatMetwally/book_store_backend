class RuntimeError extends Error {
    constructor(message, statusCode = 500, details = null) {
      super(message);
      this.name = this.constructor.name || "RuntimeError";
      this.statusCode = statusCode;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = RuntimeError;