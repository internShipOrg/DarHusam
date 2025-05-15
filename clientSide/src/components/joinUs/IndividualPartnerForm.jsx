// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const IndividualPartnerForm = () => {
// //   const navigate = useNavigate();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     nationalId: '',
// //     phone: '',
// //     email: '',
// //     residence: '',
// //     workField: '',
// //     supportType: '',
// //     supportReason: '',
// //     howDidYouHear: '',
// //     references: '',
// //     confirmation: false,
// //   });

// //   const validateForm = () => {
// //     const newErrors = {};
// //     Object.entries({
// //       fullName: 'الاسم الكامل',
// //       nationalId: 'رقم الهوية الوطنية',
// //       phone: 'رقم الهاتف',
// //       email: 'البريد الإلكتروني',
// //       residence: 'العنوان',
// //       workField: 'مجال العمل',
// //       supportType: 'نوع الدعم',
// //       supportReason: 'سبب الدعم',
// //       howDidYouHear: 'كيف سمعت عنا',
// //       references: 'المراجع',
// //     }).forEach(([key, label]) => {
// //       if (!formData[key]) {
// //         newErrors[key] = `حقل ${label} مطلوب`;
// //       }
// //     });

// //     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'البريد الإلكتروني غير صالح';
// //     }

// //     if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
// //       newErrors.phone = 'رقم الهاتف يجب أن يتكون من 10 أرقام';
// //     }

// //     if (!formData.confirmation) {
// //       newErrors.confirmation = 'يجب الموافقة على الشروط والأحكام';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       toast.error('يرجى التحقق من جميع الحقول المطلوبة');
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       await axios.post('http://localhost:5000/api/individual-partners', formData);
// //       toast.success('تم التسجيل بنجاح');
// //       navigate('/');
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'حدث خطأ أثناء التسجيل');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
// //         <h1 className="text-2xl font-bold mb-6 text-center">تسجيل شريك فردي</h1>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block mb-1">الاسم الكامل</label>
// //             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
// //             {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">رقم الهوية الوطنية</label>
// //             <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.nationalId ? 'border-red-500' : 'border-gray-300'}`} />
// //             {errors.nationalId && <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">رقم الهاتف</label>
// //             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
// //             {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">البريد الإلكتروني</label>
// //             <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
// //             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">العنوان</label>
// //             <input type="text" name="residence" value={formData.residence} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.residence ? 'border-red-500' : 'border-gray-300'}`} />
// //             {errors.residence && <p className="text-red-500 text-sm mt-1">{errors.residence}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">مجال العمل</label>
// //             <input type="text" name="workField" value={formData.workField} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.workField ? 'border-red-500' : 'border-gray-300'}`} />
// //             {errors.workField && <p className="text-red-500 text-sm mt-1">{errors.workField}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">نوع الدعم</label>
// //             <select name="supportType" value={formData.supportType} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.supportType ? 'border-red-500' : 'border-gray-300'}`}>
// //               <option value="">اختر نوع الدعم</option>
// //               <option value="مالي">مالي</option>
// //               <option value="مادي">مادي</option>
// //               <option value="فني">فني</option>
// //               <option value="لوجستي">لوجستي</option>
// //             </select>
// //             {errors.supportType && <p className="text-red-500 text-sm mt-1">{errors.supportType}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">سبب الدعم</label>
// //             <textarea name="supportReason" value={formData.supportReason} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.supportReason ? 'border-red-500' : 'border-gray-300'}`}></textarea>
// //             {errors.supportReason && <p className="text-red-500 text-sm mt-1">{errors.supportReason}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">كيف سمعت عنا</label>
// //             <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.howDidYouHear ? 'border-red-500' : 'border-gray-300'}`}>
// //               <option value="">اختر</option>
// //               <option value="socialMedia">وسائل التواصل الاجتماعي</option>
// //               <option value="friend">صديق</option>
// //               <option value="website">الموقع الإلكتروني</option>
// //               <option value="other">أخرى</option>
// //             </select>
// //             {errors.howDidYouHear && <p className="text-red-500 text-sm mt-1">{errors.howDidYouHear}</p>}
// //           </div>
// //           <div>
// //             <label className="block mb-1">المراجع</label>
// //             <textarea name="references" value={formData.references} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.references ? 'border-red-500' : 'border-gray-300'}`}></textarea>
// //             {errors.references && <p className="text-red-500 text-sm mt-1">{errors.references}</p>}
// //           </div>
// //           <div className="flex items-center">
// //             <input type="checkbox" name="confirmation" checked={formData.confirmation} onChange={handleChange} className="mr-2" />
// //             <label>أوافق على الشروط والأحكام</label>
// //           </div>
// //           {errors.confirmation && <p className="text-red-500 text-sm mt-1">{errors.confirmation}</p>}
// //           <div className="text-center mt-4">
// //             <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
// //               {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default IndividualPartnerForm; 


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const IndividualPartnerForm = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     fullName: '',
//     nationalId: '',
//     phone: '',
//     email: '',
//     residence: '',
//     workField: '',
//     supportType: '',
//     supportReason: '',
//     howDidYouHear: '',
//     references: '',
//     confirmation: false,
//   });

