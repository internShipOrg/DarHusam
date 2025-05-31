import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    {
      name: "برامج التدريب",
      path: "/training-programs",
    },
    { name: "الأخبار والفعاليات", path: "/news" },
    { name: "قصص النجاح", path: "/success-stories" },
    { name: "مكتبة الموارد", path: "/resources" },
    { name: "حجز القاعات", path: "/bookingPage" },
    {
      name: "حولنا",
      path: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "من نحن", path: "/about" },
        { name: "اتصل بنا", path: "/contact" },
      ],
    },
  ];

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <nav
      className="bg-white shadow-sm shadow-[#780C28] py-3 sticky top-0 z-50"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="block">
              <img
                src="/public/daaralhosam.jpg"
                alt="Logo"
                className="h-20 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      className="flex items-center text-gray-700 hover:text-[#780C28] transition-colors duration-300 text-base font-medium py-2 px-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(index);
                      }}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`mr-1 transition-transform duration-200 ${
                          activeDropdown === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#780C28] transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className="text-gray-700 hover:text-[#780C28] transition-colors duration-300 text-base font-medium py-2 px-1"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Register Button */}
          <div className="hidden lg:block flex-shrink-0">
            <a
              href="/join-us"
              className="bg-[#780C28] text-white px-6 py-2 rounded-lg hover:bg-[#6E8E59] transition-colors duration-300 text-base font-medium shadow-sm"
            >
              سجل الآن
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#780C28] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item, index) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className="w-full text-right px-4 py-3 text-gray-700 hover:text-[#780C28] hover:bg-gray-50 rounded-lg flex justify-between items-center font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(index);
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          activeDropdown === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <div className="pr-6 pb-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-gray-600 hover:text-[#780C28] hover:bg-gray-50 rounded-md transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.path}
                    className="block px-4 py-3 text-gray-700 hover:text-[#780C28] hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile Register Button */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <a
                href="/join-us"
                className="block w-full text-center bg-[#780C28] text-white px-6 py-3 rounded-lg hover:bg-[#6E8E59] transition-colors duration-300 font-medium"
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
