import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogOut, User, GraduationCap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="text-primary-600" size={32} />
            <span className="text-2xl font-bold text-primary-600">EduBridge</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-primary-600 transition font-medium"
            >
              Courses
            </Link>
            {isAuthenticated() && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition font-medium"
                >
                  Dashboard
                </Link>
                {user?.role === 'teacher' && (
                  <Link
                    to="/teacher"
                    className="text-gray-700 hover:text-primary-600 transition font-medium flex items-center gap-1"
                  >
                    <GraduationCap size={18} />
                    My Courses
                  </Link>
                )}
              </>
            )}
          </div>

          <div>
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-600" />
                  <span className="text-gray-700 font-medium hidden sm:block">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
