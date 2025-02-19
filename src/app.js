const express = require("express");
const booksRouter = require("./features/book/books.routes");
const logger = require("./shared/middleware/logger.middleware");
const { loadEnvFile } = require("./shared/config/loadEnv");
const { authRouter } = require("./features/auth/auth.routes");
const errorMiddleware = require("./shared/middleware/error.middleware");
const cookieParser = require("cookie-parser");

loadEnvFile();
const app = express();

app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.use("/books", booksRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

module.exports = { app };
