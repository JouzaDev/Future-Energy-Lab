import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Bot, Send, Sparkles, User, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';

export const Assistant: React.FC = () => {
  const { assistantLogs, addAssistantLog } = useStore();
  const [mode, setMode] = useState<string>('المرشد الكيميائي');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'أهلاً بكِ أيتها المهندسة المبدعة! أنا مساعد طاقة المستقبل، خبيرة الكيمياء والبطاريات. كيف يمكنني إرشادكِ في رحلتكِ الاستقصائية اليوم؟\n\nالذكاء الاصطناعي لا يفكر بدلًا منكِ، بل يساعدكِ على التفكير بصورة أعمق.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'لماذا تنتقل الإلكترونات من الزنك إلى النحاس؟',
    'ما الفرق الأساسي بين المصعد والمهبط؟',
    'ماذا لو أزلنا الجسر الملحي أثناء تشغيل الخلية؟',
    'لماذا تختلف القراءات أحياناً بين المجموعات؟',
    'كيف أطور تصميم بطاريتي لرفع الجهد؟',
    'كيف أفسر نتائجي التجريبية علمياً؟'
  ];

  const handleSendMessage = async (query?: string) => {
    const textToSend = query || inputMessage;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, mode })
      });
      const data = await res.json();
      
      const reply = data.reply || data.error || 'عذراً، حدث خطأ في استجابة المساعد.';
      setMessages([...newMessages, { sender: 'assistant', text: reply }]);
      
      addAssistantLog({
        topic: mode,
        question: textToSend,
        answer: reply
      });
    } catch (e) {
      setMessages([...newMessages, { sender: 'assistant', text: 'تعذر الاتصال بخدمة الذكاء الاصطناعي. تأكدي من إعداد مفتاح GEMINI_API_KEY في خادم التطبيق.\n\nالذكاء الاصطناعي لا يفكر بدلًا منكِ، بل يساعدكِ على التفكير بصورة أعمق.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
          <Bot className="w-4 h-4 text-purple-600" />
          <span>مساعد طاقة المستقبل الذكي</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          استشيري مهندسة طاقة المستقبل
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          مرشدكِ الذكي لتفسير التفاعلات، حل المشكلات، وتطوير التصميم الهندسي.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar settings & suggestions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">اختاري وضع المساعد:</h3>
            <div className="space-y-2">
              {['المرشد الكيميائي', 'مهندس البطاريات', 'محلل النتائج', 'مدرب الابتكار'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`w-full text-right px-4 py-3 rounded-xl text-xs font-bold transition ${
                    mode === m
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">أسئلة مقترحة للاستشارة:</h3>
            <div className="space-y-2">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-right p-3 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-900 text-xs text-slate-700 transition border border-slate-100"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat UI */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[650px]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50 rounded-t-3xl">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">مهندسة طاقة المستقبل ({mode})</h3>
              <p className="text-[10px] text-emerald-600">نشطة • توجيه استقصائي آمن</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-xl ${msg.sender === 'user' ? 'mr-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-purple-100 text-purple-700'}`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-white rounded-tl-xs'
                    : 'bg-slate-100 text-slate-800 rounded-tr-xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 items-center text-xs text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                <span>جاري إعداد الرد الاستقصائي...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-slate-100 bg-white rounded-b-3xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اكتبي سؤالكِ للمساعد الذكي هنا..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md hover:bg-purple-700 transition flex items-center gap-1"
              >
                <span>إرسال</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
