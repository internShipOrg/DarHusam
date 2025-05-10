import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const termsTexts = {
  individual: 'الشروط والأحكام الخاصة بالتسجيل كشريك فردي... (يمكنك تعديل هذا النص لاحقًا)',
  partner: 'الشروط والأحكام الخاصة بالتسجيل كشريك مؤسسة... (يمكنك تعديل هذا النص لاحقًا)',
  trainee: 'الشروط والأحكام الخاصة بالتسجيل كمتدرب... (يمكنك تعديل هذا النص لاحقًا)',
  trainer: 'الشروط والأحكام الخاصة بالتسجيل كمدرب... (يمكنك تعديل هذا النص لاحقًا)',
  volunteer: 'الشروط والأحكام الخاصة بالتسجيل كمتطوع... (يمكنك تعديل هذا النص لاحقًا)',
  trainer: `المدرب\n\nالمدرب هو الشخص المتخصص الذي يقوم بتقديم برنامج تدريبي داخل المؤسسة، بناءً على اتفاق مسبق لتطوير مهارات المشاركين في مجال محدد.\n2. شروط التعاقد مع المدرب\nتقديم السيرة الذاتية والخطة التدريبية المقترحة.\nتوقيع اتفاق التدريب قبل بدء البرنامج.\nالالتزام بالجدول الزمني والمحتوى التدريبي المتفق عليه.\nالامتثال لسياسات المؤسسة وأهدافها المجتمعية.\n3. التزامات المدرب\nإعداد المادة التدريبية مسبقاً ومشاركتها مع إدارة المؤسسة.\nالالتزام بمواعيد التدريب وعدد الساعات المحددة.\nالتفاعل المهني مع المتدربين واحترام الفروقات الفردية.\nتقديم تقرير ختامي يتضمن تقييم البرنامج وملاحظات عامة.\nالمحافظة على سرية المعلومات التي يطلع عليها داخل المؤسسة.\n4. حقوق المدرب\nالحصول على مستحقاته المالية (إن وُجدت) وفق الاتفاق المبرم.\nالدعم اللوجستي المناسب أثناء التدريب (قاعة، أدوات، تجهيزات).\nالتقدير المعنوي والشهادات التقديرية من المؤسسة.\nالإشارة إلى اسمه كمدرب في التقارير أو التغطية الإعلامية الخاصة بالتدريب (حسب رغبة المدرب).\n5. المقابل المالي\nتقديم الخدمة بشكل تطوعي\n6. الاستخدام الإعلامي\nيحق للمؤسسة توثيق التدريب بالصور والفيديو لأغراض التوثيق والنشر، مع احترام طلب المدرب في حال رفض الظهور الإعلامي.\n7. إلغاء أو تعديل التدريب\nللمؤسسة الحق في تعديل أو إلغاء التدريب في حال وجود ظروف قاهرة أو عدم التزام المدرب.\nيحق للمدرب الاعتذار عن الاستمرار في التدريب مع إشعار المؤسسة مسبقًا بمدة لا تقل عن [مدة متفق عليها] وتقديم مبرر مهني.\n8. ضوابط عامة\nيمنع استخدام التدريب لأغراض دعائية شخصية أو تجارية دون إذن.\nيُمنع استغلال العلاقة مع المتدربين لتحقيق مصالح خاصة.\nيلتزم المدرب بتقديم محتوى تدريبي يحترم القيم الأخلاقية والثقافية للمجتمع.`,
};

const formsPaths = {
  individual: '/join-us/individual',
  partner: '/join-us/partner',
  trainee: '/join-us/trainee',
  trainer: '/join-us/trainer',
  volunteer: '/join-us/volunteer',
};

const formsTitles = {
  individual: 'شريك فردي',
  partner: 'شريك مؤسسة',
  trainee: 'متدرب',
  trainer: 'مدرب',
  volunteer: 'متطوع',
};

const TermsPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    if (agreed) {
      navigate(formsPaths[type]);
    }
  };

  if (!termsTexts[type]) {
    return <div className="text-center py-16 text-red-600 font-bold">نوع النموذج غير معروف!</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12" dir="rtl">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-[#780C28] text-center">الشروط والأحكام - {formsTitles[type]}</h1>
        <div className="mb-6 text-gray-700 leading-relaxed" style={{whiteSpace: 'pre-line'}}>
          {termsTexts[type]}
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-[#6E8E59] text-[#780C28]"
          />
          <label htmlFor="agree" className="mr-2 text-sm">أوافق على جميع الشروط والأحكام</label>
        </div>
        <button
          onClick={handleAgree}
          disabled={!agreed}
          className="w-full bg-[#780C28] text-white py-3 rounded-lg font-medium text-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          أوافق وأكمل التسجيل
        </button>
      </div>
    </div>
  );
};

export default TermsPage; 