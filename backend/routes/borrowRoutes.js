import express from "express";
import {
  getBorrows,
  borrowBook,
  returnBook,
  getBorrowHistory, // ✅ added
} from "../controllers/borrowController.js";

const router = express.Router();

// Routes
router.get("/", getBorrows);             // All borrow records
router.get("/history", getBorrowHistory); // ✅ Borrow history for ReturnBook page
router.post("/", borrowBook);             // Borrow book
router.put("/return", returnBook);        // Return book

export default router;
