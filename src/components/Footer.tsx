import React from 'react';
import { BatteryCharging, Heart, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-orange-500 flex items-center justify-center text-white shadow-md">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                مختبر طاقة المستقبل | Future Energy Lab
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              «من تفاعل كيميائي صغير… تنطلق طاقة تصنع المستقبل.» تطبيق تعليمي تفاعلي لدرس البطاريات (كيمياء 3، الصف الثالث الثانوي للبنات) مقدَّم ضمن مسابقة المعلم المبتكر 2027. متوافق مع معايير NGSS (HS-PS3-3, HS-ETS1-2, HS-ETS1-3).
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-medium bg-orange-950/40 border border-orange-900/50 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-4 h-4" />
              <span>إشراف تربوي وتصميم علمي متطور</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">أقسام المنصة</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentRoute('/')} className="hover:text-white transition">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/gate')} className="hover:text-white transition">بوابة التحدي</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/explore')} className="hover:text-white transition">مختبر الاستكشاف</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/simulation')} className="hover:text-white transition">محاكاة خلية دانيال</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/design')} className="hover:text-white transition">مختبر التصميم الهندسي</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Assessment & AI */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">التقييم والدعم</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentRoute('/assistant')} className="hover:text-white transition">مساعد طاقة المستقبل</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/assess')} className="hover:text-white transition">مركز التقييم وRubric</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/passport')} className="hover:text-white transition">جواز مهندسة الطاقة</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/gallery')} className="hover:text-white transition">معرض الابتكارات</button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('/teacher')} className="hover:text-white transition">لوحة المعلمة</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2027 مختبر طاقة المستقبل. جميع الحقوق محفوظة لفرق طالبات الثانوية ومسابقة المعلم المبتكر.</p>
          <p className="flex items-center gap-1">
            صُنع بِـ <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> لدعم التعليم العلمي التفاعلي
          </p>
        </div>
      </div>
    </footer>
  );
};
