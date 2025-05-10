import { useState, useEffect } from "react";
import axios from "axios";

const categories = ["الكل", "مقال", "فيديو", "عرض", "PDF"];

export default function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResources();
  }, [type, search]);

  const fetchResources = async () => {
    const params = {};
    if (type && type !== "الكل") params.type = type;
    if (search) params.search = search;

    const res = await axios.get("http://localhost:5000/api/resources", { params });
    setResources(res.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">مكتبة الموارد</h1>

      
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setType(cat)}
            className={`px-3 py-1 rounded-full text-sm ${
              type === cat ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
        <input
          type="text"
          placeholder="🔍 بحث..."
          className="ml-auto p-2 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-md bg-white">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.type}</span>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="block mt-2 text-blue-600 underline"
            >
              عرض / تحميل
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
