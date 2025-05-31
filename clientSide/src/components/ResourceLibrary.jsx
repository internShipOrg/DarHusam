import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, BookOpen, Video, FileText, File, Download, ExternalLink, Filter } from 'lucide-react';

const ResourceLibrary = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'الكل', icon: <BookOpen className="ml-2" size={18} /> },
    { id: 'articles', label: 'مقالات', icon: <FileText className="ml-2" size={18} /> },
    { id: 'videos', label: 'فيديوهات', icon: <Video className="ml-2" size={18} /> },
    { id: 'presentations', label: 'عروض تقديمية', icon: <FileText className="ml-2" size={18} /> },
    { id: 'pdf', label: 'ملفات PDF', icon: <File className="ml-2" size={18} /> },
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/resources');
        setResources(response.data.data || []);
        setFilteredResources(response.data.data || []);
        setIsLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل الموارد، يرجى المحاولة مرة أخرى');
        setIsLoading(false);
        console.error('Error fetching resources:', err);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    // Filter resources based on category and search query
    const filtered = resources.filter((resource) => {
      const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    setFilteredResources(filtered);
  }, [searchQuery, activeCategory, resources]);

  const getResourceIcon = (category) => {
    switch (category) {
      case 'articles':
        return <FileText className="text-[#780C28]" size={24} />;
      case 'videos':
        return <Video className="text-[#780C28]" size={24} />;
      case 'presentations':
        return <FileText className="text-[#780C28]" size={24} />;
      case 'pdf':
        return <File className="text-[#780C28]" size={24} />;
      default:
        return <BookOpen className="text-[#780C28]" size={24} />;
    }
  };

  const handleDownload = async (resourceId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/resources/${resourceId}/download`, {
        responseType: 'blob'
      });
      
      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        filename = filenameMatch ? filenameMatch[1] : `resource-${resourceId}`;
      } else {
        filename = `resource-${resourceId}`;
      }
      
      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading resource:', err);
      alert('حدث خطأ أثناء تحميل الملف، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className="bg-[#EAFAEA] min-h-screen py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#780C28] mb-4">مكتبة الموارد</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            استكشف مجموعة متنوعة من الموارد التعليمية والتدريبية التي تقدمها دار الحسام لدعم تطويرك المهني والشخصي
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن موارد..."
                className="block w-full border border-gray-300 rounded-lg py-3 pr-10 pl-4 text-gray-900 focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter - Mobile Dropdown */}
            <div className="md:hidden w-full">
              <div className="relative">
                <select
                  className="block w-full bg-white border border-gray-300 rounded-lg py-3 pr-4 pl-10 text-gray-900 appearance-none focus:ring-2 focus:ring-[#780C28] focus:border-[#780C28]"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Filter size={20} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Category Filter - Desktop Tabs */}
            <div className="hidden md:flex items-center gap-1 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-[#780C28] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="loader w-12 h-12 border-4 border-[#CAE0BC] border-t-[#780C28] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 text-lg">{error}</p>
            <button 
              className="mt-4 bg-[#780C28] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              onClick={() => window.location.reload()}
            >
              حاول مرة أخرى
            </button>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">لم يتم العثور على موارد مطابقة للبحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div 
                key={resource._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {resource.thumbnailUrl && (
                  <div className="relative h-48 bg-gray-200">
                    <img 
                      src={resource.thumbnailUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#780C28] text-white text-xs font-medium px-2 py-1 rounded">
                      {categories.find(c => c.id === resource.category)?.label || 'مورد'}
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-1">
                      {resource.title}
                    </h3>
                    <div className="flex-shrink-0 mr-2">
                      {getResourceIcon(resource.category)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {new Date(resource.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                    
                    {resource.isDownloadable ? (
                      <button
                        onClick={() => handleDownload(resource._id)}
                        className="flex items-center text-sm font-medium px-3 py-1.5 rounded bg-[#CAE0BC] text-[#780C28] hover:bg-opacity-80 transition-colors"
                      >
                        <Download size={16} className="ml-1" />
                        تحميل
                      </button>
                    ) : (
                      <a
                        href={resource.fileUrl || resource.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium px-3 py-1.5 rounded bg-[#CAE0BC] text-[#780C28] hover:bg-opacity-80 transition-colors"
                      >
                        <ExternalLink size={16} className="ml-1" />
                        عرض
                      </a>
                    )}
                  </div>

                  {/* Tags */}
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination - Simple version */}
        {!isLoading && !error && filteredResources.length > 0 && (
          <div className="flex justify-center mt-10">
            <nav className="inline-flex rounded-md shadow">
              <button
                className="py-2 px-4 bg-white border border-gray-300 rounded-r-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                السابق
              </button>
              <button
                className="py-2 px-4 bg-white border border-gray-300 border-r-0 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </button>
              <button
                className="py-2 px-4 bg-[#780C28] text-white border border-[#780C28] text-sm font-medium"
              >
                2
              </button>
              <button
                className="py-2 px-4 bg-white border border-gray-300 border-l-0 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                3
              </button>
              <button
                className="py-2 px-4 bg-white border border-gray-300 rounded-l-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                التالى
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Share Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#780C28] mb-3">شارك مكتبة الموارد</h3>
          <p className="text-gray-600 mb-4">ساعد الآخرين على الاستفادة من موارد دار الحسام التعليمية</p>
          <div className="flex gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;