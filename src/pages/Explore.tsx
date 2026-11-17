import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Atom, CheckCircle2, ArrowLeft, RefreshCw, Zap, Shield, Award, HelpCircle } from 'lucide-react';

export const Explore: React.FC = () => {
  const { activeGroup, exploreProgress, completeStation, setCurrentRoute } = useStore();
  const groupId = activeGroup?.id || 'demo-group';
  const progress = exploreProgress[groupId] || {
    station1Completed: false,
    station2Completed: false,
    station3Completed: false,
    station4Completed: false,
    station5Completed: false,
  };

  const [activeStation, setActiveStation] = useState<number>(() => {
    if (!progress.station1Completed) return 1;
    if (!progress.station2Completed) return 2;
    if (!progress.station3Completed) return 3;
    if (!progress.station4Completed) return 4;
    return 5;
  });

  // Station 1 State: Battery classification
  const [batteries, setBatteries] = useState([
    { id: 1, name: 'بطارية الزنك-كربون (الراديو القديم)', type: 'primary', sorted: null as string | null },
    { id: 2, name: 'بطارية قلوية (Alkaline AA)', type: 'primary', sorted: null as string | null },
    { id: 3, name: 'بطارية زر الليثيوم (ساعة اليد)', type: 'primary', sorted: null as string | null },
    { id: 4, name: 'بطارية أيون الليثيوم (الهاتف المحمول)', type: 'secondary', sorted: null as string | null },
    { id: 5, name: 'بطارية الرصاص-الحمض (السيارة)', type: 'secondary', sorted: null as string | null },
    { id: 6, name: 'بطارية نيكل-هيدريد المعدن (NiMH)', type: 'secondary', sorted: null as string | null },
  ]);
  const [station1Msg, setStation1Msg] = useState('');

  const sortBattery = (id: number, classification: 'primary' | 'secondary') => {
    setBatteries(batteries.map(b => b.id === id ? { ...b, sorted: classification } : b));
  };

  const checkStation1 = () => {
    const allSorted = batteries.every(b => b.sorted !== null);
    if (!allSorted) {
      setStation1Msg('يرجى تصنيف جميع البطاريات قبل التحقق.');
      return;
    }
    const correct = batteries.every(b => b.sorted === b.type);
    if (correct) {
      setStation1Msg('ممتاز! تم التصنيف بنجاح. تذكري: ليست كل بطاريات الليثيوم قابلة للشحن (فبطاريات زر الليثيوم أولية غير قابلة للشحن).');
      completeStation(groupId, 1);
    } else {
      setStation1Msg('هناك بعض الأخطاء في التصنيف. راجعي الفرق بين البطاريات الأولية (تستنفد ولا تُشحن) والثانوية (قابلة لإعادة الشحن).');
    }
  };

  // Station 2 State: Anatomy clicks
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const anatomyParts: { [key: string]: { title: string; desc: string } } = {
    anode: { title: 'المصعد (Anode - القطب السالب)', desc: 'القطب الذي تحدث عنده عملية الأكسدة (فقد إلكترونات)، مثل قطب الخارصين Zn في خلية دانيال.' },
    cathode: { title: 'المهبط (Cathode - القطب الموجب)', desc: 'القطب الذي تحدث عنده عملية الاختزال (اكتساب إلكترونات)، مثل قطب النحاس Cu في خلية دانيال.' },
    saltBridge: { title: 'الجسر الملحي (Salt Bridge)', desc: 'أنبوب يحتوي على محلول إلكتروليتي يحفظ التعادل الكهربائي بين نصفي الخلية بمنع تراكم الشحنات.' },
    circuit: { title: 'الدائرة الخارجية (External Circuit)', desc: 'المسار الذي تنتقل عبره الإلكترونات من المصعد إلى المهبط لتوليد التيار الكهربائي.' }
  };

  // Station 4 State: Junior Scientist Quiz
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const quizQuestions = [
    {
      id: 1,
      q: 'لماذا تنتقل الإلكترونات في الدائرة الخارجية من الخارصين إلى النحاس؟',
      options: ['لأن الخارصين أعلى ميلاً لفقد الإلكترونات (جهد أكسدة أعلى)', 'لأن النحاس أبرد', 'لأن الجسر الملحي يدفعها'],
      correct: 0
    },
    {
      id: 2,
      q: 'ماذا يحدث لتركيز أيونات الخارصين Zn²⁺ في نصف خلوة المصعد بمرور الوقت؟',
      options: ['ينقص', 'يزداد بسبب استمرار عملية أكسدة قطب الخارصين', 'يبقى ثابتاً تماماً'],
      correct: 1
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header & Progress */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Atom className="w-4 h-4 text-emerald-600" />
          <span>مختبر الاستكشاف العلمي • 5 محطات متسلسلة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          استكشاف أسرار البطاريات والخلايا الجلفانية
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          أنجزي المحطات بترتيبها. المحطة التالية لا تُفتح حتى تكملي المحطة الحالية.
        </p>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {[1, 2, 3, 4, 5].map((num) => {
            const isCompleted = (progress as any)[`station${num}Completed`];
            const isCurrent = activeStation === num;
            return (
              <div
                key={num}
                onClick={() => {
                  if (num === 1 || (num === 2 && progress.station1Completed) || (num === 3 && progress.station2Completed) || (num === 4 && progress.station3Completed) || (num === 5 && progress.station4Completed)) {
                    setActiveStation(num);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                <span>محطة {num}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
        
        {/* STATION 1 */}
        {activeStation === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600">المحطة الأولى</span>
                <h2 className="text-2xl font-bold text-slate-900">تصنيف البطاريات: أولية أم ثانوية؟</h2>
              </div>
              <span className="text-xs font-medium text-slate-500">صنفي كل بطارية ثم اضغطي تحقق</span>
            </div>

            <p className="text-xs text-slate-600">
              البطاريات الأولية (Primary) تفاعلاتها غير انعكاسية ولا يمكن إعادة شحنها. البطاريات الثانوية (Secondary) تفاعلاتها انعكاسية وقابلة لإعادة الشحن.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batteries.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-3">
                  <span className="text-sm font-bold text-slate-900">{b.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => sortBattery(b.id, 'primary')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        b.sorted === 'primary' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      أولية (غير قابلة للشحن)
                    </button>
                    <button
                      onClick={() => sortBattery(b.id, 'secondary')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        b.sorted === 'secondary' ? 'bg-orange-500 text-white shadow-xs' : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      ثانوية (قابلة للشحن)
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {station1Msg && (
              <div className="p-4 rounded-xl bg-sky-50 text-sky-900 text-xs font-medium border border-sky-200">
                {station1Msg}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={checkStation1}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition"
              >
                تحقق من التصنيف
              </button>
              {progress.station1Completed && (
                <button
                  onClick={() => setActiveStation(2)}
                  className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-sky-700 transition flex items-center gap-2"
                >
                  <span>انتقلي للمحطة الثانية</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STATION 2 */}
        {activeStation === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600">المحطة الثانية</span>
                <h2 className="text-2xl font-bold text-slate-900">تشريح الخلية الجلفانية (انقري على الأجزاء)</h2>
              </div>
              <span className="text-xs font-medium text-slate-500">استكشفي وظيفة كل مكون</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Interactive SVG Diagram */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col items-center justify-center relative shadow-inner aspect-video">
                <div className="text-xs font-bold text-slate-400 mb-4">مخطط الخلية الجلفانية التفاعلي</div>
                
                <div className="flex items-center justify-center gap-8 w-full">
                  <button
                    onClick={() => setSelectedPart('anode')}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition ${
                      selectedPart === 'anode' ? 'bg-sky-500 border-sky-400 text-white scale-105' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    قطب المصعد (Zn)
                  </button>

                  <button
                    onClick={() => setSelectedPart('saltBridge')}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition ${
                      selectedPart === 'saltBridge' ? 'bg-amber-500 border-amber-400 text-white scale-105' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    الجسر الملحي
                  </button>

                  <button
                    onClick={() => setSelectedPart('cathode')}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold transition ${
                      selectedPart === 'cathode' ? 'bg-orange-500 border-orange-400 text-white scale-105' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    قطب المهبط (Cu)
                  </button>
                </div>

                <button
                  onClick={() => setSelectedPart('circuit')}
                  className={`mt-4 px-6 py-2 rounded-xl border text-xs font-bold transition ${
                    selectedPart === 'circuit' ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  الدائرة الخارجية وإسقاط الفولتميتر
                </button>
              </div>

              {/* Part description */}
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 space-y-3">
                {selectedPart ? (
                  <>
                    <h3 className="text-lg font-bold text-sky-900">{anatomyParts[selectedPart].title}</h3>
                    <p className="text-sm text-sky-800 leading-relaxed">{anatomyParts[selectedPart].desc}</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-600 text-center py-6">انقري على أي جزء من أجزاء الخلية في المخطط المجاور لتظهر لكِ وظيفتها العلمية بالتفصيل.</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  completeStation(groupId, 2);
                  setActiveStation(3);
                }}
                className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-sky-700 transition flex items-center gap-2"
              >
                <span>أتممت الاستكشاف والانتقال للمحطة الثالثة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STATION 3 */}
        {activeStation === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600">المحطة الثالثة</span>
                <h2 className="text-2xl font-bold text-slate-900">خلية دانيال: المعادلات وحركة الأيونات</h2>
              </div>
              <span className="text-xs font-medium text-slate-500">أكسدة واختزال</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
                <h3 className="text-base font-bold text-sky-900">تفاعل المصعد (الأكسدة - فقد إلكترونات)</h3>
                <div className="p-3 bg-white rounded-xl font-mono text-center font-bold text-slate-800 shadow-inner">
                  Zn(s) → Zn²⁺(aq) + 2e⁻
                </div>
                <p className="text-xs text-sky-800">يتاكل قطب الخارصين وتتحول ذراته إلى أيونات موجبة تذوب في المحلول وتصعد الإلكترونات للدائرة الخارجية.</p>
              </div>

              <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200 space-y-3">
                <h3 className="text-base font-bold text-orange-900">تفاعل المهبط (الاختزال - اكتساب إلكترونات)</h3>
                <div className="p-3 bg-white rounded-xl font-mono text-center font-bold text-slate-800 shadow-inner">
                  Cu²⁺(aq) + 2e⁻ → Cu(s)
                </div>
                <p className="text-xs text-orange-800">تكتسب أيونات النحاس في المحلول الإلكترونات وتترسب كذرات نحاس صلبة على قطب النحاس.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
              <h4 className="text-sm font-bold text-amber-400">دور الجسر الملحي في حركة الأيونات</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                تتحرك الأيونات السالبة (الأنيونات مثل SO₄²⁻) نحو نصف خلية المصعد لمعادلة زيادة الشحنة الموجبة، بينما تتحرك الأيونات الموجبة (الكاتيونات مثل K⁺) نحو نصف خلية المهبط لمعادلة نقص الشحنة الموجبة.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  completeStation(groupId, 3);
                  setActiveStation(4);
                }}
                className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-sky-700 transition flex items-center gap-2"
              >
                <span>أتممت المحطة الثالثة والانتقال للمحطة الرابعة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STATION 4 */}
        {activeStation === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600">المحطة الرابعة</span>
                <h2 className="text-2xl font-bold text-slate-900">تحدي العالمة الصغيرة (أسئلة استقصائية فصيحة)</h2>
              </div>
              <span className="text-xs font-medium text-slate-500">تقييم الفهم الفوري</span>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((qq) => (
                <div key={qq.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">{qq.q}</h3>
                  <div className="space-y-2">
                    {qq.options.map((opt, oIdx) => (
                      <label
                        key={oIdx}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          quizAnswers[qq.id] === oIdx
                            ? oIdx === qq.correct
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${qq.id}`}
                          checked={quizAnswers[qq.id] === oIdx}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [qq.id]: oIdx })}
                          className="text-sky-600"
                        />
                        <span className="text-xs">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  const correctAll = quizQuestions.every(q => quizAnswers[q.id] === q.correct);
                  if (correctAll || Object.keys(quizAnswers).length >= 2) {
                    completeStation(groupId, 4);
                    setActiveStation(5);
                  } else {
                    alert('يرجى الإجابة عن جميع الأسئلة.');
                  }
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition"
              >
                تحقق والانتقال للمحطة الأخيرة
              </button>
            </div>
          </div>
        )}

        {/* STATION 5 */}
        {activeStation === 5 && (
          <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">أتممتِ محطات الاستكشاف بنجاح باهر!</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                لقد استكشفتِ تصنيف البطاريات وأجزاء الخلية ومعادلات دانيال ودور الجسر الملحي. أنتِ الآن جاهزة تماماً للانتقال إلى «مختبر التصميم الهندسي».
              </p>
            </div>

            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentRoute('/simulation')}
                className="bg-white border border-slate-300 text-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-100 transition shadow-xs flex items-center gap-2"
              >
                <Atom className="w-4 h-4 text-sky-600" />
                <span>تجربة المحاكاة التفاعلية لخلية دانيال</span>
              </button>

              <button
                onClick={() => setCurrentRoute('/design')}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:opacity-95 transition flex items-center gap-2"
              >
                <span>انتقلي إلى مختبر التصميم الهندسي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
