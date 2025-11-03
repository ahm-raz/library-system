import express from "express";
import axios from "axios";

const router = express.Router();

// Example fetch route for external books
router.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get("https://openlibrary.org/subjects/romance.json?limit=100"); // example
    const books = response.data.works.map((b) => ({
      title: b.title,
      author: b.authors?.[0]?.name || "Unknown",
      image: b.cover_id
        ? `https://covers.openlibrary.org/b/id/${b.cover_id}-M.jpg`
        : null,
      available: true,
    }));
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

export default router;
