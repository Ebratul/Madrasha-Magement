const Result = require('../models/Result');
const Student = require('../models/Student');
const asyncHandler = require('../middleware/async');

// @desc    Get all results
// @route   GET /api/results
// @access  Public
exports.getAllResults = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    className,
    exam,
    studentId,
    grade,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build query
  const query = {};
  
  if (className) query.className = className;
  if (exam) query.exam = exam;
  if (studentId) query.studentId = studentId;
  if (grade) query.grade = grade;

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Execute query
  const results = await Result.find(query)
    .populate('studentId', 'fullName className phone')
    .sort(sortOptions)
    .limit(parseInt(limit))
    .skip(skip)
    .select('-__v');

  const total = await Result.countDocuments(query);

  res.status(200).json({
    success: true,
    data: results,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalResults: total,
      resultsPerPage: parseInt(limit)
    }
  });
});

// @desc    Get single result
// @route   GET /api/results/:id
// @access  Public
exports.getResult = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id)
    .populate('studentId', 'fullName className dateOfBirth phone fatherName motherName');

  if (!result) {
    return res.status(404).json({
      success: false,
      error: 'ফলাফল পাওয়া যায়নি'
    });
  }

  res.status(200).json({
    success: true,
    data: result
  });
});

// @desc    Create new result
// @route   POST /api/results
// @access  Private
exports.createResult = asyncHandler(async (req, res) => {
  const { studentId, exam, grade, marks, subject, remarks, examDate } = req.body;

  // Validation
  if (!studentId || !exam || !grade) {
    return res.status(400).json({
      success: false,
      error: 'শিক্ষার্থী, পরীক্ষা এবং গ্রেড প্রয়োজন'
    });
  }

  // Check if student exists
  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      error: 'শিক্ষার্থী পাওয়া যায়নি'
    });
  }

  // Check for duplicate result (same student, same exam, same subject)
  const duplicateQuery = {
    studentId,
    exam
  };
  
  if (subject) {
    duplicateQuery.subject = subject;
  }

  const existingResult = await Result.findOne(duplicateQuery);

  if (existingResult) {
    return res.status(400).json({
      success: false,
      error: 'এই শিক্ষার্থীর এই পরীক্ষার ফলাফল ইতিমধ্যে যুক্ত করা হয়েছে'
    });
  }

  // Create result
  const result = await Result.create({
    studentId,
    studentName: student.fullName,
    className: student.className,
    exam,
    grade,
    marks,
    subject,
    remarks,
    examDate: examDate || new Date()
  });

  res.status(201).json({
    success: true,
    message: 'ফলাফল সফলভাবে যুক্ত হয়েছে',
    data: result
  });
});

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private
exports.updateResult = asyncHandler(async (req, res) => {
  let result = await Result.findById(req.params.id);

  if (!result) {
    return res.status(404).json({
      success: false,
      error: 'ফলাফল পাওয়া যায়নি'
    });
  }

  result = await Result.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'ফলাফল সফলভাবে আপডেট হয়েছে',
    data: result
  });
});

// @desc    Delete result
// @route   DELETE /api/results/:id
// @access  Private
exports.deleteResult = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);

  if (!result) {
    return res.status(404).json({
      success: false,
      error: 'ফলাফল পাওয়া যায়নি'
    });
  }

  await result.deleteOne();

  res.status(200).json({
    success: true,
    message: 'ফলাফল সফলভাবে মুছে ফেলা হয়েছে',
    data: {}
  });
});

// @desc    Get results by student
// @route   GET /api/results/student/:studentId
// @access  Public
exports.getResultsByStudent = asyncHandler(async (req, res) => {
  const results = await Result.find({ studentId: req.params.studentId })
    .sort({ examDate: -1, createdAt: -1 })
    .select('-__v');

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});

// @desc    Get results by class
// @route   GET /api/results/class/:className
// @access  Public
exports.getResultsByClass = asyncHandler(async (req, res) => {
  const { exam } = req.query;
  
  const query = { className: req.params.className };
  if (exam) query.exam = exam;

  const results = await Result.find(query)
    .populate('studentId', 'fullName')
    .sort({ studentName: 1 })
    .select('-__v');

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});

// @desc    Get results statistics
// @route   GET /api/results/statistics
// @access  Public
exports.getResultsStatistics = asyncHandler(async (req, res) => {
  const { className, exam } = req.query;
  
  const query = {};
  if (className) query.className = className;
  if (exam) query.exam = exam;

  const totalResults = await Result.countDocuments(query);
  
  // Grade distribution
  const gradeDistribution = await Result.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$grade',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Pass/Fail statistics
  const passed = await Result.countDocuments({
    ...query,
    grade: { $nin: ['D', 'F'] }
  });

  const failed = totalResults - passed;
  const passPercentage = totalResults > 0 ? ((passed / totalResults) * 100).toFixed(2) : 0;

  // Class-wise distribution
  const classwiseStats = await Result.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$className',
        count: { $sum: 1 },
        avgMarks: { $avg: '$marks' }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalResults,
      passed,
      failed,
      passPercentage: parseFloat(passPercentage),
      gradeDistribution,
      classwiseStats
    }
  });
});

// @desc    Get recent results
// @route   GET /api/results/recent/:limit
// @access  Public
exports.getRecentResults = asyncHandler(async (req, res) => {
  const limit = parseInt(req.params.limit) || 10;

  const results = await Result.find()
    .populate('studentId', 'fullName className')
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});