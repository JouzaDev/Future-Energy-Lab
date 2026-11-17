import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Cpu, ArrowLeft, Zap, RefreshCw, Info } from 'lucide-react';

export const Simulation: React.FC = () => {
  const { setCurrentRoute } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'redox' | 'ions'>('overview');
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span>محاكاة خلية دانيال التعليمية التفاعلية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          محاكاة الأقطاب، المحاليل، والجسر الملحي
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          استكشفي تفاعلات الأكسدة والاختزال واتجاه حركة الإلكترونات والأيونات في خلية دانيال الكلاسيكية.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
        
        {/* Top Notice Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-amber-900 text-xs font-bold">
          <Info className="w-5 h-5 text-amber-600 shrink-0" />
          <span>ملاحظة علمية هامة: الجهد المعروض (1.10 V) هو قيمة نظرية قياسية عند 25°م و1 مولار — وليست قياسًا فعليًا من تجربة مختبرية.</span>
        </div>

        {/* Interactive Simulation Visualizer */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-300">الحالة: {isRunning ? 'تعمل (توليد طاقة)' : 'متوقفة'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-6">
            
            {/* Anode Half-Cell */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
              <div className="text-xs font-bold text-sky-400">نصف خلية المصعد (Anode)</div>
              <div className="w-16 h-36 bg-zinc-300 mx-auto rounded-lg border border-zinc-400 flex flex-col items-center justify-center text-slate-900 font-bold text-sm shadow-inner">
                <span>Zn(s)</span>
                <span className="text-[10px] text-slate-600 mt-2">خارصين</span>
              </div>
              <div className="text-xs text-slate-300 bg-slate-900/50 p-2 rounded-xl">
                محلول ZnSO₄ (أيونات Zn²⁺ و SO₄²⁻)
              </div>
            </div>

            {/* Voltmeter & Circuit Header */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Voltmeter display */}
              <div className="bg-white text-slate-900 px-8 py-4 rounded-2xl border-4 border-amber-500 shadow-xl text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">فرق الجهد القياسي النظري</div>
                <div className="text-3xl font-mono font-black text-amber-600 mt-1">1.10 V</div>
              </div>

              {/* Electron flow wire */}
              <div className="w-full flex items-center justify-center relative">
                <div className="w-full h-2 bg-amber-500 rounded-full relative overflow-hidden">
                  {isRunning && (
                    <div className="absolute inset-y-0 w-8 bg-white rounded-full animate-electron shadow-md"></div>
                  )}
                </div>
              </div>
              <span className="text-xs text-amber-300 font-medium">اتجاه حركة الإلكترونات من Zn إلى Cu</span>

              {/* Salt Bridge */}
              <div className="w-48 h-10 bg-sky-900/60 border border-sky-600 rounded-xl flex items-center justify-center text-xs font-bold text-sky-200">
                جسر ملحي (KCl / Na₂SO₄)
              </div>
            </div>

            {/* Cathode Half-Cell */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
              <div className="text-xs font-bold text-orange-400">نصف خلية المهبط (Cathode)</div>
              <div className="w-16 h-36 bg-amber-600 mx-auto rounded-lg border border-amber-700 flex flex-col items-center justify-center text-white font-bold text-sm shadow-inner">
                <span>Cu(s)</span>
                <span className="text-[10px] text-amber-100 mt-2">نحاس</span>
              </div>
              <div className="text-xs text-slate-300 bg-slate-900/50 p-2 rounded-xl">
                محلول CuSO₄ (أيونات Cu²⁺ و SO₄²⁻)
              </div>
            </div>

          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-sky-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-sky-700 transition"
            >
              {isRunning + '' === 'true' ? 'إيقاف مؤقت للمحاكاة' : 'استئناف المحاكاة'}
            </button>
          </div>
        </div>

        {/* Detailed Explanation Tabs */}
        <div className="space-y-6">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-6 font-bold text-sm border-b-2 transition ${
                activeTab === 'overview' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500'
              }`}
            >
              مكونات الخلية ووظيفتها
            </button>
            <button
              onClick={() => setActiveTab('redox')}
              className={`pb-3 px-6 font-bold text-sm border-b-2 transition ${
                activeTab === 'redox' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500'
              }`}
            >
              تفاعلات الأكسدة والاختزال
            </button>
            <button
              onClick={() => setActiveTab('ions')}
              className={`pb-3 px-6 font-bold text-sm border-b-2 transition ${
                activeTab === 'ions' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'
              }`}
            >
              حركة الأيونات والجسر الملحي
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                <h3 className="text-sm font-bold text-sky-900">قطب الخارصين (Zn)</h3>
                <p className="text-sky-800 leading-relaxed">يمثل المصعد السالب الذي تفقد ذراته الإلكترونات وتذوب في المحلول بمرور الوقت.</p>
              </div>
              <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
                <h3 className="text-sm font-bold text-orange-900">قطب النحاس (Cu)</h3>
                <p className="text-orange-800 leading-relaxed">يمثل المهبط الموجب الذي تترسب عليه ذرات النحاس الناتجة عن اختزال أيونات Cu²⁺.</p>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h3 className="text-sm font-bold text-emerald-900">الجسر الملحي</h3>
                <p className="text-emerald-800 leading-relaxed">يحافظ على التعادل الكهربائي بين نصفي الخلية للسماح باستمرار تدفق التيار.</p>
              </div>
            </div>
          )}

          {activeTab === 'redox' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-sky-700">معادلة الأكسدة (عند المصعد):</span>
                <p className="font-mono mt-1 text-slate-800">Zn(s) → Zn²⁺(aq) + 2e⁻</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-orange-700">معادلة الاختزال (عند المهبط):</span>
                <p className="font-mono mt-1 text-slate-800">Cu²⁺(aq) + 2e⁻ → Cu(s)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-emerald-700">التفاعل الكلي للخلية:</span>
                <p className="font-mono mt-1 text-slate-800">Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)</p>
              </div>
            </div>
          )}

          {activeTab === 'ions' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
              <h3 className="text-sm font-bold text-slate-900">كيف ينتقل التيار الأيوني؟</h3>
              <p className="leading-relaxed">
                لكن لا يمكن للإلكترونات وحدها إكمال الدائرة دون انتقال الأيونات في المحلول. تتحرك الأنيونات (الأيونات السالبة مثل SO₄²⁻) عبر الجسر الملحي نحو نصف خلية المصعد لمعادلة النقص الناتج عن ذوبان الخارصين، بينما تتحرك الكاتيونات (الأيونات الموجبة مثل K⁺ أو Na⁺) نحو نصف خلية المهبط لمعادلة الزيادة في الأيونات السالبة.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={() => setCurrentRoute('/design')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <span>انتقلي الآن إلى مختبر التصميم الهندسي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
