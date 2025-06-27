'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, User, Calendar, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTasks } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const statusConfig = {
  'pending': { 
    icon: Clock, 
    color: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    bgColor: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500'
  },
  'in-progress': { 
    icon: AlertCircle, 
    color: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500'
  },
  'completed': { 
    icon: CheckCircle2, 
    color: 'bg-green-500/20 text-green-600 border-green-500/30',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500'
  }
};

const priorityConfig = {
  'low': 'bg-gray-500/20 text-gray-600 border-gray-500/30',
  'medium': 'bg-orange-500/20 text-orange-600 border-orange-500/30',
  'high': 'bg-red-500/20 text-red-600 border-red-500/30'
};

export function TasksList() {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl" />
        <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
          <CardHeader>
            <Skeleton className="h-8 w-40 bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
      className="relative group"
    >
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-25"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.5, 1],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 25}%`,
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
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-sm"
              />
            </div>
            
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tâches Récentes
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Suivi des activités en cours
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {tasks?.map((task, index) => {
            const StatusIcon = statusConfig[task.status].icon;
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group/item relative p-5 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.05)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden"
              >
                {/* Hover Effect Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <div className="relative flex items-center space-x-4">
                  {/* Status Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-sm shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.05)] transition-all duration-300",
                    statusConfig[task.status].color,
                    statusConfig[task.status].bgColor
                  )}>
                    <StatusIcon className={cn("w-6 h-6", statusConfig[task.status].iconColor)} />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Task Title */}
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors duration-300">
                      {task.title}
                    </h4>
                    
                    {/* Task Details */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{task.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Priority Badge */}
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-sm",
                      priorityConfig[task.priority]
                    )}>
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority.toUpperCase()}
                    </Badge>
                    
                    {/* Progress Indicator */}
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          task.status === 'completed' ? "bg-green-500" :
                          task.status === 'in-progress' ? "bg-blue-500" : "bg-yellow-500"
                        )}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: task.status === 'completed' ? '100%' :
                                 task.status === 'in-progress' ? '60%' : '20%'
                        }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Status Line */}
                {/* <motion.div
                  className={cn(
                    "absolute bottom-0 left-0 h-1 rounded-b-2xl",
                    task.status === 'completed' ? "bg-gradient-to-r from-green-400 to-emerald-500" :
                    task.status === 'in-progress' ? "bg-gradient-to-r from-blue-400 to-cyan-500" : 
                    "bg-gradient-to-r from-yellow-400 to-orange-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                /> */}
              </motion.div>
            );
          })}
          
          {/* View All Tasks Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Voir toutes les tâches</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
