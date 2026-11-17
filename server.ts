/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  // Initialize Gemini AI client if key exists
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (e) {
      console.error('Failed to initialize GoogleGenAI:', e);
    }
  }

  // API Route for AI Assistant (Future Energy Lab - Energy Engineer / Chemistry Expert)
  app.post('/api/assistant', async (req, res) => {
    try {
      const { message, mode, history } = req.body;

      if (!ai) {
        return res.status(503).json({
          error: 'هذه الخدمة تحتاج إلى إعداد وربط بخدمة ذكاء اصطناعي (مفتاح GEMINI_API_KEY غير متوفر).',
          offlineFallback: true
        });
      }

      let systemInstruction = `أنتِ "مهندسة طاقة المستقبل"، خبيرة كيمياء ومعلمة ذكية مساعدة للطالبات في الصف الثالث الثانوي (مادة الكيمياء 3، درس البطاريات، مسابقة المعلم المبتكر 2027، متوافق مع معايير NGSS).
شعار المنصة: "من تفاعل كيميائي صغير… تنطلق طاقة تصنع المستقبل."
أسلوبك: فصحى مبسطة تناسب طالبات الثانوية. إجاباتك دقيقة علمياً، تبدأ بأسئلة توجيهية استقصائية ولا تعطي الحل النهائي مباشرة، تشجعين الطالبة على التفسير بنفسها، تميزين بين المعلومة العلمية والافتراض والتجربة، لا تخترعين قراءات، ولا تدّعين أن نموذجها البسيط يشغّل جهازاً دون اختبار.
تختمين كل إجابة رئيسية بالعبارة الثابتة الحرفية: "الذكاء الاصطناعي لا يفكر بدلًا منكِ، بل يساعدكِ على التفكير بصورة أعمق."

الوضع الحالي للمحادثة: ${mode || 'المرشد الكيميائي'}`;

      const chat = ai.chats.create({
        model: 'gemini-3.1-flash-lite',
        config: {
          systemInstruction,
        },
      });

      // If history is provided, we can simulate or pass messages
      // For simplicity, we send the current message
      const response = await chat.sendMessage({
        message: message || 'مرحباً، أرجو إرشادي في تصميم البطارية.',
      });

      let text = response.text || '';
      
      // Ensure the closing tagline is present if missing
      const tagline = 'الذكاء الاصطناعي لا يفكر بدلًا منكِ، بل يساعدكِ على التفكير بصورة أعمق.';
      if (!text.includes('الذكاء الاصطناعي لا يفكر')) {
        text += '\n\n' + tagline;
      }

      res.json({ reply: text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || 'حدث خطأ في الاتصال بالمساعد الذكي.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Future Energy Lab running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
