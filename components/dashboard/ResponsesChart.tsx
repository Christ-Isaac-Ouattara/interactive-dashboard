'use client';

import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResponsesByDate } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, BarChart3 } from 'lucide-react';

export function ResponsesChart() {
  const { data: responsesData, isLoading } = useResponsesByDate();

  if (isLoading) {
    return (
      <div className=" relative">
        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl" />
        <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
          <CardHeader>
            <Skeleton className="h-8 w-64 bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-96 w-full bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      className=" relative group"
    >
      {/* Glassmorphic Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent dark:from-gray-900/25 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>

      <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl overflow-hidden group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.15)] transition-all duration-500">
        
        <CardHeader className="pb-6 border-b border-white/20 dark:border-gray-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Icon Container */}
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-sm"
                />
              </div>
              
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Évolution des Réponses
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Tendances des participations aux quiz
                </p>
              </div>
            </div>
            
            {/* Trend Indicator */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-2xl border border-green-500/30"
            >
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-bold text-green-600 dark:text-green-400">+12.5%</span>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="h-96 relative">
            {/* Chart Container with Glassmorphic Effect */}
            <div className="absolute inset-0 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/30" />
            
            <ResponsiveContainer width="100%" height="100%" className="relative z-10">
              <AreaChart data={responsesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="50%" stopColor="#8B5CF6"/>
                    <stop offset="100%" stopColor="#EC4899"/>
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
                    <span className="font-bold text-blue-400">{value}</span>, 
                    'Réponses'
                  ]}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="url(#strokeGradient)"
                  strokeWidth={4}
                  fill="url(#colorResponses)"
                  dot={{ 
                    fill: 'url(#strokeGradient)', 
                    strokeWidth: 3, 
                    stroke: '#fff',
                    r: 6
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: 'url(#strokeGradient)',
                    stroke: '#fff',
                    strokeWidth: 3,
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
