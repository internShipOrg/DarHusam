// // components/SuccessStories/AdminSuccessStories.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Switch } from "@headlessui/react";
// import { Trash2, Undo } from "lucide-react"; // Import icons
// const AdminSuccessStories = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [viewMode, setViewMode] = useState(true); // true for view, false for create/edit
//   const [editingStory, setEditingStory] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     imageUrl: "",
//     shortStory: "",
//     videoUrl: "",
//   });

//   useEffect(() => {
//     if (viewMode) {
//       fetchStories();
//     }
//   }, [viewMode]);

//   const fetchStories = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const response = await axios.get("http://localhost:5000/api/success", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStories(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch stories");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleRestore = async (id) => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.patch(
//         `http://localhost:5000/api/success/${id}/restore`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchStories();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to restore story");
//     }
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("adminToken");
//       if (editingStory) {
//         await axios.put(
//           `http://localhost:5000/api/success/${editingStory._id}`,
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         await axios.post("http://localhost:5000/api/success", formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }
//       setViewMode(true);
//       fetchStories();
//       setEditingStory(null);
//       setFormData({ name: "", imageUrl: "", shortStory: "", videoUrl: "" });
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save story");
//     }
//   };

//   const handleEdit = (story) => {
//     setEditingStory(story);
//     setFormData({
//       name: story.name,
//       imageUrl: story.imageUrl,
//       shortStory: story.shortStory,
//       videoUrl: story.videoUrl,
//     });
//     setViewMode(false);
//   };

//   const handleSoftDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.patch(
//         `http://localhost:5000/api/success/${id}/soft-delete`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchStories();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete story");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       await axios.delete(`http://localhost:5000/api/success/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchStories();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete story");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold text-[#780C28]">قصص النجاح</h2>

