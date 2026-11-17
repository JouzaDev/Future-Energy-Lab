import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { BatteryCharging, Shield, User, Menu, X, Award, BookOpen, Atom, Cpu, Bot, CheckCircle2, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, setCurrentRoute, activeGroup, setActiveGroup, isTeacherAuthenticated, setTeacherAuthenticated } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherError, setTeacherError] = useState(false);

  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: BatteryCharging },
    { path: '/gate', label: 'بوابة التحدي', icon: Shield },
    { path: '/objectives', label: 'الأهداف', icon: BookOpen },
    { path: '/explore', label: 'الاستكشاف', icon: Atom },
    { path: '/simulation', label: 'المحاكاة', icon: Cpu },
    { path: '/design', label: 'التصميم الهندسي', icon: Layers },
    { path: '/assistant', label: 'المساعد الذكي', icon: Bot },
    { path: '/assess', label: 'التقييم', icon: CheckCircle2 },
    { path: '/passport', label: 'الجواز', icon: Award },
    { path: '/gallery', label: 'المعرض', icon: Shield },
  ];

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherPassword === 'teacher2027' || teacherPassword === '1234') {
      setTeacherAuthenticated(true);
      setTeacherModalOpen(false);
      setTeacherPassword('');
      setTeacherError(false);
      setCurrentRoute('/teacher');
    } else {
      setTeacherError(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text element wordmark */}
            <div 
              onClick={() => setCurrentRoute('/')}
              className="flex items-center gap-3 cursor-pointer shrink-0 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <BatteryCharging className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block group-hover:text-sky-600 transition-colors">
                  مختبر طاقة المستقبل
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  كيمياء 3 • مسابقة المعلم المبتكر 2027
                </span>
              </div>
            </div>

            {/* Zone 2: Navigation links */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600 overflow-x-auto py-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentRoute === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => setCurrentRoute(link.path)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 font-semibold shadow-xs'
                        : 'hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {activeGroup ? (
                <div 
                  onClick={() => setCurrentRoute('/passport')}
                  className="flex items-center gap-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-sky-100 transition shadow-xs"
                  title="الجواز الرقمي للمجموعة"
                >
                  <span className="text-lg">{activeGroup.emblem}</span>
                  <div className="text-right">
                    <div className="text-xs font-bold text-sky-900 truncate max-w-[100px]">{activeGroup.name}</div>
                    <div className="text-[10px] text-sky-600">رمز: {activeGroup.code}</div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentRoute('/gate')}
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-95 transition whitespace-nowrap shrink-0"
                >
                  <User className="w-4 h-4" />
                  <span>دخول الفريق</span>
                </button>
              )}

              {/* Teacher Button */}
              <button
                onClick={() => {
                  if (isTeacherAuthenticated) {
                    setCurrentRoute('/teacher');
                  } else {
                    setTeacherModalOpen(true);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                  isTeacherAuthenticated
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">لوحة المعلمة</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentRoute === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      setCurrentRoute(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 font-bold'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sky-600" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
            {!activeGroup && (
              <button
                onClick={() => {
                  setCurrentRoute('/gate');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-xl text-sm font-bold shadow-md"
              >
                <User className="w-4 h-4" />
                <span>دخول الفريق (رمز المجموعة + PIN)</span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* Teacher Authentication Modal */}
      {teacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">لوحة المعلمة المشرفة</h3>
                  <p className="text-xs text-slate-500">أدخلي كلمة المرور الخاصة بالمعلمة للوصول</p>
                </div>
              </div>
              <button
                onClick={() => setTeacherModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">كلمة مرور المعلمة</label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="أدخلي كلمة المرور (افتراضي: 1234 أو teacher2027)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  autoFocus
                />
                {teacherError && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">كلمة المرور غير صحيحة. جربي (1234).</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTeacherModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-amber-600 text-white text-sm font-bold shadow-md hover:bg-amber-700 transition"
                >
                  دخول اللوحة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
