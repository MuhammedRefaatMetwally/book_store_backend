const RuntimeError = require("./runtime_error");

class ResourceNotFoundError extends RuntimeError {

  constructor(resource, field, value) {
    const message = `${resource} with ${field}: ${value} is not found.`;
    super(message, 404);
    this.name = this.constructor.name || "ResourceNotFoundError";
    this.details = { resource, field, value };
  }
  
}

module.exports = ResourceNotFoundError;
