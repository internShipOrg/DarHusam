import { useEffect, useState } from "react";
import axios from "axios";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color scheme - refined palette
  const colors = {
    primary: "#4D7C4D", // Deeper green (more professional)
    secondary: "#F5FAF5", // Lighter background for better contrast
    accent: "#B3D1A3", // Softer green accent
    contrast: "#65071E", // Deeper red (more sophisticated)
    lightAccent: "#E8F3E0", // Very light accent for subtle highlights
  };

  // Real stories with placeholder images
  const dummyStories = [
    {
      _id: "1",
      name: "محمد علي",
      title: "صاحب مشروع ناجح",
      imageUrl: "/api/placeholder/400/300",
      videoUrl: "/api/placeholder/video",
      shortStory:
        "بدعم من دار الحسام، استطاع محمد إنشاء مشروعه التجاري الخاص وتحقيق الاستقلال المالي.",
      fullStory:
        "بعد مشاركته في برنامج التدريب المهني الذي تقدمه دار الحسام، اكتسب محمد المهارات والمعرفة اللازمة لبدء مشروعه الخاص. تخطى العديد من التحديات بفضل الإرشاد المستمر والدعم الذي تلقاه خلال مرحلة التأسيس. الآن، يدير محمد متجراً ناجحاً للمنتجات العضوية المحلية ويوظف خمسة أشخاص من المجتمع، ويشارك خبراته مع الآخرين من خلال ورش العمل الدورية التي يقيمها بالتعاون مع دار الحسام.",
      testimonial:
        "لولا برامج دار الحسام لما استطعت تحويل حلمي إلى حقيقة. تعلمت كيف أؤسس مشروعي وأطوره بشكل مستدام.",
    },
    {
      _id: "2",
      name: "سارة أحمد",
      title: "مدربة حرف يدوية",
      imageUrl: "/api/placeholder/400/300",
      videoUrl: "/api/placeholder/video",
      shortStory:
        "سارة وجدت الأمل من جديد بعد مشاركتها في برامج التأهيل المهني التي قدمتها دار الحسام.",
      fullStory:
        "واجهت سارة العديد من التحديات الشخصية والمهنية قبل التحاقها ببرامج دار الحسام. من خلال الدعم النفسي والتوجيه المهني المتخصص، استطاعت سارة اكتشاف مواهبها في مجال الحرف اليدوية وتطويرها. حصلت على شهادة معتمدة في تصميم المجوهرات التقليدية، وبدأت بإقامة معارض محلية لمنتجاتها. اليوم، تعمل سارة كمدربة في مجال الحرف اليدوية وتلهم العديد من النساء في المجتمع. افتتحت مؤخراً ورشة صغيرة خاصة بها، وأصبحت قصتها مصدر إلهام للكثيرين.",
      testimonial:
        "دار الحسام لم تقدم لي التدريب فحسب، بل منحتني الثقة والدعم لاكتشاف إمكاناتي الحقيقية. أنا فخورة بما حققته وأتطلع لمساعدة المزيد من النساء.",
    },
    {
      _id: "3",
      name: "خالد يوسف",
      title: "قائد مجتمعي",
      imageUrl: "/api/placeholder/400/300",
      videoUrl: "/api/placeholder/video",
      shortStory:
        "بفضل الدورات التدريبية، أصبح خالد مدرباً معتمداً وقائداً مجتمعياً مميزاً.",
      fullStory:
        "بدأ خالد رحلته مع دار الحسام كمتطوع، ثم شارك في برنامج القيادة المجتمعية المتقدم. تعلم خالد مهارات التواصل الفعال واستراتيجيات بناء الفريق والتدريب المهني، وحصل على شهادات دولية معتمدة في التنمية المجتمعية. طور خالد برنامجاً خاصاً لتأهيل الشباب ودمجهم في سوق العمل، وقد نجح البرنامج في مساعدة أكثر من 100 شاب وشابة خلال العامين الماضيين. اليوم، يقود خالد مبادرات تطوعية مميزة ويساهم في تنمية قدرات الشباب من خلال شراكة استراتيجية مع دار الحسام.",
      testimonial:
        "تعلمت من دار الحسام أن القيادة الحقيقية تكمن في تمكين الآخرين. كل نجاح يحققه المتدربون معي هو مصدر فخر واعتزاز.",
    },
    {
      _id: "4",
      name: "ليلى حسن",
      title: "خبيرة تكنولوجيا المعلومات",
      imageUrl: "/api/placeholder/400/300",
      videoUrl: "/api/placeholder/video",
      shortStory:
        "انتقلت ليلى من البطالة إلى العمل في مجال التكنولوجيا بفضل برامج التدريب المتخصصة.",
      fullStory:
        "كانت ليلى تعاني من البطالة لأكثر من عامين رغم حصولها على شهادة جامعية، حتى التحقت ببرنامج التدريب التقني المتقدم في دار الحسام. خلال ستة أشهر من التدريب المكثف، تعلمت ليلى مهارات البرمجة وتطوير المواقع الإلكترونية. استفادت من شبكة العلاقات المهنية للدار للحصول على فرصة تدريب عملي في إحدى الشركات التقنية، والتي تحولت لاحقاً إلى وظيفة دائمة. اليوم، تعمل ليلى كمطورة مواقع إلكترونية وتساهم بوقتها في تدريب الفتيات المهتمات بالمجال التقني.",
      testimonial:
        "التدريب التقني الذي قدمته دار الحسام فتح أمامي آفاقاً جديدة تماماً. أشعر بالفخر كوني امرأة عربية في مجال التكنولوجيا.",
    },
  ];

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/home/success-stories");
        if (Array.isArray(response.data)) {
          setStories(response.data);
        } else {
          console.warn("Invalid data format received, using dummy stories");
          setStories(dummyStories);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        setError(error.response?.data?.message || "حدث خطأ أثناء تحميل القصص");
        setStories(dummyStories);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const closeStoryDetails = () => {
    setActiveStory(null);
  };

  // Custom component for the hero section
  const HeroSection = () => (
    <div
      className="py-24 md:py-32 px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/api/placeholder/1600/800')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto relative z-10 text-center">
        <div
          className="inline-block px-6 py-3 mb-6 rounded-lg"
          style={{ background: `${colors.primary}99` }}
        >
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            قصص النجاح
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-white text-lg md:text-xl leading-relaxed">
            نماذج ملهمة صنعت التغيير ووجدت طريقها للنجاح من خلال برامج دار
            الحسام. تعرّفوا على قصص حقيقية غيرت حياة أصحابها وألهمت مجتمعنا.
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.secondary})`,
        }}
      ></div>
    </div>
  );

  // Custom card component
  const StoryCard = ({ story }) => (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      style={{ borderTop: `5px solid ${colors.primary}` }}
    >
      <div className="relative">
        <img
          src={story.imageUrl}
          alt={story.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold shadow-md"
          style={{ background: colors.contrast }}
        >
          قصة نجاح
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 py-3 px-4"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
          }}
        >
          <h2 className="text-white text-xl font-bold">{story.name}</h2>
          <p className="text-gray-200 text-sm">{story.title}</p>
        </div>
      </div>

      <div className="p-6 bg-white">
        <p
          className="text-gray-700 leading-relaxed mb-6"
          style={{ minHeight: "100px" }}
        >
          {story.shortStory}
        </p>
        <button
          className="font-medium flex items-center text-sm transition duration-300 border-b-2 border-transparent hover:border-current pb-1"
          style={{ color: colors.contrast }}
          onClick={() => setActiveStory(story)}
        >
          قراءة المزيد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  // Custom loading component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className="w-16 h-16 border-4 border-gray-300 border-t-4 rounded-full animate-spin mb-4"
        style={{ borderTopColor: colors.primary }}
      ></div>
      <p className="text-gray-600 text-lg">جاري تحميل القصص...</p>
    </div>
  );

  // Enhanced story modal
  const StoryModal = ({ story }) => (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      style={{ direction: "rtl" }}
      onClick={closeStoryDetails}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl max-h-90vh overflow-y-auto"
        style={{ borderTop: `5px solid ${colors.primary}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={story.imageUrl}
            alt={story.name}
            className="w-full h-80 object-cover"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
          <button
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            onClick={closeStoryDetails}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={colors.contrast}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="absolute bottom-0 left-0 right-0 p-6"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            }}
          >
            <h2 className="text-white text-3xl font-bold mb-1">{story.name}</h2>
            <p className="text-gray-200">{story.title}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              القصة كاملة
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {story.fullStory || story.shortStory}
            </p>
          </div>

          {story.testimonial && (
            <div
              className="p-6 rounded-lg mb-6 relative"
              style={{ backgroundColor: colors.lightAccent }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={`${colors.primary}40`}
                className="absolute top-4 right-4 w-16 h-16"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 italic text-lg relative z-10">
                "{story.testimonial}"
              </p>
              <div className="flex justify-end mt-4">
                <p className="font-bold" style={{ color: colors.primary }}>
                  {story.name}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              دار الحسام للخدمات المجتمعية
            </span>
            <button
              className="px-6 py-3 rounded-md text-white text-sm font-medium transition duration-300 hover:shadow-lg"
              style={{ background: colors.primary }}
              onClick={closeStoryDetails}
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div style={{ direction: "rtl" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <section
        className="py-16"
        style={{
          background: colors.secondary,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4 inline-block relative"
              style={{ color: colors.primary }}
            >
              قصص ملهمة من مجتمعنا
              <div
                className="w-full h-1 absolute bottom-0 left-0"
                style={{ background: colors.contrast }}
              ></div>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              كل قصة تمثل رحلة فريدة من التحدي والإصرار والنجاح. تعرف على
              التجارب الملهمة التي غيرت حياة أصحابها وساهمت في بناء مجتمع أفضل.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>

          {/* Call to Action */}
          <div
            className="mt-20 p-8 rounded-lg text-center"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.lightAccent})`,
              border: `1px solid ${colors.accent}`,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              هل ترغب في مشاركة قصة نجاحك؟
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              نحن فخورون بكل قصة نجاح، ونرغب في مشاركتها مع مجتمعنا للإلهام
              وتشجيع الآخرين على تحقيق أحلامهم.
            </p>
            <button
              className="px-8 py-3 rounded-md text-white font-medium transition duration-300 hover:shadow-lg"
              style={{ background: colors.contrast }}
            >
              شارك قصتك الآن
            </button>
          </div>
        </div>
      </section>


      {/* Story Modal */}
      {activeStory && <StoryModal story={activeStory} />}
    </div>
  );
};

export default SuccessStories;
