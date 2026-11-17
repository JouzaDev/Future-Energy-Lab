import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Layers, CheckCircle2, ArrowLeft, Plus, Trash2, Award, Shield, AlertTriangle, Sparkles } from 'lucide-react';

export const Design: React.FC = () => {
  const { activeGroup, designData, updateDesignData, setCurrentRoute } = useStore();
  const groupId = activeGroup?.id || 'demo-group';
  const groupDesign = designData[groupId] || {
    problemDefinition: 'توفير مصدر طاقة طارئ ومستقر لأجهزة استشعار الحرارة والإنذار في مركز رعاية صحية نائي أثناء انقطاع الكهرباء.',
    solutions: [
      { id: '1', title: 'خلية ليمون ونحاس', pros: 'مواد متوفرة ورخيصة', cons: 'جهد منخفض وسريع التلف' },
      { id: '2', title: 'خلية زنك-نحاس مع محلول ملحي', pros: 'جهد مستقر نسبياً وقابل للتعديل', cons: 'تتطلب عناية بالعزل' }
    ],
    selectedSolution: 'خلية زنك-نحاس مع محلول ملحي',
    designDescription: 'استخدام أقطاب من الخارصين والنحاس في كؤوس زجاجية مع محلول كبريتات النحاس وزنك وسطه جسر ملحي من الورق المشبع بكلوريد الصوديوم.',
    designImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600',
    prototypeSteps: ['تجهيز الأقطاب وصنفرتها', 'إعداد المحاليل الإلكتروليتية', 'تركيب الجسر الملحي وتوصيل الدائرة'],
    prototypeImage: '',
    readings: [
      { id: 'r1', metal1: 'خارصين (Zn)', metal2: 'نحاس (Cu)', solution: 'محلول ملحي مع كبريتات', electrodesArea: 'متوسطة (20 سم²)', voltage: 1.05, notes: 'قراءة مستقرة لمدة 5 دقائق' }
    ],
    analysisAnswers: { q1: 'الجهد كان 1.05 فولت وهو قريب نسبياً من القيمة النظرية.' },
    improvements: 'زيادة مساحة الأقطاب واستخدام جسر ملحي أعرض لتقليل المقاومة الداخلية.',
    finalVoltage: 1.18,
    submitted: false
  };

  const [activeStage, setActiveStage] = useState<number>(1);
  const [newReading, setNewReading] = useState({ metal1: 'خارصين (Zn)', metal2: 'نحاس (Cu)', solution: 'كبريتات النحاس والزنك', electrodesArea: '50 سم²', voltage: 1.12, notes: 'بعد تحسين مساحة الأقطاب' });

  const handleAddReading = () => {
    const updatedReadings = [
      ...groupDesign.readings,
      { id: 'r-' + Date.now(), ...newReading }
    ];
    updateDesignData(groupId, { readings: updatedReadings });
  };

  const handleDeleteReading = (id: string) => {
    const updatedReadings = groupDesign.readings.filter((r: any) => r.id !== id);
    updateDesignData(groupId, { readings: updatedReadings });
  };

  const handleFinalSubmit = () => {
    updateDesignData(groupId, { submitted: true, submittedAt: new Date().toLocaleDateString('ar-SA') });
    alert('تم تسليم الابتكار الهندسي بنجاح وإغلاق المدخلات للاعتماد!');
    setCurrentRoute('/passport');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header & Safety Warning */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
          <Layers className="w-4 h-4 text-orange-600" />
          <span>مختبر التصميم الهندسي • 7 مراحل متتابعة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          أنتِ الآن مهندسة طاقة: صممي واختبري بطاريتكِ
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          تبعي مراحل التصميم الهندسي السبع لحل مشكلة انقطاع الكهرباء، وسجلي قراءاتكِ الفعلية وحسّني الأداء.
        </p>

        {/* Safety notice */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-rose-900 text-xs font-medium">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>تنبيه سلامة هام: تُنفَّذ التجربة بإشراف المعلمة وبمواد آمنة. النموذج يقيس فرق الجهد (الفولت) فقط ما لم يثبت اختبار قدرته الفنية على تشغيل حمل حقيقي.</span>
        </div>

        {/* Stage selector tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: 1, title: '1. تحديد المشكلة' },
            { id: 2, title: '2. اقتراح الحلول' },
            { id: 3, title: '3. رسم المخطط' },
            { id: 4, title: '4. تنفيذ النموذج' },
            { id: 5, title: '5. اختبار وقراءات' },
            { id: 6, title: '6. تحليل النتائج' },
            { id: 7, title: '7. التحسين والتسليم' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeStage === st.id
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {st.title}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Content */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6">
        
        {activeStage === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة الأولى: تحديد وتوصيف المشكلة</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              حددي بوضوح متطلبات طاقة الطوارئ لأجهزة الاستشعار في المنطقة النائية ومعايير نجاح مصدر الطاقة البديل.
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">وصف المشكلة وتحدي الطوارئ:</label>
              <textarea
                rows={4}
                value={groupDesign.problemDefinition}
                onChange={(e) => updateDesignData(groupId, { problemDefinition: e.target.value })}
                className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              ></textarea>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={() => setActiveStage(2)} className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-sky-700 transition">
                التالي: اقتراح الحلول
              </button>
            </div>
          </div>
        )}

        {activeStage === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة الثانية: اقتراح ومقارنة الحلول البديلة</h2>
            <p className="text-xs text-slate-600">اقترحي فكرتين مختلفتين للبطارية وقارني بين إيجابياتهما وسلبياتهما:</p>
            
            <div className="space-y-3">
              {groupDesign.solutions.map((sol: any, i: number) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-sky-700">الخيار {i + 1}: {sol.title}</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-emerald-700 bg-emerald-50 p-2 rounded-xl">الإيجابيات: {sol.pros}</div>
                    <div className="text-rose-700 bg-rose-50 p-2 rounded-xl">السلبيات: {sol.cons}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الحل الهندسي المختار للتنفيذ:</label>
              <input
                type="text"
                value={groupDesign.selectedSolution}
                onChange={(e) => updateDesignData(groupId, { selectedSolution: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setActiveStage(1)} className="border border-slate-200 px-6 py-3 rounded-xl text-xs font-bold">السابق</button>
              <button onClick={() => setActiveStage(3)} className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm">التالي: رسم المخطط</button>
            </div>
          </div>
        )}

        {activeStage === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة الثالثة: رسم التصميم ومكونات الخلية</h2>
            <p className="text-xs text-slate-600">صفي المكونات والأقطاب والمحلول والجسر الملحي للنموذج المقترح:</p>
            <textarea
              rows={4}
              value={groupDesign.designDescription}
              onChange={(e) => updateDesignData(groupId, { designDescription: e.target.value })}
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm"
              placeholder="اكتبي وصفاً تفصيلياً للمكونات والأقطاب..."
            ></textarea>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setActiveStage(2)} className="border border-slate-200 px-6 py-3 rounded-xl text-xs font-bold">السابق</button>
              <button onClick={() => setActiveStage(4)} className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm">التالي: تنفيذ النموذج</button>
            </div>
          </div>
        )}

        {activeStage === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة الرابعة: تنفيذ النموذج العملي</h2>
            <p className="text-xs text-slate-600">سجلي خطوات بناء وتجميع النموذج العملي في المختبر:</p>
            <div className="space-y-2">
              {groupDesign.prototypeSteps.map((step: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-orange-600">خطوة {idx + 1}:</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setActiveStage(3)} className="border border-slate-200 px-6 py-3 rounded-xl text-xs font-bold">السابق</button>
              <button onClick={() => setActiveStage(5)} className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm">التالي: اختبار البطارية</button>
            </div>
          </div>
        )}

        {activeStage === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة الخامسة: اختبار البطارية وسجل القراءات</h2>
            <p className="text-xs text-slate-600">سجلي قراءات الفولت للنموذج تحت ظروف مختلفة:</p>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-3">القطب 1 (المصعد)</th>
                    <th className="p-3">القطب 2 (المهبط)</th>
                    <th className="p-3">المحلول الإلكتروليتي</th>
                    <th className="p-3">مساحة الأقطاب</th>
                    <th className="p-3">الجهد (V)</th>
                    <th className="p-3">ملاحظات</th>
                    <th className="p-3">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {groupDesign.readings.map((r: any) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-3 font-medium">{r.metal1}</td>
                      <td className="p-3 font-medium">{r.metal2}</td>
                      <td className="p-3">{r.solution}</td>
                      <td className="p-3">{r.electrodesArea}</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">{r.voltage} V</td>
                      <td className="p-3 text-slate-500">{r.notes}</td>
                      <td className="p-3">
                        <button onClick={() => handleDeleteReading(r.id)} className="text-rose-600 hover:text-rose-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add new reading form */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-4">
              <h3 className="text-xs font-bold text-sky-900">إضافة قراءة تجريبية جديدة</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="المصعد"
                  value={newReading.metal1}
                  onChange={(e) => setNewReading({ ...newReading, metal1: e.target.value })}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white"
                />
                <input
                  type="text"
                  placeholder="المهبط"
                  value={newReading.metal2}
                  onChange={(e) => setNewReading({ ...newReading, metal2: e.target.value })}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="الفولت (V)"
                  value={newReading.voltage}
                  onChange={(e) => setNewReading({ ...newReading, voltage: parseFloat(e.target.value) || 0 })}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                />
                <button
                  onClick={handleAddReading}
                  className="bg-sky-600 text-white rounded-xl font-bold flex items-center justify-center gap-1 shadow-md hover:bg-sky-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setActiveStage(4)} className="border border-slate-200 px-6 py-3 rounded-xl text-xs font-bold">السابق</button>
              <button onClick={() => setActiveStage(6)} className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm">التالي: تحليل النتائج</button>
            </div>
          </div>
        )}

        {activeStage === 6 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة السادسة: تحليل النتائج وتفسيرها</h2>
            <p className="text-xs text-slate-600">كيف تفسرين قراءات الفولت المسجلة مقارنة بالقيم النظرية لخلية دانيال؟</p>
            <textarea
              rows={4}
              value={groupDesign.analysisAnswers.q1 || ''}
              onChange={(e) => updateDesignData(groupId, { analysisAnswers: { ...groupDesign.analysisAnswers, q1: e.target.value } })}
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm"
              placeholder="اكتبي تحليلكِ العلمي للنتائج..."
            ></textarea>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setActiveStage(5)} className="border border-slate-200 px-6 py-3 rounded-xl text-xs font-bold">السابق</button>
              <button onClick={() => setActiveStage(7)} className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm">التالي: التحسين والتسليم</button>
            </div>
          </div>
        )}

        {activeStage === 7 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">المرحلة السابعة: تحسين التصميم والتسليم النهائي</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التعديلات والتحسينات المقترحة لرفع كفاءة البطارية:</label>
                <textarea
                  rows={3}
                  value={groupDesign.improvements}
                  onChange={(e) => updateDesignData(groupId, { improvements: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                ></textarea>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h3 className="text-xs font-bold text-emerald-900">قراءة الجهد النهائي بعد التطوير:</h3>
                <input
                  type="number"
                  step="0.01"
                  value={groupDesign.finalVoltage}
                  onChange={(e) => updateDesignData(groupId, { finalVoltage: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3 rounded-xl border border-emerald-300 font-mono text-lg font-bold bg-white text-emerald-700"
                />
              </div>

              {groupDesign.submitted ? (
                <div className="p-4 rounded-2xl bg-sky-50 text-sky-900 text-center font-bold text-sm">
                  تم تسليم الابتكار الهندسي بنجاح!
                </div>
              ) : (
                <button
                  onClick={handleFinalSubmit}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-base shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  <span>تسليم الابتكار الهندسي رسمياً</span>
                </button>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 italic">
                «الابتكار لا يبدأ بإجابة جاهزة، بل بسؤال جيد وتجربة وقياس وتحسين.»
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
