import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { name: 'الرئيسية', path: '/' },
    { 
      name: 'من نحن', 
      path: '/AboutUs',
      // hasDropdown: true
    },
    { 
      name: 'برامج التدريب', 
      path: '/programs',
      hasDropdown: true
    },
    { name: 'الأخبار والفعاليات', path: '/news' },
    { name: 'قصص النجاح', path: '/success-stories' },
    { name: 'مكتبة الموارد', path: '/resources' },
    { name: 'انضم إلينا', path: '/join' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <nav className="bg-white shadow-sm py-2" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Register button (on the right in LTR) */}
          <a
            href="/join-us"
            className="bg-[#780C28] text-white px-4 py-2 rounded hover:bg-[#6E8E59] transition-colors duration-300 text-sm font-medium"
          >
            سجل الآن
          </a>

          {/* Center menu items */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button 
                    className="flex items-center text-gray-700 hover:text-[#780C28] transition-colors duration-300 text-sm"
                    onClick={() => toggleDropdown(index)}
                  >
                    {item.name}
                    <ChevronDown size={14} className="mr-1 mt-1" />
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="text-gray-700 hover:text-[#780C28] transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Logo (on the left in LTR) */}
          <div className="flex items-center">
            <a href="/" className="block">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#780C28]">
                <div className="text-xl font-bold">
                  <span className="text-[#780C28]">م</span>
                  <span className="text-[#6E8E59]">ن</span>
                </div>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#780C28] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden pt-2 pb-3 border-t border-gray-200 mt-2">
          <div className="space-y-1 px-4">
            {menuItems.map((item, index) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className="w-full text-right px-3 py-2 text-gray-700 hover:text-[#780C28] hover:bg-gray-50 rounded-md flex justify-between items-center"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={14} className={activeDropdown === index ? 'transform rotate-180' : ''} />
                    </button>
                    {/* {activeDropdown === index && (
                      <div className="pr-4 pl-2 py-1">
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#780C28] hover:bg-gray-50 rounded-md">
                          قائمة فرعية 1
                        </a>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#780C28] hover:bg-gray-50 rounded-md">
                          قائمة فرعية 2
                        </a>
                      </div>
                    )} */}
                  </>
                ) : (
                  <a
                    href={item.path}
                    className="block px-3 py-2 text-gray-700 hover:text-[#780C28] hover:bg-gray-50 rounded-md"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-2">
              <a
                href="/join-us"
                className="block w-full text-center bg-[#780C28] text-white px-4 py-2 rounded hover:bg-[#6E8E59] transition-colors duration-300"
              >
                سجل الآن
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;