
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    assignmentName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    status: {
    type: String,
    default: 'Submitted'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
