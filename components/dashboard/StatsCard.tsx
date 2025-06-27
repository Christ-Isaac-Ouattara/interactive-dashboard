'use client';

import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient: string;
  index: number;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  gradient, 
  index 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative"
    >
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent dark:from-gray-900/25 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-30",
              gradient.includes('blue') ? "bg-blue-400" :
              gradient.includes('green') ? "bg-green-400" :
              gradient.includes('purple') ? "bg-purple-400" :
              gradient.includes('orange') ? "bg-orange-400" : "bg-pink-400"
            )}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
            style={{
              left: `${30 + i * 40}%`,
              top: `${20 + i * 30}%`
            }}
          />
        ))}
      </div>

      <Card className="relative overflow-hidden bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.15)] transition-all duration-500">
        
        {/* Animated Background Gradient */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500",
            `bg-gradient-to-br ${gradient}`
          )}
          animate={{
            background: [
              `linear-gradient(45deg, ${gradient.split(' ')[1]}, ${gradient.split(' ')[3]})`,
              `linear-gradient(135deg, ${gradient.split(' ')[3]}, ${gradient.split(' ')[1]})`,
              `linear-gradient(45deg, ${gradient.split(' ')[1]}, ${gradient.split(' ')[3]})`
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <CardContent className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-4">
              {/* Title */}
              <motion.p 
                className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                {title}
              </motion.p>
              
              {/* Value */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3, type: "spring", bounce: 0.4 }}
              >
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                  {typeof value === 'number' ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                    >
                      {value.toLocaleString()}
                    </motion.span>
                  ) : value}
                </p>
              </motion.div>
              
              {/* Change Indicator */}
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.4 }}
              >
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1",
                  changeType === 'positive' && "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30",
                  changeType === 'negative' && "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30",
                  changeType === 'neutral' && "bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30"
                )}>
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    changeType === 'positive' && "bg-green-500",
                    changeType === 'negative' && "bg-red-500",
                    changeType === 'neutral' && "bg-gray-500"
                  )} />
                  <span>{change}</span>
                </div>
              </motion.div>
            </div>

            {/* Icon Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.15 + 0.6, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              {/* Icon Background */}
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.3),-12px_-12px_24px_rgba(255,255,255,0.02)] group-hover:shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.15)] transition-all duration-300",
                `bg-gradient-to-br ${gradient}`
              )}>
                <Icon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              
              {/* Glow Effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className={cn(
                  "absolute inset-0 rounded-2xl blur-lg -z-10",
                  `bg-gradient-to-br ${gradient}`
                )}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
