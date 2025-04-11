
// import express from 'express';
// import cron from 'node-cron';
// import AttendanceRequest from '../models/AttendanceRequest.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

// // 🟢 Student submits an attendance request
// router.post('/request-attendance', authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== 'student') {
//       return res.status(403).json({ message: 'Access denied. Only students can submit requests.' });
//     }

//     const { teacherId, subject, date, reason } = req.body;

//     console.log("Authenticated User:", req.user);

//     const newRequest = new AttendanceRequest({
//       studentId: req.user.studentId, // Ensure this matches actual student ID
//       teacherId,
//       subject,
//       date,
//       reason,
//       status: 'Pending',
//     });

//     const savedRequest = await newRequest.save();
//     res.json({ message: 'Request submitted successfully', request: savedRequest });
//   } catch (error) {
//     console.error('Error submitting request:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // 🟢 Admin fetches all attendance requests
// router.get('/requests', authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Only admins can view all requests.' });
//     }

//     const requests = await AttendanceRequest.find();
//     res.json(requests);
//   } catch (error) {
//     console.error("Error fetching requests:", error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // 🟢 Teacher fetches their assigned attendance requests
// router.get('/requests/teacher/:teacherId', authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== 'teacher') {
//       return res.status(403).json({ message: 'Access denied. Only teachers can view their requests.' });
//     }

//     const requests = await AttendanceRequest.find({ teacherId: req.params.teacherId });
//     res.json(requests);
//   } catch (error) {
//     console.error("Error fetching teacher's requests:", error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // 🟢 Teacher/Admin updates request status (Accept/Reject)
// router.put('/requests/:id', authMiddleware, async (req, res) => {
//   try {
//     const request = await AttendanceRequest.findById(req.params.id);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found' });
//     }

//     console.log("🔹 Stored Teacher ID in DB:", request.teacherId);
//     console.log("🔹 Logged-in User:", req.user);

//     if (req.user.role === 'admin' || (req.user.role === 'teacher' && req.user.teacherId === request.teacherId)) {
//       request.status = req.body.status || request.status;
//       const updatedRequest = await request.save();
//       res.json({ message: 'Request updated successfully', request: updatedRequest });
//     } else {
//       console.log("❌ Access Denied: Unauthorized role or teacher ID mismatch.");
//       return res.status(403).json({ message: 'Access denied. User not authorized.' });
//     }
//   } catch (error) {
//     console.error('🔥 Error updating request:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // GET all requests by student ID
// router.get("/requests/student/:studentId", async (req, res) => {
//   const { studentId } = req.params;

//   try {
//     const requests = await AttendanceRequest.find({ studentId }); // Replace with your model name
//     res.json(requests);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch student requests" });
//   }
// });


// // Run this every hour
// cron.schedule('0 * * * *', async () => {
//   try {
//     const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

//     const result = await AttendanceRequest.deleteMany({
//       createdAt: { $lt: fortyEightHoursAgo }
//     });

//     console.log(`🧹 Deleted ${result.deletedCount} requests older than 48 hours`);
//   } catch (error) {
//     console.error("❌ Error during scheduled deletion:", error);
//   }
// });



// export default router;
import express from 'express';
import cron from 'node-cron';
import AttendanceRequest from '../models/AttendanceRequest.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// 🟢 Student submits an attendance request
router.post('/request-attendance', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can submit requests.' });
    }

    const { teacherId, subject, date, reason } = req.body;

    console.log("Authenticated User:", req.user);

    const newRequest = new AttendanceRequest({
      studentId: req.user.studentId, // Ensure this matches actual student ID
      teacherId,
      subject,
      date,
      reason,
      status: 'Pending',
    });

    const savedRequest = await newRequest.save();
    res.json({ message: 'Request submitted successfully', request: savedRequest });
  } catch (error) {
    console.error('Error submitting request:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🟢 Admin fetches all attendance requests
router.get('/requests', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can view all requests.' });
    }

    const requests = await AttendanceRequest.find();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🟢 Teacher fetches their assigned attendance requests
router.get('/requests/teacher/:teacherId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Only teachers can view their requests.' });
    }

    const requests = await AttendanceRequest.find({ teacherId: req.params.teacherId });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching teacher's requests:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🟢 Teacher/Admin updates request status (Accept/Reject)
router.put('/requests/:id', authMiddleware, async (req, res) => {
  try {
    const request = await AttendanceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    console.log("🔹 Stored Teacher ID in DB:", request.teacherId);
    console.log("🔹 Logged-in User:", req.user);

    if (req.user.role === 'admin' || (req.user.role === 'teacher' && req.user.teacherId === request.teacherId)) {
      request.status = req.body.status || request.status;
      const updatedRequest = await request.save();
      res.json({ message: 'Request updated successfully', request: updatedRequest });
    } else {
      console.log("❌ Access Denied: Unauthorized role or teacher ID mismatch.");
      return res.status(403).json({ message: 'Access denied. User not authorized.' });
    }
  } catch (error) {
    console.error('🔥 Error updating request:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all requests by student ID
router.get("/requests/student/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const requests = await AttendanceRequest.find({ studentId }); // Replace with your model name
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch student requests" });
  }
});

// 🆕 Route for getting pending requests for a specific student
router.get('/requests/student/:studentId/pending', authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Verify the user is either the student themselves or an admin
    if (req.user.role !== 'admin' && req.user.studentId !== studentId) {
      return res.status(403).json({ message: 'Access denied. Not authorized to view these requests.' });
    }

    const pendingRequests = await AttendanceRequest.find({ 
      studentId: studentId,
      status: 'Pending'
    });
    
    res.json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🆕 Route for getting request history (accepted/rejected) for a specific student
router.get('/requests/student/:studentId/history', authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Verify the user is either the student themselves or an admin
    if (req.user.role !== 'admin' && req.user.studentId !== studentId) {
      return res.status(403).json({ message: 'Access denied. Not authorized to view these requests.' });
    }

    const requestHistory = await AttendanceRequest.find({ 
      studentId: studentId,
      status: { $in: ['Accepted', 'Rejected'] }
    });
    
    res.json(requestHistory);
  } catch (error) {
    console.error('Error fetching request history:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🆕 Route for deleting a specific request
router.delete('/requests/:id', authMiddleware, async (req, res) => {
  try {
    const request = await AttendanceRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    // Only allow students to delete their own pending requests, or teachers/admins for any request
    if (req.user.role === 'student' && req.user.studentId !== request.studentId) {
      return res.status(403).json({ message: 'Access denied. Not authorized to delete this request.' });
    }
    
    await AttendanceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🆕 Route for getting all requests with pagination and filtering options
router.get('/requests/all', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can view all requests.' });
    }
    
    const { page = 1, limit = 10, status, fromDate, toDate } = req.query;
    
    // Build query filters
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) {
        query.date.$gte = new Date(fromDate);
      }
      if (toDate) {
        query.date.$lte = new Date(toDate);
      }
    }
    
    // Execute query with pagination
    const requests = await AttendanceRequest.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
      
    // Get total documents count
    const count = await AttendanceRequest.countDocuments(query);
    
    res.json({
      requests,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRequests: count
    });
  } catch (error) {
    console.error('Error fetching all requests:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Run this every hour
cron.schedule('0 * * * *', async () => {
  try {
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

    const result = await AttendanceRequest.deleteMany({
      createdAt: { $lt: fortyEightHoursAgo }
    });

    console.log(`🧹 Deleted ${result.deletedCount} requests older than 48 hours`);
  } catch (error) {
    console.error("❌ Error during scheduled deletion:", error);
  }
});

export default router;