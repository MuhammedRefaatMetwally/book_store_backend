const express = require("express");
const booksRouter = express.Router();
const {
  handleGetBooks,
  handleGetBookById,
  handleCreateBook,
  handleUpdateBook,
  handlePatchBook,
  handleDeleteBook,
} = require("./books.controller");
const { authorize } = require("../../shared/middleware/auth.middleware");

booksRouter.get("/", authorize, handleGetBooks);

booksRouter.get("/:id", authorize, handleGetBookById);

booksRouter.post("/", authorize, handleCreateBook);
booksRouter.put("/:id", authorize, handleUpdateBook);
booksRouter.patch("/:id", authorize, handlePatchBook);
booksRouter.delete("/:id", authorize, handleDeleteBook);

module.exports = booksRouter;
