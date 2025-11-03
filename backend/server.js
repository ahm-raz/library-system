import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import bookFetchRoute from "./routes/bookFetchRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//Routes
app.use("/api/books", bookRoutes);
app.use("/api/books", bookFetchRoute);
app.use("/api/users", userRoutes);
app.use("/api/borrow", borrowRoutes);

// Database Connection
connectDB();

// Basic Route
app.get("/", (req, res) => {
  res.send("Library Management System API running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
