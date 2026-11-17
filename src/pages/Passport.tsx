import React from 'react';
import { useStore } from '../store/useStore';
import { Award, Shield, CheckCircle2, Printer, ArrowLeft, Zap } from 'lucide-react';

export const Passport: React.FC = () => {
  const { activeGroup, designData, setCurrentRoute } = useStore();
  const groupId = activeGroup?.id || 'demo-group';
  const groupDesign = designData[groupId] || { submitted: false, finalVoltage: 1.15 };

  if (!activeGroup) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">لم تقومي بتسجيل دخول مجموعة بعد!</h2>
        <p className="text-xs text-slate-500">يرجى الدخول عبر بوابة التحدي لعرض جواز المهندسة الخاص بكِ.</p>
        <button
          onClick={() => setCurrentRoute('/gate')}
          className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md"
        >
          الانتقال لبوابة التحدي
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
          <Award className="w-4 h-4 text-sky-600" />
          <span>جواز مهندسة طاقة المستقبل الرقمي</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          ملف إنجاز المجموعة والشهادة الختامية
        </h1>
        <p className="text-slate-600 text-sm">
          وثيقة رسمية توثق رحلة فريقكِ في تصميم واختبار بطارية الطوارئ.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-2 border-sky-200 shadow-2xl space-y-8 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/15 rounded-bl-full -z-0"></div>

        {/* Passport Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-8 relative z-10">
          <div className="flex items-center gap-4 text-right">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-orange-500 text-white flex items-center justify-center text-4xl shadow-lg">
              {activeGroup.emblem}
            </div>
            <div>
              <span className="text-xs font-bold text-sky-600 block">فريق مهندسات الطاقة المعتمد</span>
              <h2 className="text-2xl font-black text-slate-900">{activeGroup.name}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">رمز المجموعة: {activeGroup.code}</p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="no-print bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md hover:bg-slate-800 transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الجواز والشهادة</span>
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-sky-700 block">فكرة الابتكار الهندسي:</span>
            <p className="text-slate-700 leading-relaxed">{activeGroup.idea}</p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <span className="font-bold text-emerald-800 block">حالة التسليم والجهد النهائي:</span>
            <p className="text-emerald-900 font-bold font-mono">
              {groupDesign.submitted ? 'تم التسليم والمعتمدة رسمياً' : 'قيد التطوير والاختبار'} • الجهد: {groupDesign.finalVoltage || 1.15} V
            </p>
          </div>
        </div>

        {/* Checklist of completed milestones */}
        <div className="space-y-4 relative z-10">
          <h3 className="text-sm font-bold text-slate-900">محطات الإنجاز المكتملة:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              'بوابة التحدي واختيار الفريق',
              'محطات الاستكشاف الخمسة',
              'محاكاة خلية دانيال والأقطاب',
              'التصميم الهندسي واختبار الفولت',
              'التقييم المعرفي وRubric',
              'التأمل الذاتي وتقرير الأثر'
            ].map((milestone, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{milestone}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Signature */}
        <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-xs text-slate-500 relative z-10">
          <div>
            <p className="font-bold text-slate-800">مسابقة المعلم المبتكر 2027</p>
            <p className="text-[10px]">كيمياء 3 - الصف الثالث الثانوي</p>
          </div>
          <div className="text-center font-mono font-bold text-sky-700">
            [ QR Code: Future Energy Lab 2027 ]
          </div>
        </div>

      </div>
    </div>
  );
};
