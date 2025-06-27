export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastLogin: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface DashboardStats {
  totalQuizzes: number;
  totalResponses: number;
  averageScore: number;
  completionRate: number;
  activeQuizzes: number;
  pendingReviews: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'boolean';
  options?: string[];
  required: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  responses: number;
  averageScore?: number;
}

export interface QuizResponse {
  id: string;
  quizId: string;
  userId: string;
  userName: string;
  answers: Record<string, any>;
  score: number;
  completedAt: string;
  timeSpent: number; // in minutes
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}