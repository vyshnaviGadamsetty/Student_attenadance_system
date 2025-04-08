import mongoose from "mongoose";

const sectionTimetableSchema = new mongoose.Schema({
    section: { type: String, required: true },
    day: { type: String, required: true },
    schedule: [
        {
            timeSlot: { type: String, required: true },
            subject: { type: String, required: true },
            subjectId: { type: String, required: true },
            teacherId: { type: String, required: true },
        },
    ],
});

const SectionTimetable = mongoose.model("SectionTimetable", sectionTimetableSchema);
export default SectionTimetable;
