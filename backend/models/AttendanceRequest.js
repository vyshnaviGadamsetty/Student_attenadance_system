// models/AttendanceRequest.js
import mongoose from 'mongoose';

const AttendanceRequestSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    teacherId: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

const AttendanceRequest = mongoose.model('AttendanceRequest', AttendanceRequestSchema);
export default AttendanceRequest;
