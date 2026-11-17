import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Shield, User, Key, Sparkles, AlertCircle, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

export const Gate: React.FC = () => {
  const { groups, activeGroup, registerGroup, loginGroup, setCurrentRoute } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login state
  const [loginCode, setLoginCode] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regCode, setRegCode] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmblem, setRegEmblem] = useState('⚡');
  const [regIdea, setRegIdea] = useState('');
  const [regError, setRegError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginCode || !loginPin) {
      setLoginError('يرجى إدخال رمز المجموعة ورمز PIN.');
      return;
    }
    const success = loginGroup(loginCode, loginPin);
    if (success) {
      setLoginError('');
      setCurrentRoute('/objectives');
    } else {
      setLoginError('رمز المجموعة أو رمز PIN غير صحيح. تأكدي من البيانات أو قومي بإنشاء مجموعة جديدة.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regCode || !regPin || !regName || !regIdea) {
      setRegError('يرجى تعبئة جميع الحقول الإجبارية (رمز المجموعة، PIN، اسم المجموعة، فكرة التصميم).');
      return;
    }
    if (regPin.length !== 4) {
      setRegError('رمز PIN يجب أن يكون من 4 أرقام.');
      return;
    }
    registerGroup(regCode, regPin, regName, regEmblem, regIdea);
    setRegError('');
    setCurrentRoute('/objectives');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Scenario Card */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -z-0"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>سيناريو التحدي الميداني</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              انقطاع الكهرباء في المنطقة النائية
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              في ليلة شتوية باردة، انقطعت شبكة الكهرباء الرئيسية عن مركز رعاية صحية في منطقة جبلية نائية. أجهزة استشعار طوارئ الحيوية مهددة بالتوقف خلال ساعات. أنتِ مهندسة طاقة المستقبل، ومطلوب منكِ وفريقكِ تصميم مصدر طاقة كهربائي صغير وآمن يحول الطاقة الكيميائية إلى كهربائية بكفاءة عالية لإنقاذ الموقف!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-sky-300">
              <div className="flex items-center gap-1.5 bg-sky-950/60 px-3 py-1.5 rounded-lg border border-sky-800">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>المادة: كيمياء 3 - الصف الثالث الثانوي</span>
              </div>
              <div className="flex items-center gap-1.5 bg-sky-950/60 px-3 py-1.5 rounded-lg border border-sky-800">
                <span>المعايير: متوافق مع NGSS (HS-PS3-3)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Group Status if logged in */}
        {activeGroup && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-md">
                {activeGroup.emblem}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 block">أنتِ مسجلة حالياً ضمن:</span>
                <h3 className="text-lg font-bold text-slate-900">{activeGroup.name}</h3>
                <p className="text-xs text-slate-600">رمز المجموعة: <span className="font-mono font-bold">{activeGroup.code}</span> • الفكرة: {activeGroup.idea}</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentRoute('/objectives')}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition whitespace-nowrap"
            >
              <span>تابعي الرحلة للأهداف</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Login / Register Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 pb-4 text-center font-bold text-sm transition-colors border-b-2 ${
                mode === 'login' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              دخول مجموعة مسجلة مسبقاً
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 pb-4 text-center font-bold text-sm transition-colors border-b-2 ${
                mode === 'register' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              تسجيل فريق جديد
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رمز المجموعة (مثل: SOLAR27)</label>
                <div className="relative">
                  <User className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={loginCode}
                    onChange={(e) => setLoginCode(e.target.value)}
                    placeholder="أدخلي رمز المجموعة"
                    className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رمز الدخول السري (PIN من 4 أرقام)</label>
                <div className="relative">
                  <Key className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    maxLength={4}
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    placeholder="••••"
                    className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-mono tracking-widest"
                  />
                </div>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-sky-700 transition"
              >
                تسجيل الدخول ومتابعة التحدي
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">المجموعات التجريبية المتاحة: رمز <span className="font-mono font-bold text-slate-700">SOLAR27</span> برمز PIN <span className="font-mono font-bold text-slate-700">1234</span></p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رمز المجموعة (بالإنجليزية)</label>
                  <input
                    type="text"
                    value={regCode}
                    onChange={(e) => setRegCode(e.target.value)}
                    placeholder="مثال: VOLT27"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رمز PIN (4 أرقام سرية)</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    placeholder="1234"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden font-mono tracking-widest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الفريق (الأسماء الأولى لطالبات المجموعة)</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="مثال: فريق سارة ونورة"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شعار الفريق (رمز تعبيري)</label>
                  <select
                    value={regEmblem}
                    onChange={(e) => setRegEmblem(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    <option value="⚡">⚡ صاعقة</option>
                    <option value="🔋">🔋 بطارية</option>
                    <option value="💡">💡 مصباح</option>
                    <option value="⚙️">⚙️ ترس</option>
                    <option value="🌟">🌟 نجمة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">فكرة التصميم المبدئية لبطارية الطوارئ</label>
                <textarea
                  rows={2}
                  value={regIdea}
                  onChange={(e) => setRegIdea(e.target.value)}
                  placeholder="اكتبي باختصار فكرة مصدر الطاقة الذي ستصممينه..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                ></textarea>
              </div>

              {regError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:opacity-95 transition"
              >
                إنشاء الفريق وبدء الرحلة الهندسية
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
