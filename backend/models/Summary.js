import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    section: { type: String, required: true }, // Example: "CSE-A"
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Summary = mongoose.model("Summary", SummarySchema);

export default Summary;