//         <Switch.Group>
//           <div className="flex items-center">
//             <Switch.Label className="mr-3 text-gray-700">
//               {viewMode
//                 ? "عرض القصص"
//                 : editingStory
//                 ? "تعديل القصة"
//                 : "إضافة قصة"}
//             </Switch.Label>
//             <Switch
//               checked={!viewMode}
//               onChange={() => {
//                 setViewMode(!viewMode);
//                 if (!viewMode) {
//                   setEditingStory(null);
//                   setFormData({
//                     name: "",
//                     imageUrl: "",
//                     shortStory: "",
//                     videoUrl: "",
//                   });
//                 }
//               }}
//               className={`${
//                 !viewMode ? "bg-[#780C28]" : "bg-gray-200"
//               } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//             >
//               <span
//                 className={`${
//                   !viewMode ? "translate-x-6" : "translate-x-1"
//                 } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//               />
//             </Switch>
//           </div>
//         </Switch.Group>
//       </div>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       {/* {viewMode ? (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="p-6 text-center">جاري التحميل...</div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {stories.map((story) => (
//                 <div key={story._id} className="p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-bold text-lg">{story.name}</h3>
//                       <p className="text-gray-600 line-clamp-2">
//                         {story.shortStory}
//                       </p>
//                       <div className="flex space-x-4 mt-2">
//                         {story.videoUrl && (
//                           <a
//                             href={story.videoUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                           >
//                             مشاهدة الفيديو
//                           </a>
//                         )}
//                         {story.imageUrl && (
//                           <a
//                             href={story.imageUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                           >
//                             عرض الصورة
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(story)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         تعديل
//                       </button>
//                       <button
//                         onClick={() => handleSoftDelete(story._id)}
//                         className="text-yellow-600 hover:text-yellow-800"
//                       >
//                         حذف
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : ( */}
//       {viewMode ? (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="p-6 text-center">جاري التحميل...</div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {stories.map((story) => (
//                 <div
//                   key={story._id}
//                   className={`p-4 ${
//                     story.isDeleted ? "bg-red-50 border-l-4 border-red-500" : ""
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3
//                         className={`font-bold text-lg ${
//                           story.isDeleted ? "text-red-700" : ""
//                         }`}
//                       >
//                         {story.name}
//                         {story.isDeleted && (
//                           <span className="ml-2 text-sm text-red-500">
//                             (محذوفة)
//                           </span>
//                         )}
//                       </h3>
//                       <p
//                         className={`text-gray-600 line-clamp-2 ${
//                           story.isDeleted ? "text-red-300" : ""
//                         }`}
//                       >
//                         {story.shortStory}
//                       </p>
//                       <div className="flex space-x-4 mt-2">
//                         {story.videoUrl && (
//                           <a
//                             href={story.videoUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`hover:underline ${
//                               story.isDeleted ? "text-red-400" : "text-blue-600"
//                             }`}
//                           >
//                             مشاهدة الفيديو
//                           </a>
//                         )}
//                         {story.imageUrl && (
//                           <a
//                             href={story.imageUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`hover:underline ${
//                               story.isDeleted ? "text-red-400" : "text-blue-600"
//                             }`}
//                           >
//                             عرض الصورة
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       {!story.isDeleted ? (
//                         <>
//                           <button
//                             onClick={() => handleEdit(story)}
//                             className="text-blue-600 hover:text-blue-800"
//                           >
//                             تعديل
//                           </button>
//                           <button
//                             onClick={() => handleSoftDelete(story._id)}
//                             className="text-yellow-600 hover:text-yellow-800 flex items-center"
//                           >
//                             <Trash2 className="mr-1" size={16} />
//                             أرشيف
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleRestore(story._id)}
//                             className="text-green-600 hover:text-green-800 flex items-center"
//                           >
//                             <Undo className="mr-1" size={16} />
//                             استعادة
//                           </button>
//                           <button
//                             onClick={() => handleDelete(story._id)}
//                             className="text-red-600 hover:text-red-800 flex items-center"
//                           >
//                             <Trash2 className="mr-1" size={16} />
//                             حذف نهائي
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">
//             {editingStory ? "تعديل قصة النجاح" : "إضافة قصة نجاح جديدة"}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 mb-1">الاسم</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">رابط الصورة</label>
//               <input
//                 type="text"
//                 name="imageUrl"
//                 value={formData.imageUrl}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">القصة المختصرة</label>
//               <textarea
//                 name="shortStory"
//                 value={formData.shortStory}
//                 onChange={handleInputChange}
//                 required
//                 rows="3"
//                 className="w-full px-3 py-2 border rounded-lg"
//               ></textarea>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">
//                 رابط الفيديو (اختياري)
//               </label>
//               <input
//                 type="text"
//                 name="videoUrl"
//                 value={formData.videoUrl}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setViewMode(true);
//                   setEditingStory(null);
//                   setFormData({
//                     name: "",
//                     imageUrl: "",
//                     shortStory: "",
//                     videoUrl: "",
//                   });
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//               >
//                 إلغاء
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-[#780C28] text-white rounded-lg hover:bg-[#5a0920]"
//               >
//                 {editingStory ? "حفظ التعديلات" : "إضافة القصة"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSuccessStories;
// components/SuccessStories/AdminSuccessStories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch } from "@headlessui/react";
import {
  Trash2,
  Undo,
  Plus,
  Edit3,
  Eye,
  Archive,
  RotateCcw,
} from "lucide-react";

const AdminSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState(true);
  const [editingStory, setEditingStory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    shortStory: "",
    videoUrl: "",
  });

  useEffect(() => {
    if (viewMode) {
      fetchStories();
    }
  }, [viewMode]);

  const fetchStories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/success", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `http://localhost:5000/api/success/${id}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to restore story");
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
      if (editingStory) {
        await axios.put(
          `http://localhost:5000/api/success/${editingStory._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/success", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setViewMode(true);
      fetchStories();
      setEditingStory(null);
      setFormData({ name: "", imageUrl: "", shortStory: "", videoUrl: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save story");
    }
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setFormData({
      name: story.name,
      imageUrl: story.imageUrl,
      shortStory: story.shortStory,
      videoUrl: story.videoUrl,
    });
    setViewMode(false);
  };

  const handleSoftDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `http://localhost:5000/api/success/${id}/soft-delete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete story");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/success/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete story");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#780C28] rounded-xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#780C28]">
                  قصص النجاح
                </h2>
                <p className="text-gray-500 mt-1">إدارة قصص النجاح والإلهام</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Switch.Group>
                <div className="flex items-center space-x-4">
                  <Switch.Label className="text-lg font-medium text-gray-700 cursor-pointer hover:text-[#780C28] transition-colors duration-200">
                    {viewMode
                      ? "عرض القصص"
                      : editingStory
                      ? "تعديل القصة"
                      : "إضافة قصة"}
                  </Switch.Label>
                  <Switch
                    checked={!viewMode}
                    onChange={() => {
                      setViewMode(!viewMode);
                      if (!viewMode) {
                        setEditingStory(null);
                        setFormData({
                          name: "",
                          imageUrl: "",
                          shortStory: "",
                          videoUrl: "",
                        });
                      }
                    }}
                    className={`${
                      !viewMode ? "bg-[#780C28]" : "bg-gray-300"
                    } relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105`}
                  >
                    <span
                      className={`${
                        !viewMode ? "translate-x-9" : "translate-x-1"
                      } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow-md`}
                    />
                  </Switch>
                </div>
              </Switch.Group>

              {!viewMode && (
                <button
                  onClick={() => setViewMode(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6e8e59] to-[#780C28] text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>إضافة جديد</span>
                </button>
              )}
            </div>
          </div>
        </div> */}
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#780C28] rounded-xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#780C28]">
                  قصص النجاح
                </h2>
                <p className="text-gray-500 mt-1">إدارة قصص النجاح والإلهام</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* New Button Toggle */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setViewMode(true);
                      setEditingStory(null);
                      setFormData({
                        name: "",
                        imageUrl: "",
                        shortStory: "",
                        videoUrl: "",
                      });
                    }}
                    className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                      viewMode
                        ? "bg-white text-[#780C28] shadow-md font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>عرض القصص</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setViewMode(false);
                      setEditingStory(null);
                      setFormData({
                        name: "",
                        imageUrl: "",
                        shortStory: "",
                        videoUrl: "",
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
                      <span>إضافة قصة</span>
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
                  {stories.map((story, index) => (
                    <div
                      key={story._id}
                      className={`p-6 transition-all duration-300 hover:bg-gray-50 ${
                        story.isDeleted
                          ? "bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400"
                          : "hover:shadow-md"
                      } transform hover:scale-[1.01]`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            {story.imageUrl && (
                              <img
                                src={story.imageUrl}
                                alt={story.name}
                                className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            )}
                            <div>
                              <h3
                                className={`text-xl font-bold transition-colors duration-200 ${
                                  story.isDeleted
                                    ? "text-red-700"
                                    : "text-gray-800 hover:text-[#780C28]"
                                }`}
                              >
                                {story.name}
                                {story.isDeleted && (
                                  <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                                    محذوفة
                                  </span>
                                )}
                              </h3>
                            </div>
                          </div>

                          <p
                            className={`text-gray-600 leading-relaxed mb-4 ${
                              story.isDeleted ? "text-red-400" : ""
                            }`}
                          >
                            {story.shortStory}
                          </p>

                          <div className="flex space-x-4">
                            {story.videoUrl && (
                              <a
                                href={story.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                  story.isDeleted
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                }`}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                مشاهدة الفيديو
                              </a>
                            )}
                            {story.imageUrl && (
                              <a
                                href={story.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                  story.isDeleted
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                عرض الصورة
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          {!story.isDeleted ? (
                            <>
                              <button
                                onClick={() => handleEdit(story)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#6e8e59] to-[#780C28] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <Edit3 className="w-4 h-4 mr-2" />
                                تعديل
                              </button>
                              <button
                                onClick={() => handleSoftDelete(story._id)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <Archive className="w-4 h-4 mr-2" />
                                أرشيف
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleRestore(story._id)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                استعادة
                              </button>
                              <button
                                onClick={() => handleDelete(story._id)}
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
                  {editingStory ? "تعديل قصة النجاح" : "إضافة قصة نجاح جديدة"}
                </h2>
                <p className="text-gray-600">
                  املأ البيانات المطلوبة لإضافة قصة نجاح ملهمة
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      الاسم
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#780C28] focus:ring-2 focus:ring-[#780C28]/20 transition-all duration-200 outline-none"
                      placeholder="اسم صاحب قصة النجاح"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      رابط الصورة
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6e8e59] focus:ring-2 focus:ring-[#6e8e59]/20 transition-all duration-200 outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    القصة المختصرة
                  </label>
                  <textarea
                    name="shortStory"
                    value={formData.shortStory}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#780C28] focus:ring-2 focus:ring-[#780C28]/20 transition-all duration-200 outline-none resize-none"
                    placeholder="اكتب قصة النجاح الملهمة هنا..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    رابط الفيديو (اختياري)
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#6e8e59] focus:ring-2 focus:ring-[#6e8e59]/20 transition-all duration-200 outline-none"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode(true);
                      setEditingStory(null);
                      setFormData({
                        name: "",
                        imageUrl: "",
                        shortStory: "",
                        videoUrl: "",
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
                    {editingStory ? "حفظ التعديلات" : "إضافة القصة"}
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

export default AdminSuccessStories;
