import React from 'react';
import { useStore } from '../store/useStore';
import { Shield, Award, Sparkles, Zap, ArrowLeft } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { groups, designData, setCurrentRoute } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
          <Shield className="w-4 h-4 text-orange-600" />
          <span>معرض الابتكارات الطلابية المعتمدة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          إبداعات مهندسات طاقة المستقبل
        </h1>
        <p className="text-slate-600 text-sm">
          استعرضي النماذج الهندسية المتميزة التي صممتها ونفذتها فرق الطالبات في المختبر.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => {
          const design = designData[group.id] || { submitted: true, finalVoltage: 1.15 };
          return (
            <div key={group.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-md">
                    {group.emblem}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700">
                    {group.code}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{group.idea}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">جهد النموذج المسجل:</span>
                  <span className="font-mono text-emerald-600">{design.finalVoltage || 1.15} V</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>نموذج معتمد رسمياً</span>
                <Sparkles className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={() => setCurrentRoute('/design')}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:opacity-95 transition"
        >
          أضيفي ابتكار مجموعتكِ الآن
        </button>
      </div>

    </div>
  );
};
