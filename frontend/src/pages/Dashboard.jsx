import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { useDashboard } from '../hooks/useAuth.js';
import { useAuthStore } from '../store/authStore.js';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = data?.stats || { totalCourses: 0, completedCourses: 0, certificates: 0 };
  const enrolledCourses = data?.enrolledCourses || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Enrolled Courses</p>
                <p className="text-4xl font-bold text-primary-600">{stats.totalCourses}</p>
              </div>
              <BookOpen className="text-primary-600" size={48} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Completed</p>
                <p className="text-4xl font-bold text-green-600">{stats.completedCourses}</p>
              </div>
              <TrendingUp className="text-green-600" size={48} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Certificates</p>
                <p className="text-4xl font-bold text-purple-600">{stats.certificates}</p>
              </div>
              <Award className="text-purple-600" size={48} />
            </div>
          </div>
        </div>

        {/* My Courses */}
        <h2 className="text-2xl font-bold mb-6">My Courses</h2>

        {enrolledCourses.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Courses Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start learning today by enrolling in our free courses!
            </p>
            <Link to="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="card hover:shadow-xl transition"
              >
                <div className="h-32 bg-gradient-to-br from-primary-500 to-purple-600 rounded-t-xl -mt-6 -mx-6 mb-4 flex items-center justify-center">
                  <BookOpen size={48} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>

                <button className="btn-primary w-full">
                  Continue Learning →
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
