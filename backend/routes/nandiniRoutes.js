

import express from "express";
import Student from "../models/Student.js";
import Subject from "../models/Subject.js";
console.log(Subject);

const router = express.Router();

// Store attendance codes temporarily (should use a database in production)
// Update the attendance codes structure to include more details
// Updated attendance code storage structure in routes.js
// This includes the expiration timer and tracks enrolled students

// Structure for attendance code storage
const attendanceCodes = {};

// Generate & Store Attendance Code for a Subject with 40-second expiration
router.post("/generate-attendance-code", async (req, res) => {
    const { subjectId, department } = req.body;
    
    if (!subjectId || !department) {
        return res.status(400).json({ 
            success: false, 
            message: "Subject ID and department are required" 
        });
    }
    
    try {
        // Find the subject to ensure it exists
        const subject = await Subject.findOne({ subjectId: subjectId });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }
        
        // Find all students enrolled in this department
        const enrolledStudents = await Student.find({ 
            department: department,
            "attendance.subject": subject._id
        }).select('studentId');
        
        const enrolledStudentIds = enrolledStudents.map(student => student.studentId);
        
        const code = Math.floor(100000 + Math.random() * 900000);
        
        // Store the code with 40-second timer
        attendanceCodes[subjectId] = {
            code,
            department,
            timestamp: new Date(),
            isActive: true,
            expiresAt: new Date(Date.now() + 40000), // 40 seconds
            enrolledStudents: enrolledStudentIds,
            markedStudents: [] // Track which students have marked attendance
        };
        
        // Set a timer to process absences after code expires
        setTimeout(() => processAbsentees(subjectId, subject._id), 40000);
        
        res.json({ 
            success: true, 
            code,
            message: "Attendance code generated successfully. Code valid for 40 seconds." 
        });
    } catch (error) {
        console.error("Error generating attendance code:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to generate attendance code" 
        });
    }
});

// Function to process absent students after code expires
// Function to process absent students after code expires
async function processAbsentees(subjectId, subjectObjectId) {
    const session = attendanceCodes[subjectId];
    
    if (!session || !session.isActive) return;
    
    // Deactivate the session
    session.isActive = false;
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    try {
        // Get all enrolled students who haven't marked attendance
        const absentStudentIds = session.enrolledStudents.filter(
            studentId => !session.markedStudents.includes(studentId)
        );
        
        console.log(`Processing ${absentStudentIds.length} absences for ${subjectId}`);
        
        // Update each absent student
        for (const studentId of absentStudentIds) {
            const student = await Student.findOne({ studentId: studentId });
            
            if (student) {
                // Find attendance record for this subject
                let attendanceRecord = student.attendance.find(a => 
                    a.subject && a.subject.toString() === subjectObjectId.toString()
                );
                
                if (attendanceRecord) {
                    // Increase total classes but not attended classes
                    attendanceRecord.totalClasses += 1;
                    // Update percentage
                    attendanceRecord.percentage = 
                        (attendanceRecord.attendedClasses / attendanceRecord.totalClasses) * 100;
                } else {
                    // Create a new attendance record for this student and subject
                    student.attendance.push({
                        subject: subjectObjectId,
                        attendedClasses: 0,
                        totalClasses: 1,
                        percentage: 0,
                        lastMarked: new Date()
                    });
                }
                        
                // Save the updated record
                await student.save();
                console.log(`Marked absence for student ${studentId}`);
            }
        }

        // After processing absences, notify the frontend via the status endpoint
        // This will make sure the UI updates without waiting for the next polling interval
    } catch (error) {
        console.error("Error processing absences:", error);
    }
}

