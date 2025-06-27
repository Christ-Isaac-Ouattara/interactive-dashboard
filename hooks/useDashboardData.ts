import { useQuery } from '@tanstack/react-query';
import { 
  mockStats, 
  responsesByDateData, 
  scoreDistributionData, 
  quizCategoryData, 
  mockTasks, 
  recentActivities,
  mockQuizzes,
  mockQuizResponses
} from '@/data/mockData';

// Mock API functions
const fetchDashboardStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStats;
};

const fetchResponsesByDate = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return responsesByDateData;
};

const fetchScoreDistribution = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return scoreDistributionData;
};

const fetchQuizCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return quizCategoryData;
};

const fetchTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockTasks;
};

const fetchRecentActivities = async () => {
  await new Promise(resolve => setTimeout(resolve, 350));
  return recentActivities;
};

const fetchQuizzes = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockQuizzes;
};

const fetchQuizResponses = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockQuizResponses;
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useResponsesByDate = () => {
  return useQuery({
    queryKey: ['responses-by-date'],
    queryFn: fetchResponsesByDate,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useScoreDistribution = () => {
  return useQuery({
    queryKey: ['score-distribution'],
    queryFn: fetchScoreDistribution,
    staleTime: 10 * 60 * 1000,
  });
};

export const useQuizCategories = () => {
  return useQuery({
    queryKey: ['quiz-categories'],
    queryFn: fetchQuizCategories,
    staleTime: 15 * 60 * 1000,
  });
};

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ['recent-activities'],
    queryFn: fetchRecentActivities,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useQuizzes = () => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: fetchQuizzes,
    staleTime: 5 * 60 * 1000,
  });
};

export const useQuizResponses = () => {
  return useQuery({
    queryKey: ['quiz-responses'],
    queryFn: fetchQuizResponses,
    staleTime: 3 * 60 * 1000,
  });
};