import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function EnhancedNews() {
    const [activeSection, setActiveSection] = useState("articles");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(null);
    const navigate = useNavigate();


    const articles = [
        {
            id: 1,
            title: "الرفاعي يرعى الأحتفال بالذكرى الأولى لأفتتاح مقر دار الحسام للعمل الشبابي",
            summary: "حضر الاحتفال نائب محافظة الزرقاء عاصم النهار والنائب الأول لرئيس مجلس النواب الدكتور احمد الخلالية",
            imageUrl: "/public/news1.png",
        },
        {
            id: 2,
            title: "دار الحسام الشبابي تقدم 28 منحة شبابية دورة تدريبية",
            summary: "بمناسبة عيد ميلاد ولي العهد قُدم 28 منحة شبابية دورة تدريبية متخصصة في مجال الريادة في الأعمال",
            imageUrl: "/public/news2.png",
        },
        {
            id: 3,
            title: "دار الحسام للعمل الشبابي عدد كبير من التبرعات للأهل في غزة",
            summary: "قامت دار الحسام بتكليف من محافظ الزرقاء بحمله جمع تبرعات أهلنا في غزة",
            imageUrl: "/public/news3.png",
        },
        {
            id: 4,
            title: "دار حسام الشباب للعمل تطلق مبادرة لجعل شتاءهم أدفأ في الزرقاء",
            summary: "دار حسام الشباب للعمل تطلق مبادرة لجعل شتاءهم أدفأ في الزرقاء",
            imageUrl: "/public/news4.png",
        },
        {
            id: 5,
            title: "العماوي يحاور المجتمع الزرقاوي في دار الحسام للعمل الشبابي",
            summary: "في جلسة نظمتها دار الحسام للحديث عن دور الحزب الأردني في الحرب على غزة في مقرها بمحافظة الزرقاء.",
            imageUrl: "/public/news5.png",
            date: "22 أبريل 2025"
        }
    ];


    const goToPage = () => {
        navigate('/news');
    };

    const showPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
    };

    const showNextSlide = () => {
        setCurrentSlide((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
    };

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isHovering) {
                showNextSlide();
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [isHovering]);

    // Calculate visible slides based on current slide
    const getVisibleSlides = () => {
        const visibleSlides = [];

        // For desktop: show 3 slides
        for (let i = 0; i < 3; i++) {
            const index = (currentSlide + i) % articles.length;
            visibleSlides.push(articles[index]);
        }

        return visibleSlides;
    };

    return (
        <div className="font-sans rtl min-h-screen ">
            {/* Hero Header */}
            <header className="bg-gradient-to-r from-[#780C28] to-[#9A0C2E] text-white py-12 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="absolute inset-0 bg-pattern opacity-5"></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold text-center mb-2">أحدث الأخبار والفعاليات</h1>
                    <div className="w-24 h-1 bg-[#6E8E59] mx-auto mb-4"></div>
                    <p className="text-center text-white/80 max-w-2xl mx-auto">اطلع على آخر أخبار ونشاطات دار الحسام للعمل الشبابي وكن على تواصل مع أحدث الفعاليات والمبادرات</p>
                </div>
            </header>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-12 relative">




                {/* Carousel Section */}
                {activeSection === "articles" && (
                    <div
                        className="relative py-4"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className="flex overflow-hidden gap-6">
                            {getVisibleSlides().map((article, index) => (
                                <div
                                    key={article.id}
                                    className="bg-white w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 flex flex-col transform hover:-translate-y-2"
                                >
                                    <div className="h-56 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                                        />

                                    </div>

                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold mb-3 text-[#780C28] line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
                                            {article.summary}
                                        </p>
                                        <button
                                            onClick={goToPage}
                                            className="bg-[#6E8E59] hover:bg-[#5d7a4a] text-white py-2 px-4 rounded-lg text-sm transition-all duration-300 flex items-center gap-1 ml-auto"
                                        >
                                            <span>اقرأ المزيد</span>
                                            <span>&#8594;</span>
                                        </button>


                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation arrows */}
                       <button
  onClick={showPrevSlide}
  className="absolute left-[-48px] top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-[#780C28] p-3 rounded-full shadow transition-all duration-300 hover:scale-105"
  aria-label="السابق"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
</button>

<button
  onClick={showNextSlide}
  className="absolute right-[-48px] top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-[#780C28] p-3 rounded-full shadow transition-all duration-300 hover:scale-105"
  aria-label="التالي"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
</button>



                        {/* Dots indicator */}
                        <div className="flex justify-center mt-8 gap-2">
                            {articles.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-[#780C28] w-6" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}




            </div>
        </div>
    );
}