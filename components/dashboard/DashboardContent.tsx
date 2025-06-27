'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Users, BarChart3, Clock } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ResponsesChart } from './ResponsesChart';
import { ScoreDistributionChart } from './ScoreDistributionChart';
import { TasksList } from './TasksList';
import { RecentActivity } from './RecentActivity';
import { useDashboardStats } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardContent() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Questionnaires',
      value: stats?.totalQuizzes || 0,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: ClipboardList,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Réponses Totales',
      value: stats?.totalResponses || 0,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Score Moyen',
      value: `${(stats?.averageScore || 0).toFixed(1)}%`,
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: BarChart3,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Taux de Completion',
      value: `${(stats?.completionRate || 0).toFixed(1)}%`,
      change: '-1.2%',
      changeType: 'negative' as const,
      icon: Clock,
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={card.title} {...card} index={index} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResponsesChart />
        <ScoreDistributionChart />
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksList />
        <RecentActivity />
      </div>
    </motion.div>
  );
}