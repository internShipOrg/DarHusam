// // clientSide/src/components/TrainerForm.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const TrainerForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     nationalID: "",
//     phone: "",
//     alternatePhone: "",
//     email: "",
//     residence: "",
//     educationField: "",
//     trainingField: "",
//     experienceYears: "",
//     referees: [{ name: "", phone: "", email: "", position: "", residence: "" }],
//     confirmation: false,
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

//     if (!formData.confirmation) {
//       alert("يرجى تأكيد صحة المعلومات.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/trainers", formData);
//       alert("تم التسجيل كمدرب بنجاح!");
//     } catch (error) {
//       console.error(error);
//       alert("حدث خطأ أثناء التسجيل: " + (error.response?.data?.message || "Unknown error"));
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-5 shadow-lg bg-white rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">كن مدربًا</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="fullName" placeholder="الاسم الرباعي" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <input type="text" name="nationalID" placeholder="الرقم الوطني" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <input type="text" name="phone" placeholder="رقم الهاتف" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <input type="email" name="email" placeholder="البريد الإلكتروني" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <input type="text" name="residence" placeholder="مكان السكن" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <input type="text" name="educationField" placeholder="التخصص الدراسي" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <input type="text" name="trainingField" placeholder="مجال التدريب" onChange={handleChange} required className="block w-full p-2 mb-3 border" />
//         <select name="experienceYears" onChange={handleChange} required className="block w-full p-2 mb-3 border">
//           <option value="">عدد سنوات الخبرة كمدرب</option>
//           <option value="0">0</option>
//           <option value="6 اشهر-سنة">6 اشهر-سنة</option>
//           <option value="سنة – 3 سنوات">سنة – 3 سنوات</option>
//           <option value="اكثر من 3 سنوات">اكثر من 3 سنوات</option>
//         </select>
//         <input type="checkbox" name="confirmation" onChange={handleChange} /> <label>أقر أن جميع المعلومات صحيحة</label>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-3">تسجيل</button>
//       </form>
//     </div>
//   );
// };

// export default TrainerForm;



import React, { useState } from "react";
import axios from "axios";

const TrainerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nationalID: "",
    phone: "",
    alternatePhone: "",
    email: "",
    residence: "",
    educationField: "",
    trainingField: "",
    experienceYears: "",
    referees: [{ name: "", phone: "", email: "", position: "", residence: "" }],
    confirmation: false,
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.fullName) errors.fullName = "الاسم الرباعي مطلوب";
      if (!formData.nationalID) errors.nationalID = "الرقم الوطني مطلوب";
      else if (!/^\d{10}$/.test(formData.nationalID))
        errors.nationalID = "الرقم الوطني يجب أن يتكون من 10 أرقام";

      if (!formData.phone) errors.phone = "رقم الهاتف مطلوب";
      else if (!/^\d{10}$/.test(formData.phone))
        errors.phone = "رقم الهاتف يجب أن يتكون من 10 أرقام";

      if (formData.alternatePhone && !/^\d{10}$/.test(formData.alternatePhone))
        errors.alternatePhone = "رقم الهاتف البديل يجب أن يتكون من 10 أرقام";

      if (!formData.email) errors.email = "البريد الإلكتروني مطلوب";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        errors.email = "الرجاء إدخال بريد إلكتروني صحيح";

      if (!formData.residence) errors.residence = "مكان السكن مطلوب";
    } else if (step === 2) {
      if (!formData.educationField) errors.educationField = "التخصص الدراسي مطلوب";
      if (!formData.trainingField) errors.trainingField = "مجال التدريب مطلوب";
      if (!formData.experienceYears) errors.experienceYears = "سنوات الخبرة مطلوبة";
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

  const handleRefereeChange = (index, e) => {
    const { name, value } = e.target;
    const newReferees = [...formData.referees];
    newReferees[index] = { ...newReferees[index], [name]: value };
    
    setFormData({
      ...formData,
      referees: newReferees,
    });
  };

  const addReferee = () => {
    if (formData.referees.length < 3) {
      setFormData({
        ...formData,
        referees: [
          ...formData.referees,
          { name: "", phone: "", email: "", position: "", residence: "" }
        ],
      });
    }
  };

  const removeReferee = (index) => {
    if (formData.referees.length > 1) {
      const newReferees = [...formData.referees];
      newReferees.splice(index, 1);
      setFormData({
        ...formData,
        referees: newReferees,
      });
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    if (!formData.confirmation) {
      setFormErrors({
        ...formErrors,
        confirmation: "يرجى تأكيد صحة المعلومات",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/trainers", formData);
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        nationalID: "",
        phone: "",
        alternatePhone: "",
        email: "",
        residence: "",
        educationField: "",
        trainingField: "",
        experienceYears: "",
        referees: [{ name: "", phone: "", email: "", position: "", residence: "" }],
        confirmation: false,
      });
      setCurrentStep(1);
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

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index + 1 === currentStep
                  ? "bg-indigo-600 text-white"
                  : index + 1 < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } transition-all duration-300`}
            >
              {index + 1 < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <div
              className={`mt-2 text-xs font-medium ${
                index + 1 === currentStep
                  ? "text-indigo-600"
                  : index + 1 < currentStep
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {index === 0
                ? "المعلومات الشخصية"
                : index === 1
                ? "المؤهلات"
                : "المراجع"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-6">
          <h2 className="text-3xl font-bold text-white text-center">
            كن مدربًا معنا
          </h2>
          <p className="text-indigo-100 text-center mt-2">
            انضم لفريق المدربين وشارك خبراتك مع الآخرين
          </p>
        </div>

        {submitSuccess && (
          <div className="bg-green-50 border-r-4 border-green-500 p-4 m-4">
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
                  تم تسجيل طلب التدريب بنجاح! سيتم التواصل معك قريباً.
                </p>
              </div>
            </div>
          </div>
        )}

        {Object.keys(formErrors).length > 0 && (
          <div className="bg-red-50 border-r-4 border-red-500 p-4 m-4">
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

        <div className="p-6">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  المعلومات الشخصية
                </h3>
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
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
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
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
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
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
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
                      className={`block w-full p-3 border ${
                        formErrors.alternatePhone
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      placeholder="07xxxxxxxx (اختياري)"
                    />
                    {formErrors.alternatePhone && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.alternatePhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.email
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      placeholder="example@domain.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
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
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      placeholder="المحافظة / المنطقة"
                    />
                    {formErrors.residence && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.residence}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  المؤهلات والخبرات
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="educationField"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      التخصص الدراسي <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="educationField"
                      name="educationField"
                      value={formData.educationField}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.educationField
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      placeholder="أدخل تخصصك الدراسي"
                    />
                    {formErrors.educationField && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.educationField}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="trainingField"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      مجال التدريب <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="trainingField"
                      name="trainingField"
                      value={formData.trainingField}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.trainingField
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                      placeholder="المجال الذي ترغب بالتدريب فيه"
                    />
                    {formErrors.trainingField && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.trainingField}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="experienceYears"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      سنوات الخبرة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="experienceYears"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.experienceYears
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                    >
                      <option value="">عدد سنوات الخبرة كمدرب</option>
                      <option value="0">لا توجد خبرة سابقة</option>
                      <option value="6 اشهر-سنة">6 أشهر - سنة</option>
                      <option value="سنة – 3 سنوات">سنة – 3 سنوات</option>
                      <option value="اكثر من 3 سنوات">أكثر من 3 سنوات</option>
                    </select>
                    {formErrors.experienceYears && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.experienceYears}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  المراجع (اختياري)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  يمكنك إضافة حتى 3 مراجع يمكن الرجوع إليهم للاستفسار عن خبراتك السابقة
                </p>

                {formData.referees.map((referee, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-indigo-700">
                        المرجع {index + 1}
                      </h4>
                      {formData.referees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeReferee(index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`referee-name-${index}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          الاسم
                        </label>
                        <input
                          type="text"
                          id={`referee-name-${index}`}
                          name="name"
                          value={referee.name}
                          onChange={(e) => handleRefereeChange(index, e)}
                          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="اسم المرجع"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`referee-phone-${index}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          رقم الهاتف
                        </label>
                        <input
                          type="text"
                          id={`referee-phone-${index}`}
                          name="phone"
                          value={referee.phone}
                          onChange={(e) => handleRefereeChange(index, e)}
                          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="رقم هاتف المرجع"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`referee-email-${index}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          id={`referee-email-${index}`}
                          name="email"
                          value={referee.email}
                          onChange={(e) => handleRefereeChange(index, e)}
                          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="البريد الإلكتروني للمرجع"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`referee-position-${index}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          المسمى الوظيفي
                        </label>
                        <input
                          type="text"
                          id={`referee-position-${index}`}
                          name="position"
                          value={referee.position}
                          onChange={(e) => handleRefereeChange(index, e)}
                          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="المسمى الوظيفي للمرجع"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`referee-residence-${index}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          مكان العمل
                        </label>
                        <input
                          type="text"
                          id={`referee-residence-${index}`}
                          name="residence"
                          value={referee.residence}
                          onChange={(e) => handleRefereeChange(index, e)}
                          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="مكان عمل المرجع"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.referees.length < 3 && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={addReferee}
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      إضافة مرجع جديد
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <input
                      id="confirmation"
                      name="confirmation"
                      type="checkbox"
                      checked={formData.confirmation}
                      onChange={handleChange}
                      className={`h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                        formErrors.confirmation
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <label
                      htmlFor="confirmation"
                      className="mr-2 block text-sm text-gray-700"
                    >
                      أقر أن جميع المعلومات المقدمة صحيحة ودقيقة
                    </label>
                  </div>
                  {formErrors.confirmation && (
                    <p className="mt-1 text-sm text-red-600 mb-4">
                      {formErrors.confirmation}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-2 px-4 border border-indigo-300 rounded-lg shadow-sm text-md font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                  السابق
                </button>
              )}
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-2 px-6 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-8 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
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
                    "تسجيل طلب التدريب"
                  )}
                </button>
              )}
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            الحقول المميزة بـ <span className="text-red-500">*</span> حقول
            إلزامية
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerForm;