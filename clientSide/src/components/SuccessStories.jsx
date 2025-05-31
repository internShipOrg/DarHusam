import { useEffect, useState } from "react";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [loading, setLoading] = useState(true);

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
      shortStory:
        "انتقلت ليلى من البطالة إلى العمل في مجال التكنولوجيا بفضل برامج التدريب المتخصصة.",
      fullStory:
        "كانت ليلى تعاني من البطالة لأكثر من عامين رغم حصولها على شهادة جامعية، حتى التحقت ببرنامج التدريب التقني المتقدم في دار الحسام. خلال ستة أشهر من التدريب المكثف، تعلمت ليلى مهارات البرمجة وتطوير المواقع الإلكترونية. استفادت من شبكة العلاقات المهنية للدار للحصول على فرصة تدريب عملي في إحدى الشركات التقنية، والتي تحولت لاحقاً إلى وظيفة دائمة. اليوم، تعمل ليلى كمطورة مواقع إلكترونية وتساهم بوقتها في تدريب الفتيات المهتمات بالمجال التقني.",
      testimonial:
        "التدريب التقني الذي قدمته دار الحسام فتح أمامي آفاقاً جديدة تماماً. أشعر بالفخر كوني امرأة عربية في مجال التكنولوجيا.",
    },
  ];

  // useEffect(() => {
  //   const fetchStories = async () => {
  //     setLoading(true);
  //     try {
  //       // Attempt to fetch from API
  //       const response = await fetch(
  //         "http://localhost:5000/api/success-stories"
  //       );
  //       const data = await response.json();

  //       if (data.length === 0) {
  //         setStories(dummyStories);
  //       } else {
  //         setStories(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching stories:", error);
  //       setStories(dummyStories);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStories();
  // }, []);

  useEffect(() => {
  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/success-stories");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        setStories(dummyStories);
      } else {
        setStories(data);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
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
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.03a4.41 4.41 0 0 1 1.91-1.03c.634-.176.96-.42.96-.756 0-.344-.304-.577-.896-.756l-.928-.266c-.826-.23-1.29-.682-1.45-1.366-.14-.684-.03-1.533.114-2.285.127-.656.19-1.186.19-1.565 0-.38-.086-.65-.258-.815-.21-.18-.47-.265-.872-.265H4.066c-.166 0-.33.033-.49.1-.284.1-.5.25-.764.504-.224.223-.422.504-.56.838l-.098.17c-.38.664-.713 1.428-.98 2.28-.211.677-.51 1.35-.72 2.027-.396 1.283-.22 2.433.365 3.294.5.723 1.33 1.29 2.416 1.656.426.143.656.333.726.563.07.23-.055.418-.19.55-.026.022-.055.042-.086.06l.068-.022c.527-.173.994-.236 1.437-.233.53.006 1.083.102 1.576.345.716.334 1.26.82 1.618 1.5.335.63.506 1.38.506 2.233 0 .66-.08 1.138-.256 1.587-.148.374-.35.7-.578.916-.225.237-.526.352-.854.383-.25.02-.512-.02-.766-.096-.166-.05-.32-.145-.506-.265l-.102-.066c-.593-.39-1.067-.538-1.5-.628-.31-.07-.553-.083-.707-.058-.055.01-.104.022-.15.04-.15.063-.144.182.17.257.578.26 1.15.605 1.618 1.04.567.533.968 1.187 1.14 1.964.9.412.132.806.132 1.298 0 .622-.19 1.245-.578 1.835-.31.463-.835.82-1.456.928a4.1 4.1 0 0 1-.954.06c-.414-.026-.794-.137-1.146-.33-.556-.31-.93-.772-1.097-1.373-.132-.476-.132-.846-.004-1.108.033-.07.08-.134.127-.2l.003-.004c.356-.5.608-.75.835-1.254.23-.506.365-1.156.365-1.952 0-.898-.148-1.57-.43-2.052-.286-.483-.7-.77-1.24-.863-.556-.1-1.1.038-1.638.393-.637.413-1.02.974-1.233 1.696-.354 1.183-.248 2.850.216 5.015.128.597.304 1.158.56 1.712.276.594.678 1.13 1.187 1.578.517.458 1.16.825 1.89 1.06.81.263 1.75.387 2.743.387 1.333 0 2.53-.224 3.643-.67 1.112-.448 2.03-1.024 2.773-1.726.736-.7 1.293-1.5 1.676-2.392.384-.893.574-1.776.574-2.68 0-.586-.054-1.128-.193-1.686-.14-.558-.382-1.076-.733-1.55a4.588 4.588 0 0 0-1.378-1.174c-.98-.518-2.186-.826-3.478-.826z" />
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

          {loading ? (
            <LoadingState />
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          )}

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
