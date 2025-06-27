import { DashboardStats, ChartData, Task, Quiz, QuizResponse } from '@/types';

export const mockStats: DashboardStats = {
  totalQuizzes: 24,
  totalResponses: 1847,
  averageScore: 78.5,
  completionRate: 85.2,
  activeQuizzes: 8,
  pendingReviews: 12
};

export const responsesByDateData: ChartData[] = [
  { name: 'Jan', value: 180 },
  { name: 'Fév', value: 220 },
  { name: 'Mar', value: 190 },
  { name: 'Avr', value: 280 },
  { name: 'Mai', value: 340 },
  { name: 'Jun', value: 320 },
  { name: 'Jul', value: 420 }
];

export const scoreDistributionData: ChartData[] = [
  { name: '0-20', value: 45 },
  { name: '21-40', value: 89 },
  { name: '41-60', value: 156 },
  { name: '61-80', value: 234 },
  { name: '81-100', value: 189 }
];

export const quizCategoryData: ChartData[] = [
  { name: 'Formation', value: 45 },
  { name: 'Évaluation', value: 35 },
  { name: 'Satisfaction', value: 20 }
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Formation Sécurité Informatique',
    description: 'Quiz d\'évaluation des connaissances en cybersécurité',
    questions: [],
    status: 'active',
    createdAt: '2025-01-10',
    responses: 156,
    averageScore: 82.3
  },
  {
    id: '2',
    title: 'Satisfaction Client Q4',
    description: 'Enquête de satisfaction trimestrielle',
    questions: [],
    status: 'active',
    createdAt: '2025-01-08',
    responses: 89,
    averageScore: 75.6
  },
  {
    id: '3',
    title: 'Évaluation Compétences RH',
    description: 'Assessment des compétences en ressources humaines',
    questions: [],
    status: 'completed',
    createdAt: '2025-01-05',
    responses: 234,
    averageScore: 78.9
  },
  {
    id: '4',
    title: 'Formation Produit 2025',
    description: 'Quiz de validation des connaissances produit',
    questions: [],
    status: 'draft',
    createdAt: '2025-01-12',
    responses: 0
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Réviser les questions du quiz sécurité',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Marie Dubois',
    dueDate: '2025-01-15'
  },
  {
    id: '2',
    title: 'Analyser les résultats satisfaction Q4',
    status: 'pending',
    priority: 'medium',
    assignee: 'Pierre Martin',
    dueDate: '2025-01-18'
  },
  {
    id: '3',
    title: 'Créer rapport mensuel des quiz',
    status: 'completed',
    priority: 'high',
    assignee: 'Sophie Laurent',
    dueDate: '2025-01-10'
  },
  {
    id: '4',
    title: 'Valider nouveau questionnaire RH',
    status: 'pending',
    priority: 'low',
    assignee: 'Thomas Durand',
    dueDate: '2025-01-20'
  }
];

export const recentActivities = [
  {
    id: '1',
    user: 'Marie Dubois',
    action: 'a complété le quiz "Formation Sécurité"',
    timestamp: '2 min ago',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    user: 'Pierre Martin', 
    action: 'a créé un nouveau questionnaire',
    timestamp: '15 min ago',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    user: 'Sophie Laurent',
    action: 'a analysé les résultats du quiz RH',
    timestamp: '1h ago',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    user: 'Thomas Durand',
    action: 'a exporté le rapport de satisfaction',
    timestamp: '2h ago',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockQuizResponses: QuizResponse[] = [
  {
    id: '1',
    quizId: '1',
    userId: '1',
    userName: 'Alice Martin',
    answers: {},
    score: 85,
    completedAt: '2025-01-13T10:30:00Z',
    timeSpent: 12
  },
  {
    id: '2',
    quizId: '1',
    userId: '2',
    userName: 'Bob Dupont',
    answers: {},
    score: 92,
    completedAt: '2025-01-13T14:15:00Z',
    timeSpent: 8
  },
  {
    id: '3',
    quizId: '2',
    userId: '3',
    userName: 'Claire Rousseau',
    answers: {},
    score: 76,
    completedAt: '2025-01-12T16:45:00Z',
    timeSpent: 15
  }
];