// import { useState } from "react";

// export default function AboutUs() {
//   // بيانات الفريق الإداري
//   const teamMembers = [
//     {
//       name: "عضو الفريق الأول",
//       position: "المنصب",
//       image:
//         "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg",
//       bio: "نبذة مختصرة عن عضو الفريق الأول ودوره في الشركة. هنا يمكن إضافة المزيد من المعلومات حول خبرات العضو ومؤهلاته العلمية والعملية والإنجازات التي حققها خلال مسيرته المهنية. كما يمكن ذكر اهتماماته في مجال العمل والمسؤوليات التي يتولاها في الشركة.",
//     },
//     {
//       name: "عضو الفريق الثاني",
//       position: "المنصب",
//       image:
//         "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg",
//       bio: "نبذة مختصرة عن عضو الفريق الثاني ودوره في الشركة. هنا يمكن إضافة المزيد من المعلومات حول خبرات العضو ومؤهلاته العلمية والعملية والإنجازات التي حققها خلال مسيرته المهنية. كما يمكن ذكر اهتماماته في مجال العمل والمسؤوليات التي يتولاها في الشركة.",
//     },
//     {
//       name: "عضو الفريق الثالث",
//       position: "المنصب",
//       image:
//         "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg",
//       bio: "نبذة مختصرة عن عضو الفريق الثالث ودوره في الشركة. هنا يمكن إضافة المزيد من المعلومات حول خبرات العضو ومؤهلاته العلمية والعملية والإنجازات التي حققها خلال مسيرته المهنية. كما يمكن ذكر اهتماماته في مجال العمل والمسؤوليات التي يتولاها في الشركة.",
//     },
//   ];

//   // بيانات الشركاء
//   const partners = [
//     {
//       name: "الشريك الأول",
//       logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
//       link: "#",
//     },
//     {
//       name: "الشريك الثاني",
//       logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
//       link: "#",
//     },
//     {
//       name: "الشريك الثالث",
//       logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
//       link: "#",
//     },
//     {
//       name: "الشريك الرابع",
//       logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
//       link: "#",
//     },
//   ];

//   // بيانات القيم
//   const values = [
//     {
//       title: "النزاهة والشفافية",
//       description: "نلتزم بأعلى معايير النزاهة والشفافية في جميع أعمالنا",
//     },
//     {
//       title: "الإبداع والابتكار",
//       description: "نسعى دائماً لإيجاد حلول مبتكرة لتحديات المجتمع",
//     },
//     {
//       title: "التعاون والمشاركة",
//       description: "نؤمن بقوة العمل الجماعي والتعاون مع جميع أطياف المجتمع",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white" dir="rtl">
//       {/* قسم العنوان الرئيسي */}
//       <div className="bg-[#780C28] text-white py-12">
//         <div className="max-w-6xl mx-auto text-center px-4">
//           <h1 className="text-5xl font-bold mb-6">من نحن</h1>
//           <p className="text-2xl max-w-3xl mx-auto">
//             شركة غير ربحية معنية بالتوعية القانونية في جميع المجالات السياسية
//             والاقتصادية والثقافية والاجتماعية
//           </p>
//         </div>
//       </div>