//   const validateForm = () => {
//     const newErrors = {};
//     Object.entries({
//       fullName: 'الاسم الكامل',
//       nationalId: 'رقم الهوية الوطنية',
//       phone: 'رقم الهاتف',
//       email: 'البريد الإلكتروني',
//       residence: 'العنوان',
//       workField: 'مجال العمل',
//       supportType: 'نوع الدعم',
//       supportReason: 'سبب الدعم',
//       howDidYouHear: 'كيف سمعت عنا',
//       references: 'المراجع',
//     }).forEach(([key, label]) => {
//       if (!formData[key]) {
//         newErrors[key] = `حقل ${label} مطلوب`;
//       }
//     });

//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'البريد الإلكتروني غير صالح';
//     }

//     if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
//       newErrors.phone = 'رقم الهاتف يجب أن يتكون من 10 أرقام';
//     }

//     if (!formData.confirmation) {
//       newErrors.confirmation = 'يجب الموافقة على الشروط والأحكام';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('يرجى التحقق من جميع الحقول المطلوبة');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await axios.post('http://localhost:5000/api/individual-partners', formData);
//       toast.success('تم التسجيل بنجاح');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'حدث خطأ أثناء التسجيل');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-2xl font-bold mb-6 text-center">تسجيل شريك فردي</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1">الاسم الكامل</label>
//             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">رقم الهوية الوطنية</label>
//             <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.nationalId ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.nationalId && <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">رقم الهاتف</label>
//             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">البريد الإلكتروني</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">العنوان</label>
//             <input type="text" name="residence" value={formData.residence} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.residence ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.residence && <p className="text-red-500 text-sm mt-1">{errors.residence}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">مجال العمل</label>
//             <input type="text" name="workField" value={formData.workField} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.workField ? 'border-red-500' : 'border-gray-300'}`} />
//             {errors.workField && <p className="text-red-500 text-sm mt-1">{errors.workField}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">نوع الدعم</label>
//             <select name="supportType" value={formData.supportType} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.supportType ? 'border-red-500' : 'border-gray-300'}`}>
//               <option value="">اختر نوع الدعم</option>
//               <option value="مالي">مالي</option>
//               <option value="مادي">مادي</option>
//               <option value="فني">فني</option>
//               <option value="لوجستي">لوجستي</option>
//             </select>
//             {errors.supportType && <p className="text-red-500 text-sm mt-1">{errors.supportType}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">سبب الدعم</label>
//             <textarea name="supportReason" value={formData.supportReason} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.supportReason ? 'border-red-500' : 'border-gray-300'}`}></textarea>
//             {errors.supportReason && <p className="text-red-500 text-sm mt-1">{errors.supportReason}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">كيف سمعت عنا</label>
//             <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.howDidYouHear ? 'border-red-500' : 'border-gray-300'}`}>
//               <option value="">اختر</option>
//               <option value="socialMedia">وسائل التواصل الاجتماعي</option>
//               <option value="friend">صديق</option>
//               <option value="website">الموقع الإلكتروني</option>
//               <option value="other">أخرى</option>
//             </select>
//             {errors.howDidYouHear && <p className="text-red-500 text-sm mt-1">{errors.howDidYouHear}</p>}
//           </div>
//           <div>
//             <label className="block mb-1">المراجع</label>
//             <textarea name="references" value={formData.references} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.references ? 'border-red-500' : 'border-gray-300'}`}></textarea>
//             {errors.references && <p className="text-red-500 text-sm mt-1">{errors.references}</p>}
//           </div>
//           <div className="flex items-center">
//             <input type="checkbox" name="confirmation" checked={formData.confirmation} onChange={handleChange} className="mr-2" />
//             <label>أوافق على الشروط والأحكام</label>
//           </div>
//           {errors.confirmation && <p className="text-red-500 text-sm mt-1">{errors.confirmation}</p>}
//           <div className="text-center mt-4">
//             <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
//               {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default IndividualPartnerForm; 


