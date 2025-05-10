// // clientSide/src/components/VolunteerForm.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const VolunteerForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     nationalID: "",
//     phone: "",
//     alternatePhone: "",
//     residence: "",
//     educationLevel: "",
//     major: "",
//     previousExperience: false,
//     previousRole: "",
//     preferredField: "",
//     skills: "",
//     source: "",
//     availability: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // تحقق من الحقول المطلوبة
//     if (!formData.fullName || !formData.nationalID || !formData.phone || !formData.residence ||
//         !formData.educationLevel || formData.previousExperience === "" || 
//         !formData.preferredField || !formData.availability) {
//       alert("يرجى ملء جميع الحقول المطلوبة.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/volunteers", formData);
//       alert("Volunteer registered successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Error registering volunteer: " + (error.response?.data?.message || "Unknown error"));
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-5 shadow-lg bg-white rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">كن متطوعًا</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="fullName" placeholder="الاسم الرباعي" onChange={handleChange} className="block w-full p-2 mb-3 border" required />
//         <input type="text" name="nationalID" placeholder="الرقم الوطني" onChange={handleChange} className="block w-full p-2 mb-3 border" required />
//         <input type="text" name="phone" placeholder="رقم الهاتف" onChange={handleChange} className="block w-full p-2 mb-3 border" required />
//         <input type="text" name="residence" placeholder="مكان السكن" onChange={handleChange} className="block w-full p-2 mb-3 border" required />
//         <select name="educationLevel" onChange={handleChange} className="block w-full p-2 mb-3 border" required>
//           <option value="">اختر المستوى التعليمي</option>
//           <option value="اعدادي">اعدادي</option>
//           <option value="ثانوي">ثانوي</option>
//           <option value="توجيهي">توجيهي</option>
//           <option value="بكالوريوس">بكالوريوس</option>
//           <option value="دراسات عليا">دراسات عليا</option>
//         </select>
//         <input type="text" name="preferredField" placeholder="المجال المفضل للتطوع" onChange={handleChange} className="block w-full p-2 mb-3 border" required />
//         <input type="text" name="availability" placeholder="الوقت المتاح" onChange={handleChange} className="block w-full p-2 mb-3 border" required />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">تسجيل</button>
//       </form>
//     </div>
//   );
// };

// export default VolunteerForm;


