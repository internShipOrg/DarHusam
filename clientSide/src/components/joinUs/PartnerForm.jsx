import React, { useState } from "react";
import axios from "axios";

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationLocation: "",
    isLicensed: false,
    industry: "",
    director: { name: "", phone: "", email: "" },
    liaison: { name: "", phone: "", email: "" },
    partnershipType: "",
    duration: "",
    expectations: "",
    ourOffer: "",
    socialMedia: "",
    licenseImage: "",
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
      if (!formData.organizationName.trim()) 
        errors.organizationName = "اسم المؤسسة مطلوب";
      
      if (!formData.organizationLocation.trim()) 
        errors.organizationLocation = "موقع المؤسسة مطلوب";
      
      if (!formData.industry.trim()) 
        errors.industry = "مجال عمل المؤسسة مطلوب";
      
      if (formData.isLicensed && !formData.licenseImage)
        errors.licenseImage = "يرجى إرفاق صورة الترخيص";
    } else if (step === 2) {
      // التحقق من بيانات المدير
      if (!formData.director.name.trim()) 
        errors["director.name"] = "اسم المدير مطلوب";
      
      if (!formData.director.phone.trim()) 
        errors["director.phone"] = "رقم هاتف المدير مطلوب";
      else if (!/^\d{10}$/.test(formData.director.phone.trim()))
        errors["director.phone"] = "رقم الهاتف يجب أن يتكون من 10 أرقام";
      
      if (!formData.director.email.trim()) 
        errors["director.email"] = "بريد المدير الإلكتروني مطلوب";
      else if (!/\S+@\S+\.\S+/.test(formData.director.email.trim()))
        errors["director.email"] = "الرجاء إدخال بريد إلكتروني صحيح";
      
      // التحقق من بيانات مسؤول التواصل
      if (!formData.liaison.name.trim()) 
        errors["liaison.name"] = "اسم مسؤول التواصل مطلوب";
      
      if (!formData.liaison.phone.trim()) 
        errors["liaison.phone"] = "رقم هاتف مسؤول التواصل مطلوب";
      else if (!/^\d{10}$/.test(formData.liaison.phone.trim()))
        errors["liaison.phone"] = "رقم الهاتف يجب أن يتكون من 10 أرقام";
      
      if (!formData.liaison.email.trim()) 
        errors["liaison.email"] = "بريد مسؤول التواصل الإلكتروني مطلوب";
      else if (!/\S+@\S+\.\S+/.test(formData.liaison.email.trim()))
        errors["liaison.email"] = "الرجاء إدخال بريد إلكتروني صحيح";
    } else if (step === 3) {
      if (!formData.partnershipType.trim()) 
        errors.partnershipType = "نوع الشراكة مطلوب";
      
      if (!formData.duration.trim()) 
        errors.duration = "مدة الشراكة مطلوبة";
      
      if (!formData.confirmation)
        errors.confirmation = "يرجى تأكيد صحة المعلومات";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // التعامل مع الحقول المتداخلة مثل director.name
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // مسح رسائل الخطأ عند التعديل
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          licenseImage: "حجم الصورة يجب أن لا يتجاوز 2 ميجابايت"
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setFormErrors({
          ...formErrors,
          licenseImage: "يرجى اختيار ملف صورة صالح"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress the image
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with reduced quality
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
          
          setFormData({
            ...formData,
            licenseImage: compressedImage,
          });
          
          if (formErrors.licenseImage) {
            setFormErrors({
              ...formErrors,
              licenseImage: "",
            });
          }
        };
      };
      reader.readAsDataURL(file);
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

    // Validate all steps before submission
    for (let step = 1; step <= totalSteps; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/partners", {
        ...formData,
        // Ensure all required fields are present and properly formatted
        organizationName: formData.organizationName.trim(),
        organizationLocation: formData.organizationLocation.trim(),
        industry: formData.industry.trim(),
        director: {
          name: formData.director.name.trim(),
          phone: formData.director.phone.trim(),
          email: formData.director.email.trim()
        },
        liaison: {
          name: formData.liaison.name.trim(),
          phone: formData.liaison.phone.trim(),
          email: formData.liaison.email.trim()
        },
        partnershipType: formData.partnershipType.trim(),
        duration: formData.duration.trim()
      });

      if (response.status === 201) {
        setSubmitSuccess(true);
        setFormData({
          organizationName: "",
          organizationLocation: "",
          isLicensed: false,
          industry: "",
          director: { name: "", phone: "", email: "" },
          liaison: { name: "", phone: "", email: "" },
          partnershipType: "",
          duration: "",
          expectations: "",
          ourOffer: "",
          socialMedia: "",
          licenseImage: "",
          confirmation: false,
        });
        setCurrentStep(1);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.message || "حدث خطأ أثناء التسجيل";
      setFormErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
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
                  ? "bg-purple-600 text-white"
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
                  ? "text-purple-600"
                  : index + 1 < currentStep
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {index === 0
                ? "معلومات المؤسسة"
                : index === 1
                ? "بيانات الاتصال"
                : "تفاصيل الشراكة"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-6">
          <h2 className="text-3xl font-bold text-white text-center">
            التسجيل كشريك
          </h2>
          <p className="text-purple-100 text-center mt-2">
            انضم إلينا كشريك استراتيجي وساهم معنا في إحداث الأثر الإيجابي
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
                  تم تسجيل طلب الشراكة بنجاح! سيتم التواصل معكم قريباً.
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
                  معلومات المؤسسة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="organizationName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      اسم المؤسسة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.organizationName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                      placeholder="أدخل اسم المؤسسة أو الجهة"
                    />
                    {formErrors.organizationName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.organizationName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="organizationLocation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      موقع المؤسسة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="organizationLocation"
                      name="organizationLocation"
                      value={formData.organizationLocation}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.organizationLocation
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                      placeholder="المدينة / البلد"
                    />
                    {formErrors.organizationLocation && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.organizationLocation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      مجال عمل المؤسسة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.industry
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                      placeholder="مجال عمل المؤسسة الرئيسي"
                    />
                    {formErrors.industry && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.industry}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="socialMedia"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      روابط منصات التواصل الاجتماعي
                    </label>
                    <input
                      type="text"
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleChange}
                      className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="روابط حسابات التواصل الاجتماعي الخاصة بالمؤسسة"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <input
                        id="isLicensed"
                        name="isLicensed"
                        type="checkbox"
                        checked={formData.isLicensed}
                        onChange={handleChange}
                        className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isLicensed"
                        className="mr-2 block text-sm text-gray-700"
                      >
                        هل المؤسسة مرخصة؟
                      </label>
                    </div>
                    
                    {formData.isLicensed && (
                      <div className="mt-2">
                        <label
                          htmlFor="licenseImage"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          صورة الترخيص <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          id="licenseImage"
                          name="licenseImage"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={`block w-full p-2 border ${
                            formErrors.licenseImage
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        />
                        {formErrors.licenseImage && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.licenseImage}</p>
                        )}
                        {formData.licenseImage && (
                          <div className="mt-2">
                            <img 
                              src={formData.licenseImage} 
                              alt="صورة الترخيص" 
                              className="h-32 object-contain border border-gray-300 rounded-lg p-1"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  بيانات الاتصال
                </h3>
                
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="text-base font-medium text-purple-700 mb-4">
                    معلومات مدير المؤسسة
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="director.name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        اسم المدير <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="director.name"
                        name="director.name"
                        value={formData.director.name}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${
                          formErrors["director.name"]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="اسم مدير المؤسسة"
                      />
                      {formErrors["director.name"] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors["director.name"]}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="director.phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="director.phone"
                        name="director.phone"
                        value={formData.director.phone}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${
                          formErrors["director.phone"]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="07xxxxxxxx"
                      />
                      {formErrors["director.phone"] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors["director.phone"]}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="director.email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="director.email"
                        name="director.email"
                        value={formData.director.email}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${
                          formErrors["director.email"]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="example@domain.com"
                      />
                      {formErrors["director.email"] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors["director.email"]}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="text-base font-medium text-purple-700 mb-4">
                    معلومات مسؤول التواصل
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="liaison.name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        اسم مسؤول التواصل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="liaison.name"
                        name="liaison.name"
                        value={formData.liaison.name}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${
                          formErrors["liaison.name"]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="اسم الشخص المسؤول عن التواصل"
                      />
                      {formErrors["liaison.name"] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors["liaison.name"]}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="liaison.phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="liaison.phone"
                        name="liaison.phone"
                        value={formData.liaison.phone}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${
                          formErrors["liaison.phone"]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="07xxxxxxxx"
                      />
                      {formErrors["liaison.phone"] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors["liaison.phone"]}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="liaison.email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="liaison.email"
                        name="liaison.email"
                        value={formData.liaison.email}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${
                          formErrors["liaison.email"]
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="example@domain.com"
                      />
                      {formErrors["liaison.email"] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors["liaison.email"]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  تفاصيل الشراكة
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="partnershipType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      نوع الشراكة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.partnershipType
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                    >
                      <option value="">اختر نوع الشراكة</option>
                      <option value="استراتيجية">شراكة استراتيجية</option>
                      <option value="تمويلية">شراكة تمويلية</option>
                      <option value="تطوعية">شراكة تطوعية</option>
                      <option value="تدريبية">شراكة تدريبية</option>
                      <option value="إعلامية">شراكة إعلامية</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                    {formErrors.partnershipType && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.partnershipType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      مدة الشراكة المتوقعة <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className={`block w-full p-3 border ${
                        formErrors.duration
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition`}
                    >
                      <option value="">اختر المدة المتوقعة</option>
                      <option value="3 أشهر">3 أشهر</option>
                      <option value="6 أشهر">6 أشهر</option>
                      <option value="سنة">سنة</option>
                      <option value="سنتين">سنتين</option>
                      <option value="أكثر من سنتين">أكثر من سنتين</option>
                    </select>
                    {formErrors.duration && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="expectations"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ماذا تتوقع من الشراكة؟
                    </label>
                    <textarea
                      id="expectations"
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleChange}
                      rows="3"
                      className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="اذكر ما تتوقعه من هذه الشراكة وكيف يمكننا أن نساعدك"
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="ourOffer"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ماذا تقدم في هذه الشراكة؟
                    </label>
                    <textarea
                      id="ourOffer"
                      name="ourOffer"
                      value={formData.ourOffer}
                      onChange={handleChange}
                      rows="3"
                      className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="اذكر ما يمكن لمؤسستك تقديمه في إطار هذه الشراكة"
                    ></textarea>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <input
                        id="confirmation"
                        name="confirmation"
                        type="checkbox"
                        checked={formData.confirmation}
                        onChange={handleChange}
                        className={`h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded ${
                          formErrors.confirmation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <label
                        htmlFor="confirmation"
                        className="mr-2 block text-sm text-gray-700"
                      >
                        أقر أن جميع المعلومات المقدمة صحيحة ودقيقة وأنني مخول بتمثيل المؤسسة في هذا الطلب
                      </label>
                    </div>
                    {formErrors.confirmation && (
                      <p className="mt-1 text-sm text-red-600 mb-4">
                        {formErrors.confirmation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-2 px-4 border border-purple-300 rounded-lg shadow-sm text-md font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
                >
                  السابق
                </button>
              )}
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-2 px-6 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-8 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ${
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
                    "تسجيل طلب الشراكة"
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

export default PartnerForm;