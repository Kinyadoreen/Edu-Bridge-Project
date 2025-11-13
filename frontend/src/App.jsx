const React = require('react');
const { Routes, Route, Navigate } = require('react-router-dom');
const { useAuthStore } = require('./store/authStore.js');
const Navbar = require('./components/layout/Navbar.jsx');
const Home = require('./pages/Home.jsx');
const Login = require('./pages/Login.jsx');
const Register = require('./pages/Register.jsx');
const Courses = require('./pages/Courses.jsx');
const CourseDetail = require('./pages/CourseDetail.jsx');
const Dashboard = require('./pages/Dashboard.jsx');
const TeacherDashboard = require('./pages/TeacherDashboard.jsx');

function App() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
        />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/teacher"
          element={
            isAuthenticated && user?.role === 'teacher' ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

module.exports = App;
