'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreHorizontal, Play, Pause, Edit, Trash2, Eye, Users, Clock, Award, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuizzes } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const statusConfig = {
  'active': { 
    label: 'Actif', 
    color: 'bg-green-500/20 text-green-600 border-green-500/30',
    gradient: 'from-green-500 to-emerald-500',
    icon: Play
  },
  'draft': { 
    label: 'Brouillon', 
    color: 'bg-gray-500/20 text-gray-600 border-gray-500/30',
    gradient: 'from-gray-500 to-slate-500',
    icon: Edit
  },
  'completed': { 
    label: 'Terminé', 
    color: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    gradient: 'from-blue-500 to-cyan-500',
    icon: Award
  }
};

const quickStats = [
  { 
    label: 'Total Quiz', 
    value: '247', 
    change: '+12%', 
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    icon: Target
  },
  { 
    label: 'Quiz Actifs', 
    value: '89', 
    change: '+8%', 
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    icon: Play
  },
  { 
    label: 'Participants', 
    value: '1,247', 
    change: '+23%', 
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    icon: Users
  },
  { 
    label: 'Score Moyen', 
    value: '87.5%', 
    change: '+5%', 
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500',
    icon: TrendingUp
  }
];

const filterOptions = [
  { label: 'Tous', value: 'all', active: true },
  { label: 'Actifs', value: 'active', active: false },
  { label: 'Brouillons', value: 'draft', active: false },
  { label: 'Terminés', value: 'completed', active: false }
];

export default function QuizzesPage() {
  const { data: quizzes, isLoading } = useQuizzes();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/20 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-10"
              animate={{
                x: [0, 120, 0],
                y: [0, -80, 0],
                scale: [1, 2.5, 1],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${5 + i * 8}%`,
                top: `${15 + i * 6}%`
              }}
            />
          ))}
        </div>

        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
              
              <div className="relative p-8 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl opacity-20 blur-sm"
                        />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
                          Questionnaires
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          Gérez et analysez vos questionnaires et quiz interactifs
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-3">
                      <Plus className="w-5 h-5" />
                      <span>Nouveau Quiz</span>
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <motion.div
                      className={`absolute w-1 h-1 rounded-full opacity-30 ${
                        stat.gradient.includes('blue') ? 'bg-blue-400' :
                        stat.gradient.includes('green') ? 'bg-green-400' :
                        stat.gradient.includes('purple') ? 'bg-purple-400' : 'bg-orange-400'
                      }`}
                      animate={{
                        x: [0, 20, 0],
                        y: [0, -15, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: '70%',
                        top: '20%'
                      }}
                    />
                  </div>
                  
                  <div className="relative p-6 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className={`text-sm font-semibold ${stat.color}`}>{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
              
              <div className="relative p-6 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Rechercher un questionnaire..."
                      className="pl-12 pr-4 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl focus:ring-2 focus:ring-purple-500/20 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  {/* Filter Tabs */}
                  <div className="flex items-center space-x-2">
                    {filterOptions.map((option, index) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-4 py-2 rounded-xl font-medium transition-all duration-300",
                          option.active 
                            ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg" 
                            : "bg-white/30 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40"
                        )}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                    <Button variant="outline" className="px-4 py-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                      <Filter className="w-4 h-4 mr-2" />
                      Plus de filtres
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quiz Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl" />
                    <div className="relative p-6 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
                      <Skeleton className="h-64 w-full bg-white/20 dark:bg-gray-800/20 rounded-2xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              >
                {quizzes?.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="relative group"
                  >
                    {/* Glassmorphic Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent dark:from-gray-900/25 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1.5 h-1.5 rounded-full opacity-25 ${
                            statusConfig[quiz.status].gradient.includes('green') ? 'bg-green-400' :
                            statusConfig[quiz.status].gradient.includes('blue') ? 'bg-blue-400' : 'bg-gray-400'
                          }`}
                          animate={{
                            x: [0, 40, 0],
                            y: [0, -25, 0],
                            scale: [1, 1.8, 1],
                            opacity: [0.25, 0.5, 0.25]
                          }}
                          transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "easeInOut"
                          }}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${15 + i * 25}%`
                          }}
                        />
                      ))}
                    </div>

                    <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl overflow-hidden group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.15)] transition-all duration-500">
                      
                      {/* Animated Background Gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${statusConfig[quiz.status].gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        initial={false}
                      />

                      <CardHeader className="pb-4 border-b border-white/20 dark:border-gray-700/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-3">
                            {/* Status Badge */}
                            <div className="flex items-center space-x-3">
                              <Badge className={cn("px-3 py-1 rounded-full font-bold border backdrop-blur-sm flex items-center space-x-2", statusConfig[quiz.status].color)}>
                                {/* <span className="w-3 h-3">{statusConfig[quiz.status].icon}</span>    */}
                                <span>{statusConfig[quiz.status].label}</span>
                              </Badge>
                              
                              {quiz.status === 'active' && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-2 h-2 bg-green-500 rounded-full"
                                />
                              )}
                            </div>
                            
                            {/* Title */}
                            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {quiz.title}
                            </CardTitle>
                          </div>
                          
                          {/* Actions Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-xl">
                              <DropdownMenuItem className="rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                                {quiz.status === 'active' ? (
                                  <>
                                    <Pause className="w-4 h-4 mr-2" />
                                    Suspendre
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Activer
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 space-y-6">
                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                          {quiz.description}
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="flex justify-between items-center gap-4">
                          <div className="p-4 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <Users className="w-8  text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Réponses</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{quiz.responses}</p>
                              </div>
                            </div>
                          </div>
                          
                          {quiz.averageScore && (
                            <div className="p-4 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                  <Award className="w-8 text-white" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Score moyen</p>
                                  <p className="text-lg font-bold text-gray-900 dark:text-white">{quiz.averageScore.toFixed(1)}%</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Creation Date */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Créé le {new Date(quiz.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        {/* Progress Bar for Active Quizzes */}
                        {quiz.status === 'active' && quiz.responses > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Progression</span>
                              <span>{Math.min(100, (quiz.responses / 100) * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${statusConfig[quiz.status].gradient} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (quiz.responses / 100) * 100)}%` }}
                                transition={{ delay: index * 0.1 + 1, duration: 1.5 }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <div className="pt-4 border-t border-white/20 dark:border-gray-700/30">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              className={`w-full py-3 bg-gradient-to-r ${statusConfig[quiz.status].gradient} hover:opacity-90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2`}
                            >
                              <Eye className="w-4 h-4" />
                              <span>Voir les détails</span>
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && (!quizzes || quizzes.length === 0) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
                
                <div className="relative p-16 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl text-center">
                  {/* Floating Elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20"
                        animate={{
                          x: [0, 60, 0],
                          y: [0, -40, 0],
                          scale: [1, 2, 1],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 8 + i * 2,
                          repeat: Infinity,
                          delay: i * 1.5,
                          ease: "easeInOut"
                        }}
                        style={{
                          left: `${15 + i * 15}%`,
                          top: `${20 + i * 15}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative space-y-6">
                    {/* Empty State Icon */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)]">
                          <Target className="w-12 h-12 text-white" />
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl blur-xl -z-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Aucun questionnaire trouvé
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Commencez par créer votre premier questionnaire pour engager votre audience et collecter des données précieuses.
                      </p>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-3">
                        <Plus className="w-5 h-5" />
                        <span>Créer mon premier quiz</span>
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Load More Button */}
            {!isLoading && quizzes && quizzes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex justify-center pt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  <span>Charger plus de questionnaires</span>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
