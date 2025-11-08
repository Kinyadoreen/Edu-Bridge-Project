// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  thumbnail: { type: String },
  lessons: [{
    title: String,
    content: String,
    videoUrl: String,
    duration: Number,
    order: Number
  }],
  quizzes: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    points: Number
  }],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const ProgressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [Number],
  quizScores: [{
    quizIndex: Number,
    score: Number,
    maxScore: Number,
    completedAt: Date
  }],
  overallProgress: { type: Number, default: 0 },
  certificateIssued: { type: Boolean, default: false },
  lastAccessed: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Progress = mongoose.model('Progress', ProgressSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) throw new Error();
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Routes

// 1. AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student'
    });
    
    await user.save();
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// 2. COURSE ROUTES
app.post('/api/courses', auth, async (req, res) => {
  try {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only teachers can create courses' });
    }
    
    const course = new Course({
      ...req.body,
      instructor: req.user._id
    });
    
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const { category, level, search } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) query.title = { $regex: search, $options: 'i' };
    
    const courses = await Course.find(query).populate('instructor', 'name');
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course', error: error.message });
  }
});

app.post('/api/courses/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    
    course.enrolledStudents.push(req.user._id);
    await course.save();
    
    req.user.enrolledCourses.push(course._id);
    await req.user.save();
    
    const progress = new Progress({
      student: req.user._id,
      course: course._id
    });
    await progress.save();
    
    res.json({ message: 'Enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Enrollment failed', error: error.message });
  }
});

// 3. PROGRESS ROUTES
app.get('/api/progress/:courseId', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user._id,
      course: req.params.courseId
    }).populate('course');
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress', error: error.message });
  }
});

app.post('/api/progress/:courseId/lesson', auth, async (req, res) => {
  try {
    const { lessonIndex } = req.body;
    
    let progress = await Progress.findOne({
      student: req.user._id,
      course: req.params.courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
      
      const course = await Course.findById(req.params.courseId);
      progress.overallProgress = (progress.completedLessons.length / course.lessons.length) * 100;
      
      progress.lastAccessed = Date.now();
      await progress.save();
    }
    
    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
});

app.post('/api/progress/:courseId/quiz', auth, async (req, res) => {
  try {
    const { quizIndex, score, maxScore } = req.body;
    
    let progress = await Progress.findOne({
      student: req.user._id,
      course: req.params.courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    progress.quizScores.push({
      quizIndex,
      score,
      maxScore,
      completedAt: Date.now()
    });
    
    if (progress.overallProgress >= 80 && !progress.certificateIssued) {
      progress.certificateIssued = true;
    }
    
    await progress.save();
    res.json({ message: 'Quiz score recorded', progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record quiz score', error: error.message });
  }
});

// 4. DASHBOARD ROUTES
app.get('/api/dashboard', auth, async (req, res) => {
  try {
    const enrolledCourses = await Course.find({ 
      _id: { $in: req.user.enrolledCourses } 
    }).populate('instructor', 'name');
    
    const progressData = await Progress.find({ student: req.user._id }).populate('course');
    
    res.json({
      enrolledCourses,
      progressData,
      stats: {
        totalCourses: enrolledCourses.length,
        completedCourses: progressData.filter(p => p.overallProgress === 100).length,
        certificates: progressData.filter(p => p.certificateIssued).length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard', error: error.message });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduBridge API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});