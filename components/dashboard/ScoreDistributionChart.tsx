'use client';

import { motion } from 'framer-motion';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScoreDistribution } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { Target, Award } from 'lucide-react';

export function ScoreDistributionChart() {
  const { data: scoreData, isLoading } = useScoreDistribution();

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl" />
        <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
          <CardHeader>
            <Skeleton className="h-8 w-48 bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
            <Skeleton className="h-4 w-32 bg-white/20 dark:bg-gray-800/20 rounded-xl" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
      className="relative group"
    >
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-25"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.8, 1],
              opacity: [0.25, 0.6, 0.25]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${25 + i * 18}%`,
              top: `${25 + i * 12}%`
            }}
          />
        ))}
      </div>

      <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl overflow-hidden group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.15)] transition-all duration-500">
        
        <CardHeader className="pb-6 border-b border-white/20 dark:border-gray-700/30">
          <div className="flex items-center space-x-4">
            {/* Icon Container */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]">
                <Target className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl opacity-20 blur-sm"
              />
            </div>
            
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Distribution des Scores
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Répartition par tranche de performance</span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="h-80 relative">
            {/* Chart Background */}
            <div className="absolute inset-0 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/30" />
            
            <ResponsiveContainer width="100%" height="100%" className="relative z-10">
              <BarChart data={scoreData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    color: 'white',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                  formatter={(value: number) => [
                    <span className="font-bold text-orange-400">{value}</span>, 
                    'Participants'
                  ]}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                  className="drop-shadow-lg"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
