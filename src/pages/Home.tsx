import React from 'react';
import { useStore } from '../store/useStore';
import { BatteryCharging, Atom, Cpu, Layers, Bot, CheckCircle2, Award, Shield, ArrowLeft, Sparkles, Zap, Flame } from 'lucide-react';

export const Home: React.FC = () => {
  const { setCurrentRoute, activeGroup } = useStore();

  const sections = [
    {
      title: 'بوابة التحدي',
      desc: 'انضمي لفريقكِ واكتشفي سيناريو انقطاع الكهرباء في المنطقة النائية.',
      path: '/gate',
      icon: Shield,
      color: 'from-amber-500 to-orange-500',
      badge: activeGroup ? 'متصلة (' + activeGroup.name + ')' : 'ابدئي من هنا'
    },
    {
      title: 'الأهداف والمهارات',
      desc: 'تعرفي على أهداف الدرس الـ5 ومهارات المستقبل الـ8 ومعايير NGSS.',
      path: '/objectives',
      icon: Award,
      color: 'from-blue-500 to-sky-500',
      badge: 'المرتكزات العلمية'
    },
    {
      title: 'مختبر الاستكشاف',
      desc: '5 محطات متسلسلة: تصنيف البطاريات، تشريح الخلية، وخلية دانيال.',
      path: '/explore',
      icon: Atom,
      color: 'from-emerald-500 to-teal-500',
      badge: '5 محطات تفاعلية'
    },
    {
      title: 'محاكاة خلية دانيال',
      desc: 'نموذج تفاعلي للأقطاب والمحلول والجسر الملحي وحركة الإلكترونات.',
      path: '/simulation',
      icon: Cpu,
      color: 'from-indigo-500 to-blue-600',
      badge: 'محاكاة 1.10 V'
    },
    {
      title: 'مختبر التصميم الهندسي',
      desc: 'صممي بطاريتك الخاصة بـ 7 مراحل هندسية مع قياس الفولت والتحسين.',
      path: '/design',
      icon: Layers,
      color: 'from-orange-500 to-rose-500',
      badge: 'مشروع الابتكار'
    },
    {
      title: 'المساعد الذكي',
      desc: 'استشيري مهندسة طاقة المستقبل عبر الأوضاع الذكية وسجل التعلم.',
      path: '/assistant',
      icon: Bot,
      color: 'from-purple-500 to-indigo-500',
      badge: 'دعم ذكي آمن'
    },
    {
      title: 'مركز التقييم',
      desc: 'الاختبارات القبلية والبعدية، وRubric التقييم، وتقرير أثر التعلم.',
      path: '/assess',
      icon: CheckCircle2,
      color: 'from-teal-600 to-emerald-600',
      badge: 'قياس الأثر'
    },
    {
      title: 'جواز المهندسة والمعرض',
      desc: 'استعرضي بطاقة إنجاز مجموعتكِ وتصدير PDF ومعرض الابتكارات.',
      path: '/passport',
      icon: Award,
      color: 'from-sky-600 to-blue-700',
      badge: 'الملف والشهادات'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/80 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>مسابقة المعلم المبتكر 2027 • الكيمياء 3 (الصف الثالث الثانوي)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              صمّمي <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-orange-500">طاقة المستقبل</span> بأفكار مبتكرة
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              «من تفاعل كيميائي صغير… تنطلق طاقة تصنع المستقبل.»
              عزّزي مهاراتكِ الهندسية والعلمية في تصميم خلية كهربائية تحول الطاقة الكيميائية إلى كهربائية بكفاءة عالية لمواجهة تحديات الطاقة في المناطق النائية.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentRoute('/gate')}
                className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-orange-500/25 hover:scale-105 transition-all"
              >
                <Zap className="w-5 h-5" />
                <span>أقبل التحدي والتحقي بفريقك</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentRoute('/explore')}
                className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-6 py-4 rounded-2xl font-bold text-base hover:bg-slate-100 transition shadow-xs"
              >
                <Atom className="w-5 h-5 text-sky-600" />
                <span>مختبر الاستكشاف</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>متوافق مع معايير NGSS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sky-600" />
                <span>بيانات آمنة وخاصة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>تجارب وتصميم هندسي فعلي</span>
              </div>
            </div>
          </div>

          {/* Hero SVG Interactive Animation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-sky-500/10 to-orange-500/10 rounded-3xl p-8 border border-sky-100 shadow-xl flex flex-col items-center justify-center text-center">
              
              {/* Animated SVG Battery */}
              <div className="relative w-64 h-40 bg-white rounded-2xl border-2 border-slate-800 shadow-xl flex items-center justify-between p-4 overflow-hidden">
                {/* Positive Terminal */}
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-10 bg-slate-800 rounded-r-md"></div>
                
                {/* Anode */}
                <div className="w-16 h-28 bg-zinc-300 border border-zinc-400 rounded-lg flex flex-col items-center justify-center text-xs font-bold text-slate-800 shadow-inner">
                  <span>Zn</span>
                  <span className="text-[10px] text-slate-600 mt-1">مصعد</span>
                </div>

                {/* Electrolyte & Electron Animation */}
                <div className="flex-1 mx-3 flex flex-col items-center justify-center relative">
                  <div className="text-[10px] font-bold text-sky-600 mb-1">جسر ملحي وأيونات</div>
                  <div className="w-full h-3 bg-sky-100 rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 w-6 bg-sky-500 rounded-full animate-electron"></div>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-700 mt-2">1.10 V القياسي</div>
                </div>

                {/* Cathode */}
                <div className="w-16 h-28 bg-amber-600 border border-amber-700 rounded-lg flex flex-col items-center justify-center text-xs font-bold text-white shadow-inner">
                  <span>Cu</span>
                  <span className="text-[10px] text-amber-100 mt-1">مهبط</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-base font-bold text-slate-900">سؤال تحدي مهندسة الطاقة</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  كيف نصمم خلية كهربائية تحول الطاقة الكيميائية إلى كهربائية بكفاءة لتشغيل جهاز طوارئ؟
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">أقسام الرحلة التعليمية</h2>
          <p className="text-slate-600 text-sm mt-2">انتقلي بسلاسة بين محطات المعرفة، المحاكاة، التصميم الهندسي، والتقييم.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                onClick={() => setCurrentRoute(sec.path)}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-50 to-orange-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${sec.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {sec.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-orange-600">
                  <span>ابدئي الآن</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
