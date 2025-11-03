import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" },
    issueDate: { type: Date, default: Date.now },
    returnDate: Date,
    dueDate: { type: Date, required: true } // New field
  },
  { timestamps: true }
);

export default mongoose.model("BorrowRecord", borrowSchema);
