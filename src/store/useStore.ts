import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Group, ExploreProgress, DesignStageData, QuizResult, RubricEvaluation, ReflectionData, AssistantLog, QuestionItem } from '../types';

interface AppState {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  
  // Active Group Session
  activeGroup: Group | null;
  setActiveGroup: (group: Group | null) => void;
  groups: Group[];
  registerGroup: (code: string, pin: string, name: string, emblem: string, idea: string) => Group;
  loginGroup: (code: string, pin: string) => boolean;

  // Teacher Mode
  isTeacherAuthenticated: boolean;
  setTeacherAuthenticated: (auth: boolean) => void;

  // Explore Progress
  exploreProgress: { [groupId: string]: ExploreProgress };
  completeStation: (groupId: string, stationNumber: number) => void;

  // Design Lab Data
  designData: { [groupId: string]: DesignStageData };
  updateDesignData: (groupId: string, data: Partial<DesignStageData>) => void;

  // Assessments
  quizResults: { [groupId: string]: QuizResult[] };
  saveQuizResult: (groupId: string, result: QuizResult) => void;

  // Questions Bank
  questions: QuestionItem[];
  addQuestion: (q: Omit<QuestionItem, 'id'>) => void;
  approveQuestion: (id: number) => void;
  deleteQuestion: (id: number) => void;

  // Rubric & Reflection
  rubricScores: { [groupId: string]: RubricEvaluation };
  saveRubricScore: (groupId: string, rubric: RubricEvaluation) => void;

  reflections: { [groupId: string]: ReflectionData };
  saveReflection: (groupId: string, reflection: ReflectionData) => void;

  // Assistant Logs
  assistantLogs: AssistantLog[];
  addAssistantLog: (log: Omit<AssistantLog, 'id' | 'timestamp'>) => void;

  // Gallery Approvals
  toggleGalleryApproval: (groupId: string) => void;

  // Reset demo data
  resetStore: () => void;
}

const defaultQuestions: QuestionItem[] = [
  {
    id: 1,
    concept: 'مفهوم البطارية وتحول الطاقة',
    skill: 'التفكير النقدي',
    difficulty: 'سهل',
    question: 'ما هو التحول الرئيسي للطاقة الذي يحدث داخل البطارية الجلفانية أثناء تفريغها؟',
    options: [
      'من طاقة كهربائية إلى طاقة كيميائية',
      'من طاقة كيميائية إلى طاقة كهربائية',
      'من طاقة حرارية إلى طاقة ضوئية',
      'من طاقة حركية إلى طاقة كهربائية'
    ],
    correct: 1,
    explanation: 'تعتمد البطارية على تفاعلات أكسدة واختزال تلقائية تحول الطاقة الكيميائية المخزنة إلى طاقة كهربائية.',
    approved: true
  },
  {
    id: 2,
    concept: 'المصعد والمهبط والأقطاب',
    skill: 'تحليل البيانات',
    difficulty: 'متوسط',
    question: 'في الخلية الجلفانية، ما العملية التي تحدث عند المصعد (Anode)؟',
    options: [
      'عملية اختزال وفقد إلكترونات',
      'عملية أكسدة واكتساب إلكترونات',
      'عملية أكسدة وفقد إلكترونات',
      'عملية اختزال وترسيب الأيونات'
    ],
    correct: 2,
    explanation: 'المصعد هو القطب السالب الذي تحدث عنده عملية الأكسدة (فقد الإلكترونات).',
    approved: true
  },
  {
    id: 3,
    concept: 'دور الجسر الملحي',
    skill: 'حل المشكلات',
    difficulty: 'متوسط',
    question: 'ما الوظيفة الأساسية للجسر الملحي في الخلية الجلفانية؟',
    options: [
      'توليد الجهد الكهربائي الإضافي',
      'حفظ التوازن الكهربائي للأيونات بين نصفي الخلية',
      'تبريد المحاليل الكيميائية',
      'منع انتقال الإلكترونات في الدائرة الخارجية'
    ],
    correct: 1,
    explanation: 'يعمل الجسر الملحي على إكمال الدائرة الكهربائية ومعادلة الشحنات والأيونات في نصفي الخلية.',
    approved: true
  },
  {
    id: 4,
    concept: 'البطاريات الأولية والثانوية',
    skill: 'التفكير التصميمي',
    difficulty: 'متوسط',
    question: 'أي من البطاريات التالية تُعد بطارية ثانوية (قابلة لإعادة الشحن)؟',
    options: [
      'بطارية الزنك-كربون الأولية',
      'بطارية الليثيوم غير القابلة للشحن',
      'بطارية أيون الليثيوم في الهواتف الذكية',
      'بطارية القلوية (Alkaline)'
    ],
    correct: 2,
    explanation: 'بطارية أيون الليثيوم ثانوية لأن تفاعلاتها الكيميائية قابلة للاسترجاع والانعكاس عند الشحن.',
    approved: true
  },
  {
    id: 5,
    concept: 'خلية دانيال وقيمة الجهد القياسي',
    skill: 'التفكير النقدي',
    difficulty: 'متقدم',
    question: 'كم يبلغ الجهد القياسي النظري لخلية دانيال القياسية عند ظروف 25°م و1 مولار؟',
    options: ['0.76 V', '1.10 V', '0.34 V', '2.00 V'],
    correct: 1,
    explanation: 'جهد خلية دانيال المعيارية يساوي فرق جهد اختزال النحاس (0.34V) ناقص جهد اختزال الزنك (-0.76V) فيساوي 1.10 فولت.',
    approved: true
  }
];

