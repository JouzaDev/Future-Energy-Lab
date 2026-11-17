import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle2, Award, ArrowLeft, Printer, BarChart3, HelpCircle } from 'lucide-react';

export const Assess: React.FC = () => {
  const { activeGroup, questions, quizResults, saveQuizResult, rubricScores, saveRubricScore, reflections, saveReflection } = useStore();
  const groupId = activeGroup?.id || 'demo-group';

  const [activeSubTab, setActiveSubTab] = useState<'pre' | 'post' | 'rubric' | 'reflection' | 'impact'>('pre');

  // Pre-test state
  const [preAnswers, setPreAnswers] = useState<{ [key: number]: number }>({});
  const [preSubmitted, setPreSubmitted] = useState(false);
  const [preScore, setPreScore] = useState<number | null>(null);

  const approvedQuestions = questions.filter(q => q.approved);

  const handlePreSubmit = () => {
    let score = 0;
    approvedQuestions.forEach(q => {
      if (preAnswers[q.id] === q.correct) score++;
    });
    setPreScore(score);
    setPreSubmitted(true);
    saveQuizResult(groupId, {
      kind: 'pre',
      score,
      total: approvedQuestions.length,
      answers: preAnswers,
      completedAt: new Date().toLocaleDateString('ar-SA')
    });
  };

  // Rubric state
  const currentRubric = rubricScores[groupId] || {
    scientificUnderstanding: 3,
    designCreativity: 3,
    prototypeExecution: 3,
    testingAndAnalysis: 3,
    improvementAndEvolution: 3,
    teamworkAndPresentation: 3,
    notes: 'أداء ممتاز وتعاون مثمر للفريق.'
  };

  const totalRubricScore = Object.entries(currentRubric)
    .filter(([k]) => k !== 'notes')
    .reduce((acc, [_, v]) => acc + (typeof v === 'number' ? v : 0), 0);

  // Reflection state
  const currentReflection = reflections[groupId] || {
    keyConcept: 'تحويل الطاقة الكيميائية إلى كهربائية',
    biggestChallenge: 'تثبيت الأقطاب في المحلول بدقة',
    howHandled: 'استخدام حاملات أقطاب فلينية ومراجعة المساعد',
    whatToChange: 'زيادة تركيز المحلول الإلكتروليتي',
    aiHelpfulness: 'ساعدني في فهم دور الجسر الملحي بشكل رائع'
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>مركز التقييم وقياس الأثر والتقويم الشامل</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          قياس الفهم، Rubric التقييم، وتأمل التعلم
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          أجري الاختبارات المعرفية، استعرضي درجات Rubric، وقيّمي أثر التعلم.
        </p>

        {/* Sub Navigation */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'pre', title: 'الاختبار القبلي/البعدي' },
            { id: 'rubric', title: 'معايير Rubric (من 24)' },
            { id: 'reflection', title: 'التأمل الذاتي' },
            { id: 'impact', title: 'تقرير أثر التعلم' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeSubTab === tab.id
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-8">
        
        {/* TAB 1: PRE / POST TEST */}
        {activeSubTab === 'pre' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">الاختبار المعرفي (بنك الأسئلة المعتمد)</h2>
                <p className="text-xs text-slate-500">أجبي عن الأسئلة التالية لتقييم فهمكِ لدرس البطاريات.</p>
              </div>
              {preSubmitted && (
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-sm font-bold">
                  النتيجة: {preScore} / {approvedQuestions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {approvedQuestions.map((q, idx) => (
                <div key={q.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded">
                      السؤال {idx + 1} • {q.concept}
                    </span>
                    <span className="text-xs text-slate-500">{q.difficulty}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>

                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <label
                        key={oIdx}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          preAnswers[q.id] === oIdx
                            ? preSubmitted
                              ? oIdx === q.correct
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                : 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                              : 'bg-teal-50 border-teal-300 text-teal-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`assess-q-${q.id}`}
                          disabled={preSubmitted}
                          checked={preAnswers[q.id] === oIdx}
                          onChange={() => setPreAnswers({ ...preAnswers, [q.id]: oIdx })}
                        />
                        <span className="text-xs">{opt}</span>
                      </label>
                    ))}
                  </div>

                  {preSubmitted && (
                    <div className="p-3 rounded-xl bg-teal-50 text-teal-900 text-xs font-medium border border-teal-200">
                      <strong>التفسير العلمي:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!preSubmitted && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handlePreSubmit}
                  className="bg-teal-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-teal-800 transition"
                >
                  إرسال الاختبار وعرض النتيجة
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RUBRIC */}
        {activeSubTab === 'rubric' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">معايير التقييم الأدائي (Rubric)</h2>
                <p className="text-xs text-slate-500">6 معايير أساسية من 4 درجات لكل معيار (المجموع التلقائي من 24).</p>
              </div>
              <div className="bg-amber-100 text-amber-900 px-5 py-2.5 rounded-2xl text-lg font-mono font-black">
                المجموع: {totalRubricScore} / 24
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'scientificUnderstanding', label: '1. الفهم العلمي لتفاعلات الأكسدة والبطاريات' },
                { key: 'designCreativity', label: '2. الإبداع في التصميم الهندسي واختيار الحلول' },
                { key: 'prototypeExecution', label: '3. تنفيذ النموذج العملي وسلامة التركيب' },
                { key: 'testingAndAnalysis', label: '4. دقة الاختبارات وقراءات الفولت وتحليل النتائج' },
                { key: 'improvementAndEvolution', label: '5. التحسين والتطوير بعد التجربة الأولى' },
                { key: 'teamworkAndPresentation', label: '6. العمل الجماعي وتوثيق الابتكار في الجواز والمعرض' },
              ].map((item) => (
                <div key={item.key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                    <span>{item.label}</span>
                    <span className="font-mono text-teal-700">{(currentRubric as any)[item.key]} / 4</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((score) => (
                      <button
                        key={score}
                        onClick={() => saveRubricScore(groupId, { ...currentRubric, [item.key]: score })}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                          (currentRubric as any)[item.key] === score
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        درجة {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REFLECTION */}
        {activeSubTab === 'reflection' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">التأمل الذاتي للمهندسة</h2>
              <p className="text-xs text-slate-500">أجيبي عن الأسئلة الخمسة لتلخيص خبرتكِ في المختبر.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">ما هو أهم مفهوم علمي تعلمتهِ في هذه التجربة؟</label>
                <input
                  type="text"
                  value={currentReflection.keyConcept}
                  onChange={(e) => saveReflection(groupId, { ...currentReflection, keyConcept: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">ما هو أكبر تحدٍ واجهكِ وكيف تعاملتِ معه؟</label>
                <input
                  type="text"
                  value={currentReflection.biggestChallenge}
                  onChange={(e) => saveReflection(groupId, { ...currentReflection, biggestChallenge: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">كيف ساعدكِ المساعد الذكي في رحلتكِ؟</label>
                <input
                  type="text"
                  value={currentReflection.aiHelpfulness}
                  onChange={(e) => saveReflection(groupId, { ...currentReflection, aiHelpfulness: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: IMPACT REPORT */}
        {activeSubTab === 'impact' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">تقرير أثر التعلم (مسودة معتمدة)</h2>
                <p className="text-xs text-slate-500">مؤشر التحسن بناءً على الاختبارات ومعايير Rubric.</p>
              </div>
              <button
                onClick={() => window.print()}
                className="no-print bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة التقرير PDF</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 space-y-4 text-xs">
              <h3 className="text-base font-bold text-teal-900">ملخص قياس الأثر والنمو المعرفي</h3>
              <p className="text-teal-800 leading-relaxed">
                أظهرت النتائج تحسناً ملحوظاً في فهم مفاهيم الأكسدة والاختزال وبناء الخلايا الجلفانية. مجموع درجات Rubric بلغ <strong>{totalRubricScore} من 24</strong>، مما يعكس مستوى أداء هندسي رفيع.
              </p>
              <div className="pt-4 border-t border-teal-200 flex items-center justify-between text-[11px] text-teal-700">
                <span>مسودة معتمدة لقسم الكيمياء • مسابقة المعلم المبتكر 2027</span>
                <span>«نقيس أثر التعلم لنطور التجربة، ونحوّل المعرفة إلى ابتكار.»</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