// Updated mark-attendance endpoint to track which students marked attendance
router.post("/mark-attendance", async (req, res) => {
    const { studentId, enteredCode, subjectId } = req.body;
    
    // Validation
    if (!studentId || !enteredCode || !subjectId) {
        return res.status(400).json({
            success: false,
            message: "Student ID, Subject ID and Attendance Code are required"
        });
    }
    
    try {
        // Check if there's an active attendance session for this subject
        const attendanceSession = attendanceCodes[subjectId];
        
        if (!attendanceSession) {
            return res.status(400).json({ 
                success: false, 
                message: "No attendance session found for this subject." 
            });
        }
        
        // Check if the code is still active
        if (!attendanceSession.isActive) {
            return res.status(400).json({
                success: false,
                message: "Attendance code has expired."
            });
        }
        
        // Check if code expiration time has passed
        if (new Date() > attendanceSession.expiresAt) {
            attendanceSession.isActive = false;
            return res.status(400).json({
                success: false,
                message: "Attendance code has expired."
            });
        }
        
        // Compare the entered code with the stored code
        const enteredCodeStr = String(enteredCode);
        const sessionCodeStr = String(attendanceSession.code);
        
        if (enteredCodeStr !== sessionCodeStr) {
            return res.status(400).json({ 
                success: false, 
                message: "Incorrect attendance code." 
            });
        }
        
        // Fetch student
        const student = await Student.findOne({ studentId });
        
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }
        
        // Find the subject
        const subject = await Subject.findOne({ subjectId: subjectId });
        
        if (!subject) {
            return res.status(404).json({ 
                success: false, 
                message: "Subject not found with ID: " + subjectId 
            });
        }
        
        // Session ID for today
        const today = new Date().toISOString().split('T')[0];
        const sessionId = `${subjectId}-${today}`;
        
        // Initialize attendedSessions if needed
        if (!student.attendedSessions) {
            student.attendedSessions = [];
        }
        
        // Check if student already marked attendance
        if (student.attendedSessions.includes(sessionId)) {
            return res.status(400).json({
                success: false,
                message: "You've already marked attendance for this session today."
            });
        }
        
        // Add student to the list of marked students
        if (!attendanceSession.markedStudents.includes(studentId)) {
            attendanceSession.markedStudents.push(studentId);
        }
        
        // Process attendance record
        let attendanceRecord = student.attendance.find(a => 
            a.subject && subject._id && a.subject.toString() === subject._id.toString()
        );
        
        // If student is not enrolled in this subject
        if (!attendanceRecord) {
            // Add this subject to student's attendance records
            student.attendance.push({
                subject: subject._id,
                attendedClasses: 1,
                totalClasses: 1,
                percentage: 100,
                lastMarked: new Date()
            });
            
            // Record this session as attended
            student.attendedSessions.push(sessionId);
            
            await student.save();
            
            const newRecord = student.attendance[student.attendance.length - 1];
            
            return res.json({
                success: true,
                message: "First attendance recorded for this subject.",
                attendance: {
                    subject: subject._id,
                    subjectId: subject.subjectId,
                    subjectName: subject.name,
                    attendedClasses: newRecord.attendedClasses,
                    totalClasses: newRecord.totalClasses,
                    percentage: newRecord.percentage,
                    lastMarked: newRecord.lastMarked
                }
            });
        }
        
        // Update attendance record
        attendanceRecord.attendedClasses += 1;
        attendanceRecord.totalClasses += 1;
        attendanceRecord.percentage = (attendanceRecord.attendedClasses / attendanceRecord.totalClasses) * 100;
        attendanceRecord.lastMarked = new Date();
        
        // Record this session as attended
        student.attendedSessions.push(sessionId);
        
        await student.save();
        
        res.json({ 
            success: true, 
            message: "Attendance marked successfully.", 
            attendance: {
                subject: attendanceRecord.subject,
                subjectId: subject.subjectId,
                subjectName: subject.name,
                attendedClasses: attendanceRecord.attendedClasses,
                totalClasses: attendanceRecord.totalClasses,
                percentage: attendanceRecord.percentage,
                lastMarked: attendanceRecord.lastMarked
            }
        });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error.",
            error: error.message
        });
    }
});

