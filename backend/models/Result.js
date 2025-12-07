const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student ID is required']
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  className: {
    type: String,
    required: [true, 'Class name is required'],
    enum: [
      'madani-first',
      'madani-second',
      'hifz-beginner',
      'hifz-intermediate',
      'hifz-advanced',
      'nazera',
      'qaida'
    ]
  },
  exam: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']
  },
  marks: {
    type: Number,
    min: 0,
    max: 100
  },
  subject: {
    type: String,
    trim: true
  },
  remarks: {
    type: String,
    trim: true
  },
  examDate: {
    type: Date
  },
  createdBy: {
    type: String,
    default: 'principal'
  }
}, {
  timestamps: true
});

// Index for faster queries
resultSchema.index({ studentId: 1, exam: 1, className: 1 });
resultSchema.index({ className: 1 });
resultSchema.index({ exam: 1 });

// Virtual for result status
resultSchema.virtual('isPassed').get(function() {
  return !['D', 'F'].includes(this.grade);
});

// Ensure virtuals are included in JSON
resultSchema.set('toJSON', { virtuals: true });
resultSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Result', resultSchema);