import React, { useState } from "react";
import axios from "axios";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nationalID: "",
    phone: "",
    alternatePhone: "",
    residence: "",
    educationLevel: "",
    major: "",
    previousExperience: false,
    previousRole: "",
    preferredField: "",
    skills: "",
    source: "",
    availability: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "fullName",
      "nationalID",
      "phone",
      "residence",
      "educationLevel",
      "preferredField",
      "availability",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "هذا الحقل مطلوب";
      }
    });

    // التحقق من تنسيق الرقم الوطني (10 أرقام)
    if (formData.nationalID && !/^\d{10}$/.test(formData.nationalID)) {
      errors.nationalID = "الرقم الوطني يجب أن يتكون من 10 أرقام";
    }

    // التحقق من رقم الهاتف
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "رقم الهاتف يجب أن يتكون من 10 أرقام";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // مسح رسائل الخطأ عند التعديل
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/volunteers",
        formData
      );
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        nationalID: "",
        phone: "",
        alternatePhone: "",
        residence: "",
        educationLevel: "",
        major: "",
        previousExperience: false,
        previousRole: "",
        preferredField: "",
        skills: "",
        source: "",
        availability: "",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert(
        "حدث خطأ أثناء التسجيل: " +
          (error.response?.data?.message || "خطأ غير معروف")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6">
          <h2 className="text-3xl font-bold text-white text-center">
            كن متطوعًا معنا
          </h2>
          <p className="text-blue-100 text-center mt-2">
            انضم إلى فريقنا وكن جزءًا من التغيير الإيجابي
          </p>
        </div>

        {submitSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 m-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm text-green-800">
                  تم تسجيل طلب التطوع بنجاح! سيتم التواصل معك قريباً.
                </p>
              </div>
            </div>
          </div>
        )}

        {Object.keys(formErrors).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm text-red-800">
                  يرجى تصحيح الأخطاء في النموذج
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                الاسم الرباعي <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`block w-full p-3 border ${
                  formErrors.fullName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="أدخل اسمك الرباعي"
              />
              {formErrors.fullName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="nationalID"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                الرقم الوطني <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nationalID"
                name="nationalID"
                value={formData.nationalID}
                onChange={handleChange}
                className={`block w-full p-3 border ${
                  formErrors.nationalID
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="0000000000"
              />
              {formErrors.nationalID && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.nationalID}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full p-3 border ${
                  formErrors.phone
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="07xxxxxxxx"
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="alternatePhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رقم هاتف بديل
              </label>
              <input
                type="text"
                id="alternatePhone"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="07xxxxxxxx (اختياري)"
              />
            </div>

            <div>
              <label
                htmlFor="residence"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                مكان السكن <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="residence"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                className={`block w-full p-3 border ${
                  formErrors.residence
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                placeholder="المحافظة / المنطقة"
              />
              {formErrors.residence && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.residence}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="educationLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                المستوى التعليمي <span className="text-red-500">*</span>
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className={`block w-full p-3 border ${
                  formErrors.educationLevel
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              >
                <option value="">اختر المستوى التعليمي</option>
                <option value="اعدادي">اعدادي</option>
                <option value="ثانوي">ثانوي</option>
                <option value="توجيهي">توجيهي</option>
                <option value="بكالوريوس">بكالوريوس</option>
                <option value="دراسات عليا">دراسات عليا</option>
              </select>
              {formErrors.educationLevel && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.educationLevel}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="major"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                التخصص
              </label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="التخصص الدراسي (إن وجد)"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              معلومات التطوع
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  id="previousExperience"
                  name="previousExperience"
                  type="checkbox"
                  checked={formData.previousExperience}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="previousExperience"
                  className="mr-2 block text-sm text-gray-700"
                >
                  هل لديك خبرة سابقة في العمل التطوعي؟
                </label>
              </div>

              {formData.previousExperience && (
                <div>
                  <label
                    htmlFor="previousRole"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    دورك السابق في العمل التطوعي
                  </label>
                  <input
                    type="text"
                    id="previousRole"
                    name="previousRole"
                    value={formData.previousRole}
                    onChange={handleChange}
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="اذكر دورك في الأعمال التطوعية السابقة"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="preferredField"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  المجال المفضل للتطوع <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="preferredField"
                  name="preferredField"
                  value={formData.preferredField}
                  onChange={handleChange}
                  className={`block w-full p-3 border ${
                    formErrors.preferredField
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  placeholder="المجال الذي ترغب بالتطوع فيه"
                />
                {formErrors.preferredField && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.preferredField}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  المهارات
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="المهارات التي تمتلكها"
                />
              </div>

              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  كيف سمعت عنا؟
                </label>
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">اختر مصدر المعرفة</option>
                  <option value="وسائل التواصل الاجتماعي">
                    وسائل التواصل الاجتماعي
                  </option>
                  <option value="الأصدقاء">الأصدقاء</option>
                  <option value="الفعاليات">الفعاليات</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  الوقت المتاح للتطوع <span className="text-red-500">*</span>
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className={`block w-full p-3 border ${
                    formErrors.availability
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                >
                  <option value="">اختر الوقت المناسب</option>
                  <option value="خلال أيام الأسبوع">خلال أيام الأسبوع</option>
                  <option value="عطلة نهاية الأسبوع">عطلة نهاية الأسبوع</option>
                  <option value="المساء فقط">المساء فقط</option>
                  <option value="مرن">مرن</option>
                </select>
                {formErrors.availability && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.availability}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-1/2 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري التسجيل...
                </>
              ) : (
                "تسجيل طلب التطوع"
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            الحقول المميزة بـ <span className="text-red-500">*</span> حقول
            إلزامية
          </p>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;