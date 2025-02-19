const bookRepo = require("../../models/book.model");

const getAllBooks = async () => {
  console.log("Getting Books"); 
  return await bookRepo.findAll(); 
};

const getBookById = async (id) => {
  console.log(`fetching book with id: ${id}...`);
  return await bookRepo.findById(id);
};

const createBook = async (book) => {
  console.log("Creating Book!....", book);
  return await bookRepo.save(book);
};

const updateBook = async (id, book) => {
  console.log(`Updating Book with id: ${id} Book:`, book);
  if (!id) throw new Error("You must send id to update...");
 return await bookRepo.save({ id, ...book }); //why send it as object?! could not we just do (id , ...book)
};

const deleteBook = async (id) => {
  console.log(`Deleting Book with this ID:${id}`);
  if (!id) throw new Error("You must send id to delete...");
  return await bookRepo.remove(id);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
