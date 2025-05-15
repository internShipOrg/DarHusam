import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  MessageSquare,
  UserPlus,
  GraduationCap,
  Briefcase,
  Building2,
  LogOut,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('contacts');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'حدث خطأ أثناء جلب البيانات');
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'contacts', label: 'الرسائل', icon: MessageSquare },
    { id: 'volunteers', label: 'المتطوعين', icon: Users },
    { id: 'trainers', label: 'المدربين', icon: UserPlus },
    { id: 'trainees', label: 'المتدربين', icon: GraduationCap },
    { id: 'partners', label: 'الشركاء', icon: Building2 },
    { id: 'individual-partners', label: 'الشركاء الأفراد', icon: Briefcase }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#780C28] text-xl">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-[#780C28]">لوحة التحكم</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#780C28] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="ml-3" size={20} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="ml-3" size={20} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mr-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-[#780C28]">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h1>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <MessageSquare className="text-[#780C28] ml-4" size={24} />
                <div>
                  <p className="text-gray-500">الرسائل</p>
                  <p className="text-2xl font-bold">{stats?.stats.totalContacts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="text-[#780C28] ml-4" size={24} />
                <div>
                  <p className="text-gray-500">المتطوعين</p>
                  <p className="text-2xl font-bold">{stats?.stats.totalVolunteers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <UserPlus className="text-[#780C28] ml-4" size={24} />
                <div>
                  <p className="text-gray-500">المدربين</p>
                  <p className="text-2xl font-bold">{stats?.stats.totalTrainers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <GraduationCap className="text-[#780C28] ml-4" size={24} />
                <div>
                  <p className="text-gray-500">المتدربين</p>
                  <p className="text-2xl font-bold">{stats?.stats.totalTrainees}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Building2 className="text-[#780C28] ml-4" size={24} />
                <div>
                  <p className="text-gray-500">الشركاء المؤسسات</p>
                  <p className="text-2xl font-bold">{stats?.stats.totalPartners}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Briefcase className="text-[#780C28] ml-4" size={24} />
                <div>
                  <p className="text-gray-500">الشركاء الأفراد</p>
                  <p className="text-2xl font-bold">{stats?.stats.totalIndividualPartners}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {activeTab === 'contacts' && (
                <div className="space-y-4">
                  {stats?.contacts.map((contact) => (
                    <div key={contact._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-gray-500">{contact.email}</p>
                          <p className="text-gray-500">{contact.phone}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'volunteers' && (
                <div className="space-y-4">
                  {stats?.volunteers.map((volunteer) => (
                    <div key={volunteer._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{volunteer.fullName}</h3>
                          <p className="text-gray-500">{volunteer.email}</p>
                          <p className="text-gray-500">{volunteer.phone}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(volunteer.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'trainers' && (
                <div className="space-y-4">
                  {stats?.trainers.map((trainer) => (
                    <div key={trainer._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{trainer.fullName}</h3>
                          <p className="text-gray-500">{trainer.email}</p>
                          <p className="text-gray-500">{trainer.phone}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(trainer.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'trainees' && (
                <div className="space-y-4">
                  {stats?.trainees.map((trainee) => (
                    <div key={trainee._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{trainee.fullName}</h3>
                          <p className="text-gray-500">{trainee.email}</p>
                          <p className="text-gray-500">{trainee.phone}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(trainee.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'partners' && (
                <div className="space-y-4">
                  {stats?.partners.map((partner) => (
                    <div key={partner._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{partner.organizationName}</h3>
                          <p className="text-gray-500">{partner.email}</p>
                          <p className="text-gray-500">{partner.phone}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(partner.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'individual-partners' && (
                <div className="space-y-4">
                  {stats?.individualPartners.map((partner) => (
                    <div key={partner._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{partner.fullName}</h3>
                          <p className="text-gray-500">{partner.email}</p>
                          <p className="text-gray-500">{partner.phone}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(partner.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 