const defaultGroups: Group[] = [
  {
    id: 'grp-1',
    code: 'SOLAR27',
    pin: '1234',
    name: 'فريق صقور الطاقة',
    emblem: '⚡',
    idea: 'تصميم خلية بطارية حمضية بمستخلصات الليمون والنحاس لأجهزة الاستشعار.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'grp-2',
    code: 'VOLT27',
    pin: '5678',
    name: 'مهندسات المستقبل',
    emblem: '🔋',
    idea: 'ابتكار خلية جلفانية مزدوجة الأقطاب لزيادة فولت الطوارئ.',
    createdAt: new Date().toISOString()
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentRoute: '/',
      setCurrentRoute: (route) => set({ currentRoute: route }),

      activeGroup: null,
      setActiveGroup: (group) => set({ activeGroup: group }),
      groups: defaultGroups,

      registerGroup: (code, pin, name, emblem, idea) => {
        const newGroup: Group = {
          id: 'grp-' + Date.now(),
          code: code.trim().toUpperCase(),
          pin,
          name,
          emblem: emblem || '⚡',
          idea,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          groups: [...state.groups, newGroup],
          activeGroup: newGroup
        }));
        return newGroup;
      },

      loginGroup: (code, pin) => {
        const found = get().groups.find(
          (g) => g.code.toUpperCase() === code.trim().toUpperCase() && g.pin === pin
        );
        if (found) {
          set({ activeGroup: found });
          return true;
        }
        return false;
      },

      isTeacherAuthenticated: false,
      setTeacherAuthenticated: (auth) => set({ isTeacherAuthenticated: auth }),

      exploreProgress: {},
      completeStation: (groupId, stationNum) => {
        set((state) => {
          const current = state.exploreProgress[groupId] || {
            station1Completed: false,
            station2Completed: false,
            station3Completed: false,
            station4Completed: false,
            station5Completed: false,
          };
          const updated = {
            ...current,
            [`station${stationNum}Completed`]: true
          };
          return {
            exploreProgress: {
              ...state.exploreProgress,
              [groupId]: updated
            }
          };
        });
      },

      designData: {},
      updateDesignData: (groupId, data) => {
        set((state) => {
          const current = state.designData[groupId] || {
            problemDefinition: '',
            solutions: [],
            selectedSolution: '',
            designDescription: '',
            designImage: '',
            prototypeSteps: [],
            prototypeImage: '',
            readings: [],
            analysisAnswers: {},
            improvements: '',
            finalVoltage: 0,
            submitted: false,
            approvedForGallery: false
          };
          return {
            designData: {
              ...state.designData,
              [groupId]: { ...current, ...data }
            }
          };
        });
      },

      quizResults: {},
      saveQuizResult: (groupId, result) => {
        set((state) => {
          const current = state.quizResults[groupId] || [];
          return {
            quizResults: {
              ...state.quizResults,
              [groupId]: [...current, result]
            }
          };
        });
      },

      questions: defaultQuestions,
      addQuestion: (q) => {
        const newQ: QuestionItem = {
          ...q,
          id: Date.now(),
          approved: false
        };
        set((state) => ({ questions: [...state.questions, newQ] }));
      },
      approveQuestion: (id) => {
        set((state) => ({
          questions: state.questions.map((q) => q.id === id ? { ...q, approved: true } : q)
        }));
      },
      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id)
        }));
      },

      rubricScores: {},
      saveRubricScore: (groupId, rubric) => {
        set((state) => ({
          rubricScores: {
            ...state.rubricScores,
            [groupId]: rubric
          }
        }));
      },

      reflections: {},
      saveReflection: (groupId, reflection) => {
        set((state) => ({
          reflections: {
            ...state.reflections,
            [groupId]: reflection
          }
        }));
      },

      assistantLogs: [],
      addAssistantLog: (log) => {
        const newLog: AssistantLog = {
          ...log,
          id: 'log-' + Date.now(),
          timestamp: new Date().toLocaleTimeString('ar-SA')
        };
        set((state) => ({ assistantLogs: [newLog, ...state.assistantLogs] }));
      },

      toggleGalleryApproval: (groupId) => {
        set((state) => {
          const current = state.designData[groupId];
          if (!current) return state;
          return {
            designData: {
              ...state.designData,
              [groupId]: { ...current, approvedForGallery: !current.approvedForGallery }
            }
          };
        });
      },

      resetStore: () => {
        set({
          activeGroup: null,
          exploreProgress: {},
          designData: {},
          quizResults: {},
          rubricScores: {},
          reflections: {},
          assistantLogs: []
        });
      }
    }),
    {
      name: 'future-energy-lab-storage-2027'
    }
  )
);
