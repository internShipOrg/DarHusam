// import React, { useState, useEffect } from "react";

// const images = {
//   siyasa: "https://images.pexels.com/photos/4646814/pexels-photo-4646814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   riyadah: "https://images.pexels.com/photos/3197390/pexels-photo-3197390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   digital: "https://images.pexels.com/photos/9786318/pexels-photo-9786318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   mubadarat: "https://images.pexels.com/photos/8763179/pexels-photo-8763179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   police: "https://images.pexels.com/photos/7715253/pexels-photo-7715253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   activities: "https://images.pexels.com/photos/8954825/pexels-photo-8954825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// };

// const programs = [
//   {
//     id: "siyasa",
//     title: "برنامج الاصلاح السياسي",
//     desc: "بحث حول قانوني الاحزاب والانتخاب، محاضرات وندوات وتدريبات للوعي السياسي للشباب.",
//   },
//   {
//     id: "riyadah",
//     title: "برنامج ريادة الاعمال",
//     desc: "تدريب على ادارة المشاريع، صياغة الفكرة، دراسة الجدوى، التمويل والإجراءات القانونية.",
//   },
//   {
//     id: "digital",
//     title: "برنامج التوعية الرقمية",
//     desc: "مجموعة فيديوهات تشرح المواد الدستورية لنشر الوعي القانوني.",
//   },
//   {
//     id: "mubadarat",
//     title: "برنامج دعم المبادرات الشبابية",
//     desc: "توفير مساحات آمنة لعقد اجتماعات ودورات ضمن التشاركية المجتمعية.",
//   },
//   {
//     id: "police",
//     title: "البرامج التوعوية مع الشرطة المجتمعية",
//     desc: "محاضرات وانشطة من أجل السلم المجتمعي.",
//   },
//   {
//     id: "activities",
//     title: "برامج الانشطة المجتمعية المختلفة",
//     desc: "مشاركة في الأعياد، المناسبات الوطنية، المبادرات الخيرية، والفعاليات الرمضانية.",
//   },
// ];

// export default function ProgramsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const slidesPerView = isMobile ? 1 : 3;

//   // Check for mobile viewport on mount and when window resizes
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkIfMobile);
//     };
//   }, []);

//   // Auto slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? programs.length - slidesPerView : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex >= programs.length - slidesPerView ? 0 : prevIndex + 1
//     );
//   };

//   const goToProgram = (id) => {
//     console.log(`Navigating to program: ${id}`);
//   };

//   const goToAllPrograms = () => {
//     console.log("Navigating to all programs");
//   };

//   return (
//     <div className="relative py-16 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-6xl mx-auto px-4">
       
        
//         {/* Section header */}
//         <div className="text-center mb-12 relative">
//           <h2 className="text-4xl font-extrabold" style={{ color: "#780C28" }}>
//             برامجنا
//           </h2>
//           <div className="h-1 w-24 bg-[#6E8E59] mx-auto mt-4 rounded-full"></div>
//           <p className="mt-4 text-gray-600 max-w-xl mx-auto">
//             مجموعة متنوعة من البرامج والمبادرات لخدمة المجتمع وتنمية قدرات الشباب
//           </p>
//         </div>

//         {/* Custom Programs slider */}
//         <div className="relative">
//           {/* Navigation buttons */}
//           <button 
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
//             style={{ transform: "translate(-50%, -50%)" }}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
          
//           <button 
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
//             style={{ transform: "translate(50%, -50%)" }}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
          
//           {/* Slider container */}
//           <div className="overflow-hidden px-4">
//             <div 
//               className="flex transition-transform duration-500 ease-in-out" 
//               style={{ 
//                 transform: `translateX(${currentIndex * (100 / slidesPerView)}%)`,
//                 direction: 'rtl' // For RTL support
//               }}
//             >
//               {programs.map(({ id, title, desc }) => (
//                 <div 
//                   key={id} 
//                   className="px-3 py-2 flex-shrink-0" 
//                   style={{ width: `${100 / slidesPerView}%` }}
//                 >
//                   <div 
//                     onClick={() => goToProgram(id)}
//                     className="group relative h-64 rounded-xl cursor-pointer overflow-hidden shadow-lg transition-all duration-300"
//                   >
//                     {/* Image with overlay */}
//                     <div 
//                       className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
//                       style={{
//                         backgroundImage: `url(${images[id] || "https://source.unsplash.com/400x300/?charity"})`,
//                       }}
//                     ></div>
                    
