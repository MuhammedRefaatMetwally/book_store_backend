const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },

  price: {
    type: Number, 
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },

  comments: [
    {
      content: String,
      userName: String,
    },
  ],
  author: {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },
  },
});

const Book = model("books", bookSchema);

//repo pattern

const findAll = async () => {
  return await Book.find();
};

const findById = async (id) => {
  return await Book.findById(id);
};

const save = async ({ id, ...book }) => {
  if (id) return await Book.findByIdAndUpdate(id, book, { new: true }); // passed option param to return the updated not the old one
  const createdBook = new Book(book);
  return await createdBook.save();
};

const remove = async (id) => {
  return await Book.findByIdAndDelete(id);
};

const filterData = async (filters, page = 1, limit = 10) => {
    const query = {};
  
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (key.includes(".")) {
          query[key] = filters[key];
        } else if (key === "price") {
          const priceValue = Number(filters[key]);
          if (!isNaN(priceValue)) {
            query[key] = priceValue;
          }
        } else if (typeof filters[key] === "string") {
          query[key] = { $regex: filters[key], $options: "i" };
        } else {
          query[key] = filters[key];
        }
      }
    }
  
    let bookQuery = Book.find(query);
  
    // Handle sorting
    if (filters.sort) {
      const sortParams = filters.sort.split(" ");
      const sortField = sortParams[0];
      const sortOrder = sortParams[1] === "desc" ? -1 : 1;
      bookQuery = bookQuery.sort({ [sortField]: sortOrder });
    }
  
    // Pagination
    const skip = (page - 1) * limit;
    const books = await bookQuery.skip(skip).limit(limit).exec();
    const totalCount = await Book.countDocuments(query);
  
    return {
      books,
      totalCount
    };
  };

module.exports = { findAll, findById, save, remove, filterData };
