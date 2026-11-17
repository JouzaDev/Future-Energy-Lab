import React from 'react';
import { useStore } from '../store/useStore';
import { BookOpen, Award, CheckCircle2, ArrowLeft, Lightbulb, Compass, Target, Users, BarChart3, Cpu, Sparkles } from 'lucide-react';

export const Objectives: React.FC = () => {
  const { setCurrentRoute } = useStore();

  const objectives = [
    {
      num: '01',
      title: 'أفسر علمياً',
      desc: 'فهم آلية تحويل الطاقة الكيميائية إلى طاقة كهربائية في الخلايا الجلفانية وتفسير تفاعلات الأكسدة والاختزال.',
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-500'
    },
    {
      num: '02',
      title: 'أستكشف وأجرب',
      desc: 'الاستقصاء التجريبي في تصنيف البطاريات الأولية والثانوية وفحص مكونات خلية دانيال.',
      icon: Compass,
      color: 'from-sky-500 to-blue-600'
    },
    {
      num: '03',
      title: 'أصمم وأبتكر',
      desc: 'تطبيق خطوات التصميم الهندسي لابتكار مصدر طاقة بديل لأجهزة الاستشعار في المناطق النائية.',
      icon: Target,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      num: '04',
      title: 'أحلل وأطور',
      desc: 'جمع بيانات قراءات الفولت وتفسير النتائج بدقة وإجراء تحسينات معمارية على النموذج.',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      num: '05',
      title: 'أعمل بروح الفريق',
      desc: 'التعاون الفعّال مع زميلات المجموعة لتوزيع الأدوار وتوثيق الابتكار في الجواز الرقمي والمعرض.',
      icon: Users,
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const skills = [
    { name: 'التفكير التصميمي', desc: 'ابتكار حلول هندسية لمشكلة انقطاع الكهرباء.', link: '/design' },
    { name: 'التفكير النقدي', desc: 'تحليل قطبي الخلية الجلفانية وحركة الأيونات.', link: '/simulation' },
    { name: 'حل المشكلات', desc: 'معالجة تحديات انخفاض الجهد أو عدم استقرار القراءة.', link: '/assistant' },
    { name: 'التعاون الجماعي', desc: 'إدارة أدوار الفريق وتوزيع مهام التنفيذ والاختبار.', link: '/passport' },
    { name: 'التواصل العلمي', desc: 'عرض الابتكار بوضوح في المعرض الرقمي وتقارير الأثر.', link: '/gallery' },
    { name: 'تحليل البيانات', desc: 'قراءة جداول الفولت ورسم المقارنات قبل وبعد التحسين.', link: '/design' },
    { name: 'الثقافة الرقمية', desc: 'استخدام المحاكاة والمنصة الرقمية للتجريب الآمن والفعّال.', link: '/simulation' },
    { name: 'الاستخدام المسؤول للذكاء الاصطناعي', desc: 'استشارة المساعد الذكي للاستنتاج دون اتخاذ قرارات بديلة.', link: '/assistant' }
  ];

  const ngssStandards = [
    {
      code: 'HS-PS3-3',
      title: 'تصميم وبناء وتقييم جهاز يحول الطاقة',
      desc: 'تصميم جهاز يحول الطاقة من شكل إلى آخر لتشغيل نظام استشعار طوارئ بكفاءة.'
    },
    {
      code: 'HS-ETS1-2',
      title: 'تفكيك مشكلة تصميم معقدة',
      desc: 'تجزئة مشكلة انقطاع الطاقة إلى معايير نجاح وقيود واضحة.'
    },
    {
      code: 'HS-ETS1-3',
      title: 'تقييم الحلول وتحسينها',
      desc: 'مقارنة الحلول البديلة واختبار النماذج وتطويرها بناءً على القياسات التجريبية الفعلية.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>الأهداف والمهارات المستقبلية والمعايير</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          مرتكزات رحلة مهندسة الطاقة
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          تعرفي على الأهداف التعليمية الخمسة والمهارات المستقبلية المرتبطة بأنشطة المختبر والمعايير العالمية المعتمدة.
        </p>
      </div>

      {/* 5 Objectives Cards */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">أهداف الدرس الخمسة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-sky-300 transition">
                <div className="absolute top-0 right-0 bg-slate-100 text-slate-400 font-mono text-xs font-bold px-3 py-1 rounded-bl-xl group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  {obj.num}
                </div>
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${obj.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{obj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Future Skills */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">المهارات المستقبلية الـ 8 المرتبطة بالأنشطة</h2>
            <p className="text-xs text-slate-500 mt-1">كل مهارة مربوطة بنشاط فعلي داخل المنصة لتنميتها عملياً.</p>
          </div>
          <span className="text-xs font-bold bg-orange-100 text-orange-800 px-3.5 py-1.5 rounded-full">
            تكامل المهارات والابتكار
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentRoute(skill.link)}
              className="group p-4 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-sky-600">مهارة رقم {idx + 1}</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700">{skill.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{skill.desc}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-sky-600">
                <span>انتقلي للنشاط</span>
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NGSS Standards & Design Pathway */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* NGSS Standards */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">معايير الأداء NGSS</h3>
              <p className="text-xs text-slate-500">متوافق مع المعايير العلمية للجيل القادم</p>
            </div>
          </div>

          <div className="space-y-4">
            {ngssStandards.map((std, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {std.code}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{std.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Design Thinking Pathway */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">مسار التصميم الهندسي</h3>
              <p className="text-xs text-slate-500">دورة الابتكار وحل المشكلات</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { step: '01', title: 'تحديد المشكلة', desc: 'فهم تحدي انقطاع الكهرباء في المنطقة النائية.' },
              { step: '02', title: 'الاستقصاء', desc: 'فحص البطاريات واستكشاف خلية دانيال.' },
              { step: '03', title: 'التصميم', desc: 'اقتراح الحلول ورسم المخطط وتحديد الأقطاب والمحلول.' },
              { step: '04', title: 'التنفيذ والاختبار', desc: 'بناء النموذج وتسجيل القراءات متعددة الفولت.' },
              { step: '05', title: 'تحليل البيانات والتحسين', desc: 'تقييم النتائج وإجراء التطويرات اللازمة.' },
            ].map((p, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-mono font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">
                  {p.step}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentRoute('/explore')}
            className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <span>انتقلي لمختبر الاستكشاف</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
