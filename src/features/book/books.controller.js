const { filterData } = require("../../models/book.model");
const {
  getBookById,
  createBook,
  updateBook, 
  deleteBook,
} = require("./books.services");


const handleGetBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Use filterData with pagination
    const { books, totalCount } = await filterData(filters, pageNumber, limitNumber);

    res.status(200).json({
      total: totalCount,
      page: pageNumber,
      totalPages: Math.ceil(totalCount / limitNumber),
      books,
    });
  } catch (error) {
    console.error("Error in handleGetBooks:", error);
    res.status(500).json({ status: 500, message: "Server Error", error });
  }
};

const handleGetBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await getBookById(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ status: 404, message: "Book not found" });
    }
  } catch (error) {
    console.error("Error in handleGetBookById:", error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

const handleCreateBook = async (req, res) => {
  const aBook = req.body;
  try {
    
    // aBook.id = uuidv4();  does not work  (must allow ur schema to allow custom IDs)
    const createdBook = await createBook(aBook);
    res.status(201).json({ message: "Success! Book Added", book: createdBook });
  } catch (error) {
    console.error("Error in handleCreateBook:", error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

const handleUpdateBook = async (req, res) => {
  const bookId = req.params.id;
  const bookBody = req.body;
  try {
    const updatedBook = await updateBook(bookId, bookBody);
    if (updatedBook) {
      res.status(200).json({ message: "Book Updated", book: updatedBook });
    } else {
      res.status(404).json({ status: 404, message: "Book not found" });
    }
  } catch (error) {
    console.error("Error in handleUpdateBook:", error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

const handlePatchBook = async (req, res) => {
  const bookId = req.params.id;
  const bookBody = req.body;
  try {
    const updatedBook = await updateBook(bookId, bookBody);
    if (updatedBook) {
      res.status(200).json({ message: "Book Updated", book: updatedBook });
    } else {
      res.status(404).json({ status: 404, message: "Book not found" });
    }
  } catch (error) {
    console.error("Error in handlePatchBook:", error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

const handleDeleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await deleteBook(bookId);
    if (deletedBook) {
      res.status(200).json({ message: "Book Deleted" });
    } else {
      res.status(404).json({ status: 404, message: "Book not found" });
    }
  } catch (error) {
    console.error("Error in handleDeleteBook:", error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = {
  handleGetBookById,
  handleGetBooks,
  handleCreateBook,
  handleUpdateBook,
  handlePatchBook,
  handleDeleteBook,
};
