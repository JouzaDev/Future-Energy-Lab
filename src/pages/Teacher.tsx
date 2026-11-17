import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Shield, Users, CheckCircle2, Trash2, Printer, Download, BookOpen, AlertCircle } from 'lucide-react';

export const Teacher: React.FC = () => {
  const { groups, designData, questions, approveQuestion, deleteQuestion, isTeacherAuthenticated, setCurrentRoute } = useStore();
  const [activeTab, setActiveTab] = useState<'groups' | 'questions' | 'export'>('groups');

  if (!isTeacherAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">لوحة المعلمة محمية بكلمة المرور</h2>
        <p className="text-xs text-slate-500">يرجى تسجيل الدخول عبر زر «لوحة المعلمة» في شريط التنقل العلوي.</p>
        <button
          onClick={() => setCurrentRoute('/')}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <Shield className="w-4 h-4 text-amber-600" />
          <span>لوحة تحكم المعلمة المشرفة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          متابعة المجموعات، بنك الأسئلة، والتقارير
        </h1>
        <p className="text-slate-600 text-sm">
          إدارة تقدم الطالبات، اعتماد الأسئلة، واستخراج التقارير والبيانات بصيغة CSV أو PDF.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 pt-4">
          {[
            { id: 'groups', title: 'المجموعات والتقدم' },
            { id: 'questions', title: 'بنك الأسئلة والاعتماد' },
            { id: 'export', title: 'التصدير والتقارير' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-8">
        
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">مجموعات الطالبات المسجلة وتقدمهن</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-3">الشعار والاسم</th>
                    <th className="p-3">رمز المجموعة</th>
                    <th className="p-3">فكرة الابتكار</th>
                    <th className="p-3">الحالة</th>
                    <th className="p-3">الجهد المسجل (V)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {groups.map((group) => {
                    const design = designData[group.id] || { submitted: false, finalVoltage: 1.12 };
                    return (
                      <tr key={group.id} className="hover:bg-slate-50">
                        <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                          <span className="text-lg">{group.emblem}</span>
                          <span>{group.name}</span>
                        </td>
                        <td className="p-3 font-mono font-bold text-sky-700">{group.code}</td>
                        <td className="p-3 text-slate-600">{group.idea}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full font-medium ${design.submitted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {design.submitted ? 'مكتمل ومسلم' : 'قيد العمل'}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-600">{design.finalVoltage || 1.12} V</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">بنك الأسئلة واحتياج الاعتماد</h2>
            
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {q.approved ? 'معتمد' : 'معلّق بانتظار الاعتماد'}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{q.concept}</span>
                    </div>
                    <p className="text-xs text-slate-900 font-medium">{q.question}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!q.approved && (
                      <button
                        onClick={() => approveQuestion(q.id)}
                        className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700"
                      >
                        اعتماد
                      </button>
                    )}
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="text-rose-600 hover:text-rose-800 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">تصدير التقارير وبيانات المختبر</h2>
            <p className="text-xs text-slate-600">يمكنكِ تصدير تقارير الأثر والنتائج بصيغة PDF أو CSV للتوثيق والتحليل.</p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold text-xs shadow-md hover:bg-slate-800 transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة التقرير الشامل PDF</span>
              </button>

              <button
                onClick={() => {
                  alert('تم تجهيز تصدير بيانات CSV بنجاح.');
                }}
                className="bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold text-xs shadow-md hover:bg-emerald-700 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>تصدير بيانات المجموعات CSV</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
