"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Target } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsesChart } from "@/components/dashboard/ResponsesChart";
import { ScoreDistributionChart } from "@/components/dashboard/ScoreDistributionChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useDashboardStats } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsPage() {
  const { data: stats, isLoading } = useDashboardStats();

  const analyticsCards = [
    {
      title: "Taux de Participation",
      value: "87.3%",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Temps Moyen",
      value: "12.5 min",
      change: "-2.1%",
      changeType: "positive" as const,
      icon: Clock,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Taux de Réussite",
      value: "78.9%",
      change: "+3.4%",
      changeType: "positive" as const,
      icon: Target,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Progression",
      value: "+15.7%",
      change: "+8.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
    },
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {analyticsCards.map((card, index) => (
                  <StatsCard key={card.title} {...card} index={index} />
                ))}
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1  gap-6 mb-8">
              <ResponsesChart />
            </div>
            <div className="grid grid-cols-1  gap-6 mb-8">
              <ScoreDistributionChart />
            </div>

            {/* Additional Analytics */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tendances par Catégorie */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                {/* Glassmorphic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20"
                      animate={{
                        x: [0, 50, 0],
                        y: [0, -40, 0],
                        scale: [1, 2.5, 1],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 8 + i * 1.5,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${15 + i * 25}%`,
                        top: `${20 + i * 20}%`
                      }}
                    />
                  ))}
                </div>

                <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[16px_16px_32px_rgba(0,0,0,0.1),-16px_-16px_32px_rgba(255,255,255,0.1)] rounded-3xl overflow-hidden group-hover:shadow-[20px_20px_40px_rgba(0,0,0,0.15),-20px_-20px_40px_rgba(255,255,255,0.15)] transition-all duration-500">
                  <CardHeader className="p-8 border-b border-white/20 dark:border-gray-700/30">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            📊
                          </motion.div>
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl blur-xl -z-10"
                        />
                      </div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        Tendances par Catégorie
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {[
                        { category: "Formation", score: 85.2, change: "+3.1%", color: "from-blue-500 to-cyan-500", icon: "🎓" },
                        { category: "Évaluation", score: 78.9, change: "+1.8%", color: "from-purple-500 to-pink-500", icon: "📝" },
                        { category: "Satisfaction", score: 92.1, change: "+5.4%", color: "from-green-500 to-emerald-500", icon: "😊" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + 0.8 }}
                          whileHover={{ scale: 1.03, x: 5 }}
                          className="relative group/item"
                        >
                          {/* Item Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent dark:from-gray-800/20 dark:via-gray-700/10 dark:to-transparent backdrop-blur-sm rounded-2xl" />
                          
                          <div className="relative flex items-center justify-between p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-2xl group-hover/item:bg-white/20 dark:group-hover/item:bg-gray-800/20 transition-all duration-300">
                            <div className="flex items-center space-x-4">
                              {/* Category Icon */}
                              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg text-2xl`}>
                                {item.icon}
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-300">
                                  {item.category}
                                </h4>
                                <div className="flex items-center space-x-3">
                                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    Score moyen: 
                                  </p>
                                  <motion.span 
                                    className="text-lg font-bold text-gray-900 dark:text-white"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.2 + 1, type: "spring" }}
                                  >
                                    {item.score}%
                                  </motion.span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.score}%` }}
                                    transition={{ delay: index * 0.2 + 1.2, duration: 1.5, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Change Indicator */}
                            <div className="flex flex-col items-end space-y-2">
                              <motion.div 
                                className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-600 rounded-xl border border-green-500/30 font-bold text-sm"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <motion.span
                                  animate={{ y: [0, -2, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  ↗️
                                </motion.span>
                                <span>{item.change}</span>
                              </motion.div>
                              
                              {/* Sparkle Effect */}
                              <motion.div
                                animate={{ 
                                  rotate: [0, 180, 360],
                                  scale: [1, 1.2, 1]
                                }}
                                transition={{ 
                                  duration: 4, 
                                  repeat: Infinity,
                                  delay: index * 0.5
                                }}
                                className="text-yellow-500"
                              >
                                ✨
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Insights Clés */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                {/* Glassmorphic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-25"
                      animate={{
                        x: [0, 60, 0],
                        y: [0, -50, 0],
                        scale: [1, 3, 1],
                        opacity: [0.25, 0.7, 0.25]
                      }}
                      transition={{
                        duration: 10 + i * 1.8,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${10 + i * 20}%`,
                        top: `${15 + i * 18}%`
                      }}
                    />
                  ))}
                </div>

                <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[16px_16px_32px_rgba(0,0,0,0.1),-16px_-16px_32px_rgba(255,255,255,0.1)] rounded-3xl overflow-hidden group-hover:shadow-[20px_20px_40px_rgba(0,0,0,0.15),-20px_-20px_40px_rgba(255,255,255,0.15)] transition-all duration-500">
                  <CardHeader className="p-8 border-b border-white/20 dark:border-gray-700/30">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            💡
                          </motion.div>
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl blur-xl -z-10"
                        />
                      </div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                        Insights Clés
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Meilleure Performance",
                          description: 'Quiz "Formation Sécurité" avec 92% de réussite',
                          icon: "🏆",
                          gradient: "from-yellow-500 to-orange-500",
                          bgColor: "from-yellow-500/10 to-orange-500/10"
                        },
                        {
                          title: "Amélioration Notable",
                          description: "Temps de completion réduit de 15% ce mois",
                          icon: "📈",
                          gradient: "from-green-500 to-blue-500",
                          bgColor: "from-green-500/10 to-blue-500/10"
                        },
                        {
                          title: "Point d'Attention",
                          description: "Taux d'abandon élevé sur les quiz longs",
                          icon: "⚠️",
                          gradient: "from-red-500 to-pink-500",
                          bgColor: "from-red-500/10 to-pink-500/10"
                        },
                      ].map((insight, index) => (
                        <motion.div
                          key={insight.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 1 }}
                          whileHover={{ scale: 1.03, x: 8 }}
                          className="relative group/insight"
                        >
                          {/* Insight Background with Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${insight.bgColor} backdrop-blur-sm rounded-2xl opacity-50`} />
                          
                          <div className="relative flex items-start space-x-4 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-2xl group-hover/insight:bg-white/20 dark:group-hover/insight:bg-gray-800/20 transition-all duration-300">
                            {/* Icon Container */}
                            <div className="relative flex-shrink-0">
                              <div className={`w-16 h-16 bg-gradient-to-br ${insight.gradient} rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] text-3xl`}>
                                <motion.span
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: index === 1 ? [0, 5, -5, 0] : 0
                                  }}
                                  transition={{ 
                                    duration: 2 + index * 0.5, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                >
                                  {insight.icon}
                                </motion.span>
                              </div>
                              
                              {/* Pulsing Ring Effect */}
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.3, 0, 0.3]
                                }}
                                transition={{ 
                                  duration: 3, 
                                  repeat: Infinity,
                                  delay: index * 0.7
                                }}
                                className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} rounded-2xl blur-md -z-10`}
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover/insight:text-purple-600 dark:group-hover/insight:text-purple-400 transition-colors duration-300">
                                  {insight.title}
                                </h4>
                                
                                {/* Status Indicator */}
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    delay: index * 0.3
                                  }}
                                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${insight.gradient}`}
                                />
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                {insight.description}
                              </p>
                              
                              {/* Action Button */}
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`mt-3 px-4 py-2 bg-gradient-to-r ${insight.gradient} text-white text-xs font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
                              >
                                <span>
                                  {index === 0 ? 'Voir détails' : 
                                   index === 1 ? 'Analyser' : 'Corriger'}
                                </span>
                                <motion.span
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  →
                                </motion.span>
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Floating Mini Particles for each insight */}
                          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            {[...Array(2)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${insight.gradient} rounded-full opacity-40`}
                                animate={{
                                  x: [0, 30, 0],
                                  y: [0, -20, 0],
                                  scale: [1, 2, 1],
                                  opacity: [0.4, 0.8, 0.4]
                                }}
                                transition={{
                                  duration: 6 + i * 2,
                                  repeat: Infinity,
                                  delay: index * 0.5 + i * 1,
                                  ease: "easeInOut"
                                }}
                                style={{
                                  left: `${20 + i * 40}%`,
                                  top: `${30 + i * 30}%`
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Summary Footer */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                      className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm"
                          >
                            🔄
                          </motion.div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Dernière mise à jour: il y a 5 minutes
                          </span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                        >
                          <span>Actualiser</span>
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            🔄
                          </motion.div>
                        </motion.button>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
