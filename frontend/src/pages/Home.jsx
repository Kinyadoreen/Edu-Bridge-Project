import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';

export default function Home() {
  const stats = [
    { icon: <Users size={40} />, number: '50,000+', label: 'Students' },
    { icon: <BookOpen size={40} />, number: '200+', label: 'Free Courses' },
    { icon: <Award size={40} />, number: '15,000+', label: 'Certificates' },
    { icon: <TrendingUp size={40} />, number: '95%', label: 'Success Rate' },
  ];

  const features = [
    { emoji: '💰', title: '100% Free', desc: 'All courses completely free. No hidden costs ever.' },
    { emoji: '⏰', title: 'Learn at Your Pace', desc: 'Study anytime, anywhere on any device.' },
    { emoji: '👨‍🏫', title: 'Expert Instructors', desc: 'Learn from industry professionals.' },
    { emoji: '🎓', title: 'Certificates', desc: 'Earn certificates to boost your career.' },
    { emoji: '📱', title: 'Mobile Friendly', desc: 'Perfect experience on all devices.' },
    { emoji: '🌍', title: 'Global Community', desc: 'Join learners from around the world.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Quality Education for <span className="text-yellow-300">Everyone</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Bridge the gap in education with free, accessible courses designed for
            underprivileged communities worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Explore Courses
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-primary-600 flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose EduBridge?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of learners who are transforming their lives through quality education
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and access hundreds of free courses today
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Sign Up Now - It's Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
