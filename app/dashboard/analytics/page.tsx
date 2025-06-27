'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsesChart } from '@/components/dashboard/ResponsesChart';
import { ScoreDistributionChart } from '@/components/dashboard/ScoreDistributionChart';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { useDashboardStats } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalyticsPage() {
  const { data: stats, isLoading } = useDashboardStats();

  const analyticsCards = [
    {
      title: 'Taux de Participation',
      value: '87.3%',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Temps Moyen',
      value: '12.5 min',
      change: '-2.1%',
      changeType: 'positive' as const,
      icon: Clock,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Taux de Réussite',
      value: '78.9%',
      change: '+3.4%',
      changeType: 'positive' as const,
      icon: Target,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Progression',
      value: '+15.7%',
      change: '+8.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Analyses et Statistiques
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Insights détaillés sur les performances des questionnaires
              </p>
            </div>

            {/* Analytics Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {analyticsCards.map((card, index) => (
                  <StatsCard key={card.title} {...card} index={index} />
                ))}
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ResponsesChart />
              <ScoreDistributionChart />
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendances par Catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'Formation', score: 85.2, change: '+3.1%' },
                      { category: 'Évaluation', score: 78.9, change: '+1.8%' },
                      { category: 'Satisfaction', score: 92.1, change: '+5.4%' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{item.category}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Score moyen: {item.score}%
                          </p>
                        </div>
                        <div className="text-green-600 font-medium">
                          {item.change}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insights Clés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Meilleure Performance',
                        description: 'Quiz "Formation Sécurité" avec 92% de réussite',
                        icon: '🏆'
                      },
                      {
                        title: 'Amélioration Notable',
                        description: 'Temps de completion réduit de 15% ce mois',
                        icon: '📈'
                      },
                      {
                        title: 'Point d\'Attention',
                        description: 'Taux d\'abandon élevé sur les quiz longs',
                        icon: '⚠️'
                      }
                    ].map((insight, index) => (
                      <motion.div
                        key={insight.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <span className="text-2xl">{insight.icon}</span>
                        <div>
                          <h4 className="font-medium mb-1">{insight.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {insight.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}