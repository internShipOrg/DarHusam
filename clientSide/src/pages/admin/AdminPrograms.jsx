import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Archive,
  RotateCcw,
  Calendar,
  List,
} from "lucide-react";

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState(true);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const [programsRes, categoriesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/programs?includeDeleted=true", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/programs/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setPrograms(programsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (editingProgram) {
        await axios.put(
          `http://localhost:5000/api/programs/${editingProgram._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/programs", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setViewMode(true);
      fetchData();
      setEditingProgram(null);
      setFormData({
        name: "",
        description: "",
        category: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save program");
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      description: program.description,
      category: program.category,
      startDate: program.startDate,
      endDate: program.endDate,
    });
    setViewMode(false);
  };

  const handleSoftDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `http://localhost:5000/api/programs/${id}/soft-delete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData(); // Refresh the list to update the UI
    } catch (err) {
      setError(err.response?.data?.message || "Failed to archive program");
    }
  };

  const handleRestore = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `http://localhost:5000/api/programs/${id}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData(); // Refresh the list to update the UI
    } catch (err) {
      setError(err.response?.data?.message || "Failed to restore program");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("هل أنت متأكد من الحذف النهائي لهذا البرنامج؟"))
        return;

      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/programs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh the list after deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete program");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#780C28] rounded-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#780C28]">
                  إدارة البرامج
                </h2>
                <p className="text-gray-500 mt-1">إدارة البرامج والأنشطة</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setViewMode(true);
                      setEditingProgram(null);
                      setFormData({
                        name: "",
                        description: "",
                        category: "",
                        startDate: "",
                        endDate: "",
                      });
                    }}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                      viewMode
                        ? "bg-white text-[#780C28] shadow-md font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <List className="w-5 h-5" />
                      <span>عرض البرامج</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setViewMode(false);
                      setEditingProgram(null);
                      setFormData({
                        name: "",
                        description: "",
                        category: "",
                        startDate: "",
                        endDate: "",
                      });
                    }}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                      !viewMode
                        ? "bg-white text-[#780C28] shadow-md font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>إضافة برنامج</span>
                    </div>
                  </button>
                </div>
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

        {/* Main Content */}
        {/* Main Content */}
        <div className="transition-all duration-500 ease-in-out">
          {viewMode ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#780C28] border-t-transparent"></div>
                  <p className="mt-4 text-gray-600 text-lg">جاري التحميل...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {programs.map((program, index) => (
                    <div
                      key={program._id}
                      className={`p-6 transition-all duration-300 ${
                        program.isDeleted
                          ? "bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400"
                          : "hover:bg-gray-50 hover:shadow-md"
                      } transform hover:scale-[1.01]`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div
                              className={`p-2 rounded-lg ${
                                program.isDeleted
                                  ? "bg-red-100"
                                  : "bg-[#780C28]/10"
                              }`}
                            >
                              <Calendar
                                className={`${
                                  program.isDeleted
                                    ? "text-red-500"
                                    : "text-[#780C28]"
                                }`}
                                size={20}
                              />
                            </div>
                            <div>
                              <h3
                                className={`text-xl font-bold ${
                                  program.isDeleted
                                    ? "text-red-700"
                                    : "text-gray-800"
                                }`}
                              >
                                {program.name}
                                {program.isDeleted && (
                                  <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                                    محذوفة
                                  </span>
                                )}
                              </h3>
                              <p
                                className={`text-gray-600 leading-relaxed mb-4 ${
                                  program.isDeleted ? "text-red-400" : ""
                                }`}
                              >
                                {program.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                program.isDeleted
                                  ? "bg-red-100 text-red-800"
                                  : "bg-[#780C28]/10 text-[#780C28]"
                              }`}
                            >
                              {program.category || "بدون فئة"}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                program.isDeleted
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {program.startDate} → {program.endDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-6">
                          {!program.isDeleted ? (
                            <>
                              <button
                                onClick={() => handleEdit(program)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#6e8e59] to-[#780C28] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                تعديل
                              </button>
                              <button
                                onClick={() => handleSoftDelete(program._id)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <Archive className="w-4 h-4 mr-2" />
                                أرشيف
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleRestore(program._id)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                استعادة
                              </button>
                              <button
                                onClick={() => handleDelete(program._id)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                حذف نهائي
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#780C28] to-[#6e8e59] bg-clip-text text-transparent mb-2">
                  {editingProgram ? "تعديل البرنامج" : "إضافة برنامج جديد"}
                </h2>
                <p className="text-gray-600">
                  املأ البيانات المطلوبة لإضافة برنامج جديد
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      اسم البرنامج
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#780C28] focus:ring-2 focus:ring-[#780C28]/20 transition-all duration-200 outline-none"
                      placeholder="أدخل اسم البرنامج"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      الفئة
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6e8e59] focus:ring-2 focus:ring-[#6e8e59]/20 transition-all duration-200 outline-none"
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    الوصف
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#780C28] focus:ring-2 focus:ring-[#780C28]/20 transition-all duration-200 outline-none resize-none"
                    placeholder="أدخل وصف البرنامج"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      تاريخ البدء
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#780C28] focus:ring-2 focus:ring-[#780C28]/20 transition-all duration-200 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6e8e59] focus:ring-2 focus:ring-[#6e8e59]/20 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode(true);
                      setEditingProgram(null);
                      setFormData({
                        name: "",
                        description: "",
                        category: "",
                        startDate: "",
                        endDate: "",
                      });
                    }}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#780C28] to-[#6e8e59] text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    {editingProgram ? "حفظ التعديلات" : "إضافة البرنامج"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPrograms;
