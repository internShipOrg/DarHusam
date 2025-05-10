import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Users, GraduationCap, Briefcase, HeartHandshake } from 'lucide-react';

const forms = [
  {
    name: 'شريك فردي',
    type: 'individual',
    icon: <UserCircle size={40} className="mx-auto text-[#780C28]" />,
    desc: 'انضم كشريك فردي وكن جزءًا من التغيير المجتمعي.'
  },
  {
    name: 'شريك مؤسسة',
    type: 'partner',
    icon: <Users size={40} className="mx-auto text-[#6E8E59]" />,
    desc: 'سجّل مؤسستك كشريك في النجاح والتأثير.'
  },
  {
    name: 'متدرب',
    type: 'trainee',
    icon: <GraduationCap size={40} className="mx-auto text-[#780C28]" />,
    desc: 'ابدأ رحلتك التدريبية معنا.'
  },
  {
    name: 'مدرب',
    type: 'trainer',
    icon: <Briefcase size={40} className="mx-auto text-[#6E8E59]" />,
    desc: 'ساهم بخبرتك كمدرب في تطوير الآخرين.'
  },
  {
    name: 'متطوع',
    type: 'volunteer',
    icon: <HeartHandshake size={40} className="mx-auto text-[#780C28]" />,
    desc: 'شارك بوقتك وجهدك كمتطوع.'
  },
];

const JoinUsOptions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-l from-[#780C28] to-[#6E8E59] py-8 px-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">انضم إلينا</h1>
            <p className="text-white/80 text-lg">اختر نوع التسجيل المناسب لك</p>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {forms.map((form) => (
              <button
                key={form.type}
                onClick={() => navigate(`/join-us/${form.type}/terms`)}
                className="bg-gray-100 hover:bg-[#f3e8ee] border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow transition-all duration-200 focus:outline-none"
              >
                {form.icon}
                <span className="mt-4 text-lg font-semibold text-[#780C28]">{form.name}</span>
                <span className="mt-2 text-gray-600 text-sm text-center">{form.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsOptions; 