import React, { useState } from 'react';
import { UserCircle, Mail, Phone, MapPin, Briefcase, HelpCircle, FileText, Info, AlertCircle } from 'lucide-react';

const IndividualPartnerForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    residence: '',
    workField: '',
    supportType: '',
    supportReason: '',
    howDidYouHear: '',
    references: '',
    confirmation: false,
  });

  const validateForm = () => {
    const newErrors = {};
    Object.entries({
      fullName: 'الاسم الكامل',
      nationalId: 'رقم الهوية الوطنية',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      residence: 'العنوان',
      workField: 'مجال العمل',
      supportType: 'نوع الدعم',
      supportReason: 'سبب الدعم',
      howDidYouHear: 'كيف سمعت عنا',
      references: 'المراجع',
    }).forEach(([key, label]) => {
      if (!formData[key]) {
        newErrors[key] = `حقل ${label} مطلوب`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف يجب أن يتكون من 10 أرقام';
    }

    if (!formData.confirmation) {
      newErrors.confirmation = 'يجب الموافقة على الشروط والأحكام';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert('يرجى التحقق من جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      alert('تم التسجيل بنجاح');
      setFormData({
        fullName: '',
        nationalId: '',
        phone: '',
        email: '',
        residence: '',
        workField: '',
        supportType: '',
        supportReason: '',
        howDidYouHear: '',
        references: '',
        confirmation: false,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-l from-[#780C28] to-[#6E8E59] py-6 px-8 text-white">
            <h1 className="text-2xl font-bold mb-2">تسجيل شريك فردي</h1>
            <p className="text-white/80 text-sm">انضم إلينا وكن جزءًا من التغيير الإيجابي في المجتمع</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-[#780C28] font-bold text-lg mb-4 flex items-center">
                  <UserCircle size={20} className="ml-2" />
                  <span>المعلومات الشخصية</span>
                </h2>
                <div className="h-px bg-gradient-to-l from-[#780C28] to-[#6E8E59] mb-6"></div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium">الاسم الكامل <span className="text-[#780C28]">*</span></label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} 
                  placeholder="أدخل الاسم الكامل"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.fullName}</p>}
              </div>

              {/* National ID */}
              <div>
                <label className="block mb-2 font-medium">رقم الهوية الوطنية <span className="text-[#780C28]">*</span></label>
                <input 
                  type="text" 
                  name="nationalId" 
                  value={formData.nationalId} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.nationalId ? 'border-red-500' : 'border-gray-300'}`} 
                  placeholder="أدخل رقم الهوية"
                />
                {errors.nationalId && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.nationalId}</p>}
              </div>

              {/* Contact Information Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-[#780C28] font-bold text-lg mb-4 flex items-center">
                  <Mail size={20} className="ml-2" />
                  <span>معلومات الاتصال</span>
                </h2>
                <div className="h-px bg-gradient-to-l from-[#780C28] to-[#6E8E59] mb-6"></div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium">رقم الهاتف <span className="text-[#780C28]">*</span></label>
                <div className="relative">
                  <Phone size={18} className="absolute right-3 top-3.5 text-gray-400" />
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="05xxxxxxxx"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">البريد الإلكتروني <span className="text-[#780C28]">*</span></label>
                <div className="relative">
                  <Mail size={18} className="absolute right-3 top-3.5 text-gray-400" />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="example@domain.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.email}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 font-medium">العنوان <span className="text-[#780C28]">*</span></label>
                <div className="relative">
                  <MapPin size={18} className="absolute right-3 top-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    name="residence" 
                    value={formData.residence} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.residence ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="المدينة، الحي"
                  />
                </div>
                {errors.residence && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.residence}</p>}
              </div>

              {/* Work Field */}
              <div>
                <label className="block mb-2 font-medium">مجال العمل <span className="text-[#780C28]">*</span></label>
                <div className="relative">
                  <Briefcase size={18} className="absolute right-3 top-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    name="workField" 
                    value={formData.workField} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.workField ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="مجال عملك الحالي"
                  />
                </div>
                {errors.workField && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.workField}</p>}
              </div>

              {/* Support Information Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-[#780C28] font-bold text-lg mb-4 flex items-center">
                  <HelpCircle size={20} className="ml-2" />
                  <span>معلومات الدعم</span>
                </h2>
                <div className="h-px bg-gradient-to-l from-[#780C28] to-[#6E8E59] mb-6"></div>
              </div>

              {/* Support Type */}
              <div>
                <label className="block mb-2 font-medium">نوع الدعم <span className="text-[#780C28]">*</span></label>
                <select 
                  name="supportType" 
                  value={formData.supportType} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all appearance-none bg-white ${errors.supportType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">اختر نوع الدعم</option>
                  <option value="مالي">مالي</option>
                  <option value="مادي">مادي</option>
                  <option value="فني">فني</option>
                  <option value="لوجستي">لوجستي</option>
                </select>
                {errors.supportType && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.supportType}</p>}
              </div>

              {/* How did you hear */}
              <div>
                <label className="block mb-2 font-medium">كيف سمعت عنا <span className="text-[#780C28]">*</span></label>
                <select 
                  name="howDidYouHear" 
                  value={formData.howDidYouHear} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all appearance-none bg-white ${errors.howDidYouHear ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">اختر</option>
                  <option value="socialMedia">وسائل التواصل الاجتماعي</option>
                  <option value="friend">صديق</option>
                  <option value="website">الموقع الإلكتروني</option>
                  <option value="other">أخرى</option>
                </select>
                {errors.howDidYouHear && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.howDidYouHear}</p>}
              </div>

              {/* Support Reason - Full width */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">سبب الدعم <span className="text-[#780C28]">*</span></label>
                <textarea 
                  name="supportReason" 
                  value={formData.supportReason} 
                  onChange={handleChange} 
                  rows="3" 
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.supportReason ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="اذكر سبب رغبتك في دعم المؤسسة"
                ></textarea>
                {errors.supportReason && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.supportReason}</p>}
              </div>

              {/* References - Full width */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">المراجع <span className="text-[#780C28]">*</span></label>
                <textarea 
                  name="references" 
                  value={formData.references} 
                  onChange={handleChange} 
                  rows="3" 
                  className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E8E59]/50 transition-all ${errors.references ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="اذكر أي مراجع أو خبرات سابقة ذات صلة"
                ></textarea>
                {errors.references && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.references}</p>}
              </div>

              {/* Terms and Conditions - Full width */}
              <div className="md:col-span-2 flex items-start mt-2">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="confirmation"
                    name="confirmation"
                    checked={formData.confirmation}
                    onChange={handleChange}
                    className="w-4 h-4 border-gray-300 rounded focus:ring-[#6E8E59] text-[#780C28]"
                  />
                </div>
                <div className="mr-3 text-sm">
                  <label htmlFor="confirmation" className="font-medium text-gray-700">
                    أوافق على <a href="#" className="text-[#780C28] underline hover:text-[#6E8E59]">الشروط والأحكام</a> وسياسة الخصوصية
                  </label>
                  {errors.confirmation && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="ml-1" /> {errors.confirmation}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-[#780C28] hover:bg-[#6E8E59] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 shadow-md flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
              </button>
            </div>

            {/* Additional information note */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              <div className="flex items-center justify-center">
                <Info size={16} className="ml-1" />
                <span>جميع المعلومات المقدمة سيتم التعامل معها بسرية تامة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPartnerForm;