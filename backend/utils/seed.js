import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Progress from '../models/Progress.js'; // make sure this exists

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@edubridge.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'John Teacher',
    email: 'teacher@demo.com',
    password: 'password123',
    role: 'teacher',
    bio: 'Experienced educator with 10+ years of teaching programming',
  },
  {
    name: 'Jane Student',
    email: 'student@demo.com',
    password: 'password123',
    role: 'student',
  },
];

const courses = [
  {
    title: 'Introduction to Web Development',
    description:
      'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course will take you from beginner to building your first website.',
    category: 'Programming',
    level: 'Beginner',
    isFree: true,
    price: 0,
    isPublished: true,
    language: 'English',
    learningOutcomes: [
      'Build responsive websites with HTML and CSS',
      'Write JavaScript for interactive web pages',
      'Understand web development best practices',
      'Create your first portfolio website',
    ],
    prerequisites: ['Basic computer skills', 'Internet connection', 'Willingness to learn'],
    lessons: [
      { title: 'Getting Started with HTML', description: 'Learn the basics of HTML structure, tags, and semantic markup. We will cover headings, paragraphs, links, and images.', duration: 45, order: 1, content: 'Content placeholder' },
      { title: 'Styling with CSS', description: 'Introduction to CSS styling, selectors, colors, fonts, and layout basics.', duration: 60, order: 2, content: 'Content placeholder' },
      { title: 'JavaScript Fundamentals', description: 'Learn variables, functions, conditionals, and loops in JavaScript.', duration: 75, order: 3, content: 'Content placeholder' },
      { title: 'Building Your First Website', description: 'Put everything together to create a complete, responsive website.', duration: 90, order: 4, content: 'Content placeholder' },
    ],
  },
  {
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python, one of the most popular and beginner-friendly programming languages.',
    category: 'Programming',
    level: 'Beginner',
    isFree: true,
    price: 0,
    isPublished: true,
    language: 'English',
    learningOutcomes: ['Understand Python syntax and data types', 'Write functions and work with modules', 'Handle files and exceptions', 'Build simple Python applications'],
    prerequisites: ['None - perfect for absolute beginners'],
    lessons: [
      { title: 'Python Basics', description: 'Variables, data types, and basic operations', duration: 40, order: 1, content: 'Content placeholder' },
      { title: 'Control Flow', description: 'If statements, loops, and logical operators', duration: 50, order: 2, content: 'Content placeholder' },
      { title: 'Functions and Modules', description: 'Creating reusable code with functions', duration: 55, order: 3, content: 'Content placeholder' },
    ],
  },
  {
    title: 'Mathematics Fundamentals',
    description: 'Master essential mathematical concepts including algebra, geometry, and basic calculus.',
    category: 'Mathematics',
    level: 'Intermediate',
    isFree: true,
    price: 0,
    isPublished: true,
    language: 'English',
    learningOutcomes: ['Solve algebraic equations', 'Understand geometric principles', 'Apply mathematical reasoning', 'Prepare for advanced mathematics'],
    prerequisites: ['Basic arithmetic skills'],
    lessons: [
      { title: 'Algebra Basics', description: 'Variables, expressions, and equations', duration: 45, order: 1, content: 'Content placeholder' },
      { title: 'Geometry Fundamentals', description: 'Shapes, angles, and spatial reasoning', duration: 50, order: 2, content: 'Content placeholder' },
    ],
  },
  {
    title: 'English Communication Skills',
    description: 'Improve your English language skills for effective communication in academic and professional settings.',
    category: 'Languages',
    level: 'Beginner',
    isFree: true,
    price: 0,
    isPublished: true,
    language: 'English',
    learningOutcomes: ['Improve speaking confidence', 'Write clear and effective emails', 'Understand grammar rules', 'Expand vocabulary'],
    prerequisites: ['Basic reading ability'],
    lessons: [
      { title: 'Grammar Essentials', description: 'Parts of speech, sentence structure, and common mistakes', duration: 40, order: 1, content: 'Content placeholder' },
      { title: 'Speaking Practice', description: 'Pronunciation, conversation skills, and presentations', duration: 45, order: 2, content: 'Content placeholder' },
    ],
  },
  {
    title: 'Digital Literacy for Everyone',
    description: 'Essential computer skills for the modern world. Learn to use computers, internet, and basic software.',
    category: 'Life Skills',
    level: 'Beginner',
    isFree: true,
    price: 0,
    isPublished: true,
    language: 'English',
    learningOutcomes: ['Navigate operating systems confidently', 'Use internet safely and effectively', 'Work with documents and spreadsheets', 'Understand online security basics'],
    prerequisites: ['Access to a computer'],
    lessons: [
      { title: 'Computer Basics', description: 'Understanding hardware, software, and operating systems', duration: 35, order: 1, content: 'Content placeholder' },
      { title: 'Internet Essentials', description: 'Browsing, searching, and staying safe online', duration: 40, order: 2, content: 'Content placeholder' },
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edubridge');
    console.log('✅ MongoDB Connected Successfully');

    // Clear previous data
    await User.deleteMany();
    await Course.deleteMany();
    await Progress.deleteMany();
    console.log('🗑️ Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Find teacher for courses
    const teacher = createdUsers.find(u => u.role === 'teacher');

    // Add instructor, normalize level, and ensure lessons have content
    const coursesWithInstructor = courses.map(course => ({
      ...course,
      instructor: teacher._id,
      level: course.level.toLowerCase(),
      lessons: course.lessons.map(lesson => ({
        ...lesson,
        content: lesson.content || 'Lesson content will be added soon.',
      })),
    }));

    // Create courses
    const createdCourses = await Course.create(coursesWithInstructor);
    console.log(`✅ Created ${createdCourses.length} courses`);

    // Update teacher's createdCourses
    await User.findByIdAndUpdate(teacher._id, {
      createdCourses: createdCourses.map(c => c._id),
    });

    // Create progress for each student for each course
    const students = createdUsers.filter(u => u.role === 'student');
    for (const student of students) {
      const progressData = createdCourses.map(course => ({
        student: student._id,
        course: course._id,
        completedLessons: [],
        progressPercentage: 0,
      }));
      await Progress.create(progressData);
    }
    console.log(`✅ Created progress records for ${students.length} students`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Demo Accounts:');
    console.log('Admin: admin@edubridge.com / password123');
    console.log('Teacher: teacher@demo.com / password123');
    console.log('Student: student@demo.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
