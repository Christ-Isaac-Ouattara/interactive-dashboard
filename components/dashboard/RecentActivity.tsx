'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRecentActivities } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Activity, Zap } from 'lucide-react';

export function RecentActivity() {
  const { data: activities, isLoading } = useRecentActivities();

  if (isLoading) {
    return (
      <div className="relative">
        {/* Glassmorphic Loading Container */}
        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl" />
        <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <Skeleton className="h-8 w-48 bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-gray-800/20" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-white/20 dark:bg-gray-800/20 rounded-xl" />
                  <Skeleton className="h-4 w-1/2 bg-white/20 dark:bg-gray-800/20 rounded-xl" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
      className="relative group"
    >
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 15}%`
            }}
          />
        ))}
      </div>

      <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl overflow-hidden group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.15)] transition-all duration-500">
        
        <CardHeader className="pb-6 border-b border-white/20 dark:border-gray-700/30">
          <div className="flex items-center space-x-4">
            {/* Icon Container */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl opacity-20 blur-sm"
              />
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Activité Récente
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Dernières actions des utilisateurs
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {activities?.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="group/item relative p-4 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.05)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden"
            >
              {/* Hover Effect Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              <div className="relative flex items-center space-x-4">
                {/* Avatar with Glassmorphic Effect */}
                <div className="relative">
                  <Avatar className="w-14 h-14 ring-4 ring-white/30 dark:ring-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Status Indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg flex items-center justify-center"
                  >
                    <Zap className="w-2 h-2 text-white" />
                  </motion.div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {activity.user}
                    </span>{' '}
                    <span className="text-gray-700 dark:text-gray-300">
                      {activity.action}
                    </span>
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{activity.timestamp}</span>
                  </div>
                </div>
                
                {/* Action Indicator */}
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 group-hover/item:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
