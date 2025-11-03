import BorrowRecord from "../models/borrowModel.js";
import Book from "../models/bookModel.js";

// @desc Get all borrow records
export const getBorrows = async (req, res) => {
  try {
    const borrows = await BorrowRecord.find()
      .populate("user", "name email")
      .populate("book", "title author");
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!book.available) return res.status(400).json({ message: "Book already borrowed" });

    // Check borrow limit (max 3 books per user)
    const activeBorrows = await BorrowRecord.countDocuments({
      user: userId,
      status: "borrowed"
    });
    if (activeBorrows >= 3) {
      return res.status(400).json({ message: "Borrow limit reached (3 books max)" });
    }

    // Set due date to 7 days from today
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const record = await BorrowRecord.create({
      user: userId,
      book: bookId,
      dueDate
    });

    book.available = false;
    await book.save();

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc Return a book
export const returnBook = async (req, res) => {
  try {
    const { recordId } = req.body;

    const record = await BorrowRecord.findById(recordId);
    if (!record) return res.status(404).json({ message: "Record not found" });
    if (record.status === "returned")
      return res.status(400).json({ message: "Book already returned" });

    // Update record
    record.status = "returned";
    record.returnDate = new Date();
    await record.save();

    // Make book available again
    const book = await Book.findById(record.book);
    if (book) {
      book.available = true;
      await book.save();
    }

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all borrow history (for ReturnBook and BorrowHistory pages)
export const getBorrowHistory = async (req, res) => {
  try {
    const records = await BorrowRecord.find()
      .populate("user", "name email")
      .populate("book", "title author")
      .sort({ issueDate: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
};