//                     {/* Gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-900/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
//                     {/* Content */}
//                     <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
//                       <div className="border-b border-white/30 pb-2 mb-3">
//                         <h3 className="text-xl font-bold mb-1  transition-colors duration-300">{title}</h3>
//                       </div>
//                       <p className="text-sm leading-relaxed opacity-90">{desc}</p>
                      
//                       {/* Read more indicator */}
//                       <div className="mt-4 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <span className="text-sm font-medium mr-2">اقرأ المزيد</span>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     {/* Accent color bar */}
//                     <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#6E8E59] group-hover:w-full transition-all duration-500"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Pagination dots */}
//           <div className="flex justify-center mt-6">
//             {Array.from({ length: Math.ceil(programs.length / slidesPerView) }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index * slidesPerView)}
//                 className={`h-2 w-2 mx-1 rounded-full transition-colors duration-300 ${
//                   Math.floor(currentIndex / slidesPerView) === index ? 'bg-red-800' : 'bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* CTA button */}
//         <div className="text-center mt-12">
//           <button
//             onClick={goToAllPrograms}
//             className="bg-[#6E8E59] hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition duration-300 relative overflow-hidden group"
//           >
//             <span className="relative z-10">عرض كل البرامج</span>
//             <span className="absolute inset-0 bg-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";

const images = {
  siyasa: "https://images.pexels.com/photos/4646814/pexels-photo-4646814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  riyadah: "https://images.pexels.com/photos/3197390/pexels-photo-3197390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  digital: "https://images.pexels.com/photos/9786318/pexels-photo-9786318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  mubadarat: "https://images.pexels.com/photos/8763179/pexels-photo-8763179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  police: "https://images.pexels.com/photos/7715253/pexels-photo-7715253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  activities: "https://images.pexels.com/photos/8954825/pexels-photo-8954825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

export default function ProgramsSlider() {
  const [programs, setPrograms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slidesPerView = isMobile ? 1 : 3;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/home/programs"); 
        setPrograms(data);
        console.log("dataaaaaaaaa"+data);
        
      } catch (err) {
        console.error("Error fetching programs:", err);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!programs.length) return;
    const interval = setInterval(() => {
      setCurrentIndex(i =>
        i >= programs.length - slidesPerView ? 0 : i + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [programs, slidesPerView]);

  const handlePrev = () => {
    setCurrentIndex(i =>
      i === 0 ? programs.length - slidesPerView : i - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex(i =>
      i >= programs.length - slidesPerView ? 0 : i + 1
    );
  };

  if (!programs.length) {
    return (
      <div className="flex justify-center items-center h-64">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <div className="relative py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-extrabold" style={{ color: "#780C28" }}>
            برامجنا
          </h2>
          <div className="h-1 w-24 bg-[#6E8E59] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            مجموعة متنوعة من البرامج والمبادرات لخدمة المجتمع وتنمية قدرات الشباب
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden px-4">
            <div className="flex transition-transform duration-500 ease-in-out" style={{
              transform: `translateX(${currentIndex * (100 / slidesPerView)}%)`,
              direction: 'rtl'
            }}>
              {programs.map(({ id, title, desc }) => (
                <div key={id} className="px-3 py-2 flex-shrink-0" style={{ width: `${100 / slidesPerView}%` }}>
                  <div onClick={() => console.log(`Navigate to ${id}`)}
                       className="group relative h-64 rounded-xl cursor-pointer overflow-hidden shadow-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                         style={{ backgroundImage: `url(${images[id]})` }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-900/70 to-transparent opacity-80"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{title}</h3>
                      <p className="text-sm leading-relaxed opacity-90">{desc}</p>
                      <div className="mt-4 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium mr-2">اقرأ المزيد</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#6E8E59] group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(programs.length / slidesPerView) }).map((_, idx) => (
              <button key={idx}
                      onClick={() => setCurrentIndex(idx * slidesPerView)}
                      className={`h-2 w-2 mx-1 rounded-full ${Math.floor(currentIndex / slidesPerView) === idx ? 'bg-red-800' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button onClick={() => console.log("Navigate to all")}
                  className="bg-[#6E8E59] hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition duration-300 group">
            <span className="relative z-10">عرض كل البرامج</span>
            <span className="absolute inset-0 bg-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
      </div>
    </div>
  );
}