// Updated endpoint to return all expected students with present/absent status
router.get("/get-attendance-status", async (req, res) => {
    const { subjectId, date } = req.query;
    
    if (!subjectId || !date) {
        return res.status(400).json({ 
            success: false, 
            message: "Subject ID and date are required" 
        });
    }
    
    try {
        // Find the subject
        const subject = await Subject.findOne({ subjectId: subjectId });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }
        
        // Find all students enrolled in this subject
        const enrolledStudents = await Student.find({
            "attendance.subject": subject._id
        }).select('studentId name');
        
        // Find all students who marked attendance today for this subject
        const presentStudents = await Student.find({
            attendedSessions: { $in: [`${subjectId}-${date}`] }
        }).select('studentId name');
        
        const presentStudentIds = presentStudents.map(s => s.studentId);
        
        // Create a map of all enrolled students with present/absent status
        const attendanceRecords = enrolledStudents.map(student => ({
            studentId: student.studentId,
            name: student.name,
            status: presentStudentIds.includes(student.studentId) ? 'present' : 'absent'
        }));
        
        res.json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance status:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error." 
        });
    }
});
// Add this to your routes.js file

// Submit Manual Attendance
router.post("/submit-manual-attendance", async (req, res) => {
    const { subjectId, attendance, date } = req.body;
    
    if (!subjectId || !attendance || !date) {
        return res.status(400).json({ 
            success: false, 
            message: "Subject ID, attendance data, and date are required" 
        });
    }
    
    try {
        // Find the subject
        const subject = await Subject.findOne({ subjectId: subjectId });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }
        
        // Process each student's attendance
        const studentIds = Object.keys(attendance);
        const sessionId = `${subjectId}-${date}`;
        
        for (const studentId of studentIds) {
            const status = attendance[studentId];
            const student = await Student.findOne({ studentId: studentId });
            
            if (!student) {
                console.warn(`Student with ID ${studentId} not found`);
                continue;
            }
            
            // Initialize attendedSessions if needed
            if (!student.attendedSessions) {
                student.attendedSessions = [];
            }
            
            // Find the attendance record for this subject
            let attendanceRecord = student.attendance.find(a => 
                a.subject && subject._id && a.subject.toString() === subject._id.toString()
            );
            
            // If student is not enrolled in this subject, create new record
            if (!attendanceRecord) {
                attendanceRecord = {
                    subject: subject._id,
                    attendedClasses: 0,
                    totalClasses: 0,
                    percentage: 0,
                    lastMarked: new Date()
                };
                student.attendance.push(attendanceRecord);
            }
            
            // Check if student already marked attendance for this session
            const alreadyMarked = student.attendedSessions.includes(sessionId);
            
            // Update totals based on status
            attendanceRecord.totalClasses += 1;
            
            if (status === 'present') {
                // Only mark as attended if not already counted
                if (!alreadyMarked) {
                    attendanceRecord.attendedClasses += 1;
                    student.attendedSessions.push(sessionId);
                }
            } else {
                // If student was previously marked present, remove from attended sessions
                if (alreadyMarked) {
                    student.attendedSessions = student.attendedSessions.filter(id => id !== sessionId);
                }
            }
            
            // Update percentage
            attendanceRecord.percentage = 
                (attendanceRecord.attendedClasses / attendanceRecord.totalClasses) * 100;
            
            attendanceRecord.lastMarked = new Date();
            
            // Save updated student record
            await student.save();
        }
        
        res.json({
            success: true,
            message: "Manual attendance recorded successfully"
        });
    } catch (error) {
        console.error("Error recording manual attendance:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error.",
            error: error.message
        });
    }
});

// Get subject by subjectId
router.get("/subjects/:id", async (req, res) => {
    try {
        const subject = await Subject.findOne({ subjectId: req.params.id });
        if (!subject) {
            return res.status(404).json({ error: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// Get student details
router.get("/students/:studentId", async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId })
            .populate('attendance.subject');
        
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Store attendance code in DB (optional - currently using in-memory storage)
router.post("/store-attendance-code", async (req, res) => {
    const { subjectId, code } = req.body;
    try {
        // Here you could store the code in your database instead of memory
        attendanceCodes[subjectId] = {
            code,
            timestamp: new Date(),
            isActive: true
        };
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to store attendance code" });
    }
});

export default router; 