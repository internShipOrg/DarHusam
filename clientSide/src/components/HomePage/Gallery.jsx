import { useState } from "react";

function Gallery() {

// Code for view Gallery section //
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { id: 1, url: '/public/g2.jpg' },
    { id: 2, url: '/public/g1.jpg' },
    { id: 3, url: '/public/g3.jpg' },
    { id: 4, url: '/public/g4.jpg' },
    { id: 5, url: '/public/g5.jpg' },
    { id: 6, url: '/public/g6.jpg' },
    { id: 7, url: '/public/g7.jpg' },
    { id: 8, url: '/public/g8.jpg' },
    { id: 9, url: '/public/g9.jpg' },
    { id: 10, url: '/public/g10.jpg' },
    { id: 11, url: '/public/g11.jpg' },
    { id: 12, url: '/public/g12.jpg' },
    { id: 13, url: '/public/g13.jpg' },
    { id: 14, url: '/public/g14.jpg' },
    { id: 15, url: '/public/g15.jpg' },
    { id: 16, url: '/public/g16.jpg' },

  ];


 const showPrevSlide = () =>
  setCurrentIndex(i =>
    i === 0
      ? images.length - 4 
      : i - 1
  );

const showNextSlide = () =>
  setCurrentIndex(i =>
    i >= images.length - 4  
      ? 0
      : i + 1
  );

  const visibleImages = images.slice(currentIndex, currentIndex + 4);

  return (
    <>
    {/* Gallery section */}
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mt-12 ">
          <h1 className="text-4xl font-bold text-center text-[#780C28] p-4 rounded-lg ">
            من إنجازاتنا... مشاهد تُلهم وتُعبّر
          </h1>
          
          <p className="text-lg text-gray-600 mt-2">
            في كل صورة حكاية، وفي كل إنجاز بصمة من دار الحسام
          </p>
        </div>
        <div className="h-1 w-24 bg-[#6E8E59] mx-auto mt-4 rounded-full"></div>


        {/* Gallery Container */}
        <div className="relative">
          {/* Navigation Buttons */}
         <>
            <button
          onClick={showPrevSlide}
          className="absolute left-[-48px] top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-[#780C28] p-3 rounded-full shadow transition-all duration-300 hover:scale-105"
          aria-label="السابق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={showNextSlide}
          className="absolute right-[-48px] top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-[#780C28] p-3 rounded-full shadow transition-all duration-300 hover:scale-105"
          aria-label="التالي"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
          </>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
            {visibleImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(images.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 4)}
                className={`w-2 h-2 rounded-full transition-colors ${Math.floor(currentIndex / 4) === index ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default Gallery
