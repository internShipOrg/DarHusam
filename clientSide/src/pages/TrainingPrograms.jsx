import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const TrainingPrograms = () => {
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [programs, setPrograms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        fetchPrograms();
    }, [category, search]);

    const fetchPrograms = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/programs/", {
                params: { category, search },
            });
            setPrograms(response.data);
            const uniqueCategories = [...new Set(response.data.map((p) => p.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("خطأ أثناء جلب البرامج:", error);
        }
    };

    const openRegisterForm = (programId) => {
        setSelectedProgramId(programId);
        setShowForm(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/register/", {
                ...formData,
                programId: selectedProgramId,
            });
            Swal.fire({
                title: 'تم التسجيل بنجاح',
                text: 'شكراً لتسجيلك في البرنامج',
                icon: 'success',
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#3085d6',
                timer: 3000
            });
            
            setShowForm(false);
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            Swal.fire({
                title: 'خطأ!',
                text: 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى',
                icon: 'error',
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-8 font-sans rtl">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#780C28] text-white p-6">
                    <h1 className="text-3xl font-bold text-center">برامج التدريب</h1>
                </div>
                {/* Filters */}
                <div className="p-6 bg-white">
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <select
                                className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28] appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">كل الفئات</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28]"
                                placeholder="ابحث عن برنامج..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    {showForm && (
                        <div className="mb-8">
                            <div className="bg-blue-50 border-l-4 border-[#780C28] p-4 mb-6 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0 text-[#780C28]">
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="mr-3">
                                        <p className="text-[#780C28] font-medium">الرجاء تعبئة النموذج للتسجيل في البرنامج</p>
                                    </div>
                                </div>
                            </div>
                            <form
                                onSubmit={handleRegister}
                                className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                            >
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        الاسم الكامل
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="أدخل الاسم الكامل"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28]"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="example@domain.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28]"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                        رقم الهاتف
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        placeholder="+966 XX XXX XXXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28]"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                                    <button
                                        type="button"
                                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                        onClick={() => setShowForm(false)}
                                    >
                                        إلغاء
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="bg-[#780C28] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#753244] transition-colors"
                                    >
                                        تسجيل
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Programs List */}
                    <div className="space-y-6">
                        {programs.map((program) => (
                            <div key={program._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h2>
                                            <div className="flex items-center text-gray-500 text-sm mb-3">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <span>{program.startDate} - {program.endDate}</span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{program.description}</p>
                                        </div>
                                        <div className="ml-2">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                                                {program.category}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openRegisterForm(program._id)}
                                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#780C28] hover:bg-[#8c374d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#780C28]"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        سجل الآن
                                    </button>
                                </div>
                            </div>
                        ))}

                        {programs.length === 0 && (
                            <div className="text-center py-10">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">لا توجد برامج مطابقة للبحث</h3>
                                <p className="mt-1 text-sm text-gray-500">جرب تغيير معايير البحث أو عرض جميع البرامج</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );      
};

export default TrainingPrograms;

