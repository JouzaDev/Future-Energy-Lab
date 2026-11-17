export interface Group {
  id: string;
  code: string;
  pin: string;
  name: string;
  emblem: string;
  idea: string;
  isTest?: boolean;
  createdAt: string;
}

export interface ExploreProgress {
  station1Completed: boolean;
  station2Completed: boolean;
  station3Completed: boolean;
  station4Completed: boolean;
  station5Completed: boolean;
}

export interface DesignStageData {
  problemDefinition: string;
  solutions: { id: string; title: string; pros: string; cons: string }[];
  selectedSolution: string;
  designDescription: string;
  designImage: string;
  prototypeSteps: string[];
  prototypeImage: string;
  readings: {
    id: string;
    metal1: string;
    metal2: string;
    solution: string;
    electrodesArea: string;
    voltage: number;
    notes: string;
  }[];
  analysisAnswers: { [key: string]: string };
  improvements: string;
  finalVoltage: number;
  submitted: boolean;
  submittedAt?: string;
  approvedForGallery?: boolean;
}

export interface QuizResult {
  kind: 'pre' | 'post' | 'quiz';
  score: number;
  total: number;
  answers: { [key: number]: number };
  completedAt: string;
}

export interface RubricEvaluation {
  scientificUnderstanding: number; // 1-4
  designCreativity: number; // 1-4
  prototypeExecution: number; // 1-4
  testingAndAnalysis: number; // 1-4
  improvementAndEvolution: number; // 1-4
  teamworkAndPresentation: number; // 1-4
  notes: string;
}

export interface ReflectionData {
  keyConcept: string;
  biggestChallenge: string;
  howHandled: string;
  whatToChange: string;
  aiHelpfulness: string;
}

export interface AssistantLog {
  id: string;
  topic: string;
  question: string;
  answer: string;
  timestamp: string;
}

export interface QuestionItem {
  id: number;
  concept: string;
  skill: string;
  difficulty: 'سهل' | 'متوسط' | 'متقدم';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  approved: boolean;
}
