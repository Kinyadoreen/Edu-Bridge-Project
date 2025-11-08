import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore.js';
import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={!isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated() ? <Register /> : <Navigate to="/dashboard" />} 
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/teacher"
          element={
            isAuthenticated() && user?.role === 'teacher' ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
