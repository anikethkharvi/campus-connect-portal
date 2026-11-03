
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Assignment = require('./models/Assignment');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// Store assignment submissions
let submissions = [];

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Campus Connect Server is running!'
    });
});

// GET all students from MongoDB
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET student by ID from MongoDB
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// POST - Create student in MongoDB
app.post('/api/students', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { name, email, course, semester } = req.body;

        const newStudent = new Student({
            name,
            email,
            course,
            semester
        });

        await newStudent.save();

        res.status(201).json({
            message: 'Student created successfully',
            student: newStudent
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update student in MongoDB
app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student updated successfully',
            student
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// DELETE - Delete student from MongoDB
app.delete('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully',
            student
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



 // POST - Submit assignment without creating duplicates
app.post('/api/submit', async (req, res) => {
    try {
        const { studentName, assignmentName, course } = req.body;

        const submission = await Assignment.findOneAndUpdate(
            { studentName, assignmentName },
            {
                studentName,
                assignmentName,
                course,
                status: 'Submitted'
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            message: 'Assignment submitted successfully',
            submission
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET - Fetch assignment submissions from MongoDB
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Assignment.find();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// DELETE - Unsubmit assignment (change status to Pending)
app.delete('/api/submissions', async (req, res) => {
    try {
        const { studentName, assignmentName } = req.body;

        const submission = await Assignment.updateMany(
            { studentName, assignmentName },
            { $set: { status: 'Pending' } }
        );

        res.json({
            message: 'Assignment status changed to Pending',
            submission
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/campusconnect')
    .then(() => {
        console.log('MongoDB connected successfully!');

        const PORT = 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
