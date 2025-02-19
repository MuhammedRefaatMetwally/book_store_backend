const logger = (res, req, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = logger;
