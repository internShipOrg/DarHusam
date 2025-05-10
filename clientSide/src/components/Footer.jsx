import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';                 

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // const [email, setEmail] = useState('');
  // const [loading, setLoading] = useState(false);
  const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

  // const handleSubscribe = async () => {
  //   if (!email) {
  //     toast.warn('أدخل البريد الإلكتروني');
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     await axios.post('http://localhost:5000/api/add/subscribe', { email });
  //     toast.success('✅ تم الاشتراك بنجاح');
  //     setEmail('');
  //   } catch (err) {
  //     const msg = err.response?.data?.error || err.message || 'فشل الاشتراك';
  //     toast.error(`❌ ${msg}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <footer className="bg-white text-[#780C28] w-full py-8 shadow-2xl shadow-[#780C28]">
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#6E8E59] pb-2 text-right">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-right">
              <li><a href="#" className="hover:text-[#6E8E59] transition-colors duration-300">الصفحة الرئيسية</a></li>
              <li><a href="#" className="hover:text-[#6E8E59] transition-colors duration-300">من نحن</a></li>
              <li><a href="#" className="hover:text-[#6E8E59] transition-colors duration-300">خدماتنا</a></li>
              <li><a href="#" className="hover:text-[#6E8E59] transition-colors duration-300">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#6E8E59] pb-2 text-right">
              حسابات التواصل الاجتماعي
            </h3>
            <div className="flex space-x-4 justify-end">
              <a href="#" className="bg-white text-[#780C28] p-2 rounded-full hover:bg-[#6E8E59] hover:text-white transition-colors duration-300">
                <Mail size={20} />
              </a>
              <a href="#" className="bg-white text-[#780C28] p-2 rounded-full hover:bg-[#6E8E59] hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-white text-[#780C28] p-2 rounded-full hover:bg-[#6E8E59] hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white text-[#780C28] p-2 rounded-full hover:bg-[#6E8E59] hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white text-[#780C28] p-2 rounded-full hover:bg-[#6E8E59] hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#6E8E59] pb-2 text-right">
              النشرة الإخبارية
            </h3>
            <p className="mb-4 text-right">اشترك للحصول على آخر الأخبار والتحديثات</p>
            <div className="flex flex-row-reverse">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`bg-[#6E8E59] hover:bg-white hover:text-[#780C28] px-4 py-2 rounded-r-md transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'جاري الاشتراك...' : 'اشتراك'}
              </button>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                className="py-2 px-4 focus:outline-none rounded-l-md border border-[#780C28] text-right text-[#780C28]"
              />
            </div>
          </div> */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="bg-white shadow-sm rounded-lg p-6"
          >
            <h5 className="font-bold text-xl mb-3 text-right text-dark-blue">
              اشترك في نشرتنا الإخبارية
            </h5>
            <p className="text-gray-600 text-sm mb-4 text-right">
              احصل على أحدث الأخبار مباشرة إلى بريدك الإلكتروني
            </p>
            <form action="https://formspree.io/f/xvgaqynl" method="POST" className="space-y-3">
              <div>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#780C28] text-white rounded-lg hover:opacity-90 transition duration-300 font-medium"
              >
                اشترك الآن
              </button>
            </form>

          </motion.div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-[#6E8E59] text-center">
          <p>حقوق النشر © {currentYear} جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
