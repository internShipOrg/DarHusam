// components/Bookings/AdminBookings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, CalendarDays, Home, Trash2, Filter, X } from "lucide-react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [halls, setHalls] = useState([]);
  const [filters, setFilters] = useState({
    hallId: "",
    date: "",
    search: "",
  });

  useEffect(() => {
    fetchData();
    fetchHalls();
  }, [filters]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const params = new URLSearchParams();
      if (filters.hallId) params.append("hallId", filters.hallId);
      if (filters.date) params.append("date", filters.date);
      if (filters.search) params.append("search", filters.search);

      const response = await axios.get(
        `http://localhost:5000/api/bookings?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchHalls = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/bookings/unique-halls",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHalls(response.data);
    } catch (err) {
      console.error("Failed to fetch halls:", err);
      // Fallback to empty array if API fails
      setHalls([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("هل أنت متأكد من حذف هذا الحجز؟")) return;

      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete booking");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      hallId: "",
      date: "",
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#780C28] rounded-xl">
                <CalendarDays className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#780C28]">
                  إدارة الحجوزات
                </h2>
                <p className="text-gray-500 mt-1">عرض وإدارة جميع الحجوزات</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl shadow-md animate-pulse">
            <div className="flex">
              <div className="ml-3">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Home className="w-5 h-5 text-gray-400" />
              </div>
              <select
                name="hallId"
                value={filters.hallId}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:border-[#780C28] focus:ring-1 focus:ring-[#780C28]/50"
              >
                <option value="">كل القاعات</option>
                {halls.map((hall) => (
                  <option key={hall.id} value={hall.id}>
                    {hall.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CalendarDays className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:border-[#780C28] focus:ring-1 focus:ring-[#780C28]/50"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="بحث بالاسم أو الهاتف أو الإيميل"
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:border-[#780C28] focus:ring-1 focus:ring-[#780C28]/50"
              />
            </div>

            <button
              onClick={clearFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <X className="w-5 h-5 mr-2" />
              مسح الفلتر
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#780C28] border-t-transparent"></div>
              <p className="mt-4 text-gray-600 text-lg">
                جاري تحميل الحجوزات...
              </p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              لا توجد حجوزات متطابقة مع معايير البحث
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="p-2 bg-[#780C28]/10 rounded-lg">
                          <CalendarDays className="text-[#780C28] w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {booking.fullName}
                            <span className="ml-3 text-sm font-normal text-gray-500">
                              {booking.hallName}
                            </span>
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {booking.date}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {booking.time}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {booking.phone}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {booking.email}
                            </span>
                          </div>
                          {booking.notes && (
                            <p className="mt-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