//       {/* قسم الرسالة والرؤية */}
//       <div className="py-16 px-4 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-10">
//             <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#780C28]">
//               <h2 className="text-3xl font-bold mb-6 text-[#780C28] text-right">
//                 رسالتنا
//               </h2>
//               <p className="text-xl text-right leading-relaxed">
//                 تطوير وتعزيز الثقافة المعرفية لدى المواطنين حول حقوقه وواجباته
//                 والتي تعزز دوره الحقيقي من المواطنة الفاعلة.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#6E8E59]">
//               <h2 className="text-3xl font-bold mb-6 text-[#6E8E59] text-right">
//                 رؤيتنا
//               </h2>
//               <p className="text-xl text-right leading-relaxed">
//                 ترسيخ القيم الوطنية بالوسطية والاعتدال تحت سيادة القانون لتطوير
//                 الحياة الديمقراطية.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* قسم الأهداف */}
//       <div className="py-16 px-4 bg-white">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-8 text-[#780C28]">أهدافنا</h2>
//           <div className="bg-[#6E8E59] text-white p-8 rounded-xl shadow-xl">
//             <p className="text-2xl leading-relaxed">
//               تحقيق الوعي والمعرفة في كافة المجالات السياسية والاقتصادية
//               والاجتماعية والثقافية وتمكين الشباب من خلال برامجنا المتاحة.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* قسم المجالات */}
//       <div className="py-16 px-4 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold mb-8 text-[#780C28] text-center">
//             مجالاتنا
//           </h2>
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <p className="text-xl text-center leading-relaxed">
//               التدريب والتعليم وعمل الدراسات وعقد المؤتمرات ونقل المعرفة من اجل
//               النهوض بالوطن وشبابه في ظل الكفاءات الوطنية.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* قسم القيم */}
//       <div className="py-16 px-4 bg-[#780C28]">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold mb-10 text-white text-center">
//             قيمنا
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {values.map((value, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
//                 <h3 className="text-2xl font-bold mb-4 text-[#780C28] text-center">
//                   {value.title}
//                 </h3>
//                 <p className="text-lg text-gray-800 text-center">
//                   {value.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* قسم الفريق الإداري */}
//       <div className="py-16 px-4 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold mb-10 text-[#780C28] text-center">
//             الفريق الإداري
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {teamMembers.map((member, index) => {
//               // استخدام state لكل عضو لإظهار/إخفاء النبذة المختصرة
//               const [showBio, setShowBio] = useState(false);

//               return (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
//                 >
//                   <div className="relative">
//                     <div className="h-64 overflow-hidden">
//                       <img
//                         src={member.image}
//                         alt={member.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#780C28] to-transparent opacity-50"></div>
//                     <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
//                       <h3 className="text-2xl font-bold">{member.name}</h3>
//                       <p className="text-lg">{member.position}</p>
//                     </div>
//                   </div>

//                   <div className="p-6 text-center">
//                     <button
//                       onClick={() => setShowBio(!showBio)}
//                       className="bg-[#6E8E59] hover:bg-[#5d7a4b] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
//                     >
//                       {showBio ? "إخفاء النبذة" : "عرض النبذة المختصرة"}
//                     </button>

//                     {showBio && (
//                       <div className="mt-4 bg-white p-4 rounded-lg border border-[#6E8E59] text-right">
//                         <p className="text-gray-700">{member.bio}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* قسم الشركاء */}
//       <div className="py-16 px-4 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold mb-10 text-[#780C28] text-center">
//             شركاؤنا
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {partners.map((partner, index) => (
//               <a
//                 href={partner.link}
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center transition-transform hover:scale-105"
//               >
//                 <img
//                   src={partner.logo}
//                   alt={partner.name}
//                   className="max-w-full h-auto"
//                 />
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

export default function AboutUs() {
  // بيانات الفريق الإداري
  const teamMembers = [
    {
      name: "عضو الفريق الأول",
      position: "المنصب",
      image:
        "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg",
      bio: "نبذة مختصرة عن عضو الفريق الأول ودوره في الشركة. هنا يمكن إضافة المزيد من المعلومات حول خبرات العضو ومؤهلاته العلمية والعملية والإنجازات التي حققها خلال مسيرته المهنية. كما يمكن ذكر اهتماماته في مجال العمل والمسؤوليات التي يتولاها في الشركة.",
    },
    {
      name: "عضو الفريق الثاني",
      position: "المنصب",
      image:
        "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg",
      bio: "نبذة مختصرة عن عضو الفريق الثاني ودوره في الشركة. هنا يمكن إضافة المزيد من المعلومات حول خبرات العضو ومؤهلاته العلمية والعملية والإنجازات التي حققها خلال مسيرته المهنية. كما يمكن ذكر اهتماماته في مجال العمل والمسؤوليات التي يتولاها في الشركة.",
    },
    {
      name: "عضو الفريق الثالث",
      position: "المنصب",
      image:
        "https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg",
      bio: "نبذة مختصرة عن عضو الفريق الثالث ودوره في الشركة. هنا يمكن إضافة المزيد من المعلومات حول خبرات العضو ومؤهلاته العلمية والعملية والإنجازات التي حققها خلال مسيرته المهنية. كما يمكن ذكر اهتماماته في مجال العمل والمسؤوليات التي يتولاها في الشركة.",
    },
  ];

  // بيانات الشركاء
  const partners = [
    {
      name: "الشريك الأول",
      logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
      link: "#",
    },
    {
      name: "الشريك الثاني",
      logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
      link: "#",
    },
    {
      name: "الشريك الثالث",
      logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
      link: "#",
    },
    {
      name: "الشريك الرابع",
      logo: "https://www.alquds.co.uk/wp-content/uploads/2019/07/%D8%A7%D8%A8%D9%88-%D9%84%D8%A8%D9%86.jpg",
      link: "#",
    },
  ];

  // بيانات القيم
  const values = [
    {
      title: "النزاهة والشفافية",
      description: "نلتزم بأعلى معايير النزاهة والشفافية في جميع أعمالنا",
    },
    {
      title: "الإبداع والابتكار",
      description: "نسعى دائماً لإيجاد حلول مبتكرة لتحديات المجتمع",
    },
    {
      title: "التعاون والمشاركة",
      description: "نؤمن بقوة العمل الجماعي والتعاون مع جميع أطياف المجتمع",
    },
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* قسم العنوان الرئيسي */}
      <div className="bg-[#780C28] text-white py-12">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">من نحن</h1>
          <p className="text-2xl max-w-3xl mx-auto">
            شركة غير ربحية معنية بالتوعية القانونية في جميع المجالات السياسية
            والاقتصادية والثقافية والاجتماعية
          </p>
        </div>
      </div>

      {/* قسم الرسالة والرؤية */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#780C28]">
              <h2 className="text-3xl font-bold mb-6 text-[#780C28] text-right">
                رسالتنا
              </h2>
              <p className="text-xl text-right leading-relaxed">
                تطوير وتعزيز الثقافة المعرفية لدى المواطنين حول حقوقه وواجباته
                والتي تعزز دوره الحقيقي من المواطنة الفاعلة.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#6E8E59]">
              <h2 className="text-3xl font-bold mb-6 text-[#6E8E59] text-right">
                رؤيتنا
              </h2>
              <p className="text-xl text-right leading-relaxed">
                ترسيخ القيم الوطنية بالوسطية والاعتدال تحت سيادة القانون لتطوير
                الحياة الديمقراطية.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم الأهداف */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#780C28]">أهدافنا</h2>
          <div className="bg-[#6E8E59] text-white p-8 rounded-xl shadow-xl">
            <p className="text-2xl leading-relaxed">
              تحقيق الوعي والمعرفة في كافة المجالات السياسية والاقتصادية
              والاجتماعية والثقافية وتمكين الشباب من خلال برامجنا المتاحة.
            </p>
          </div>
        </div>
      </div>

      {/* قسم المجالات */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#780C28] text-center">
            مجالاتنا
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl text-center leading-relaxed">
              التدريب والتعليم وعمل الدراسات وعقد المؤتمرات ونقل المعرفة من اجل
              النهوض بالوطن وشبابه في ظل الكفاءات الوطنية.
            </p>
          </div>
        </div>
      </div>

      {/* قسم القيم */}
      <div className="py-16 px-4 bg-[#780C28]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-white text-center">
            قيمنا
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-[#780C28] text-center">
                  {value.title}
                </h3>
                <p className="text-lg text-gray-800 text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم الفريق الإداري */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#780C28] mb-4">
              الفريق الإداري
            </h2>
            <div className="w-24 h-1 bg-[#6E8E59] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* صورة العضو */}
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover"
                  />

                  {/* الطبقة المتدرجة فوق الصورة */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

                  {/* معلومات العضو فوق الصورة */}
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-0.5 bg-[#6E8E59]"></div>
                      <p className="text-white text-lg font-medium">
                        {member.position}
                      </p>
                    </div>
                  </div>

                  {/* أيقونة لتوجيه المستخدم للتمرير فوق الصورة */}
                  <div className="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full p-2 text-[#780C28] text-xs">
                    مرر للتفاصيل
                  </div>
                </div>

                {/* النبذة المختصرة (تظهر عند التمرير) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#780C28] to-[#6E8E59] opacity-0 hover:opacity-95 transition-opacity duration-300 flex items-center justify-center p-8 overflow-y-auto">
                  <div className="text-white text-right">
                    <h3 className="text-2xl font-bold mb-3">{member.name}</h3>
                    <div className="w-12 h-0.5 bg-white mb-4"></div>
                    <p className="leading-relaxed">{member.bio}</p>
                  </div>
                </div>

                {/* جزء المعلومات الثابت - يظهر دائمًا أسفل الصورة */}
                <div className="bg-white py-4 px-6 border-b-2 border-[#6E8E59]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      للمزيد من المعلومات
                    </span>
                    <div className="flex space-x-3">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#780C28]">
                        in
                      </span>
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#780C28]">
                        @
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم الشركاء */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-[#780C28] text-center">
            شركاؤنا
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <a
                href={partner.link}
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center transition-transform hover:scale-105"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full h-auto"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
