import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Users, MessageSquare, BriefcaseIcon, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminApplications from '../components/admin/AdminApplications';
import AdminMessages from '../components/admin/AdminMessages';

export default function AdminPanel() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">
                  iTalentHunt Admin
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/admin"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/applications"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <BriefcaseIcon className="h-4 w-4 mr-2" />
                  Applications
                </Link>
                <Link
                  to="/admin/messages"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/applications" element={<AdminApplications />} />
              <Route path="/messages" element={<AdminMessages />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}