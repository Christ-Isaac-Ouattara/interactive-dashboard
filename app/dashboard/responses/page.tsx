'use client';

import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, MoreHorizontal, Users, TrendingUp, Clock, Award, Sparkles, FileText, BarChart3, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuizResponses } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-500/20 text-green-600 border-green-500/30';
  if (score >= 60) return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
  return 'bg-red-500/20 text-red-600 border-red-500/30';
};

const getScoreGradient = (score: number) => {
  if (score >= 80) return 'from-green-500 to-emerald-500';
  if (score >= 60) return 'from-orange-500 to-yellow-500';
  return 'from-red-500 to-pink-500';
};

const quickStats = [
  { 
    label: 'Total Réponses', 
    value: '2,847', 
    change: '+18%', 
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    icon: FileText
  },
  { 
    label: 'Participants Actifs', 
    value: '1,247', 
    change: '+12%', 
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    icon: Users
  },
  { 
    label: 'Score Moyen', 
    value: '87.3%', 
    change: '+5%', 
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    icon: Award
  },
  { 
    label: 'Temps Moyen', 
    value: '12.5 min', 
    change: '-8%', 
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500',
    icon: Clock
  }
];

const filterOptions = [
  { label: 'Toutes', value: 'all', active: true },
  { label: 'Excellentes (80%+)', value: 'excellent', active: false },
  { label: 'Bonnes (60-79%)', value: 'good', active: false },
  { label: 'À améliorer (<60%)', value: 'poor', active: false }
];

export default function ResponsesPage() {
  const { data: responses, isLoading } = useQuizResponses();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 dark:from-gray-900 dark:via-green-900/10 dark:to-blue-900/10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10"
              animate={{
                x: [0, 100, 0],
                y: [0, -120, 0],
                scale: [1, 2.2, 1],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 14 + i * 2,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut"
              }}
              style={{
                left: `${3 + i * 7}%`,
                top: `${10 + i * 5}%`
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
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl blur-xl -z-10"
                        />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 dark:from-white dark:via-green-200 dark:to-blue-200 bg-clip-text text-transparent">
                          Réponses aux Quiz
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          Analysez les réponses et performances des participants
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-3">
                      <Download className="w-5 h-5" />
                      <span>Exporter les données</span>
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
                        x: [0, 25, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.8,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: '75%',
                        top: '25%'
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
                      placeholder="Rechercher par participant..."
                      className="pl-12 pr-4 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl focus:ring-2 focus:ring-green-500/20 text-gray-900 dark:text-white"
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
                            ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg" 
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

            {/* Responses Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative"
            >
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
              
              <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl overflow-hidden">
                
                <CardHeader className="p-8 border-b border-white/20 dark:border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          Dernières Réponses
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Performances et détails des participants
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" className="px-4 py-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        Période
                      </Button>
                      <Button variant="outline" className="px-4 py-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir tout
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="p-8 space-y-6">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="flex items-center space-x-4 p-4 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"
                        >
                          <Skeleton className="w-12 h-12 rounded-full bg-white/30 dark:bg-gray-700/30" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4 bg-white/30 dark:bg-gray-700/30 rounded-lg" />
                            <Skeleton className="h-3 w-1/2 bg-white/20 dark:bg-gray-700/20 rounded-lg" />
                          </div>
                          <Skeleton className="w-16 h-8 bg-white/30 dark:bg-gray-700/30 rounded-lg" />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-white/20 dark:border-gray-700/30 hover:bg-white/5 dark:hover:bg-gray-800/5">
                            <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-6">Participant</TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-6">Quiz</TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-6">Score</TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-6">Temps</TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-6">Date</TableHead>
                            <TableHead className="text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {responses?.map((response, index) => (
                            <motion.tr
                              key={response.id}
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                              whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                              className="border-b border-white/10 dark:border-gray-700/20 hover:bg-white/5 dark:hover:bg-gray-800/5 transition-all duration-300 group"
                            >
                              <TableCell className="py-6 px-6">
                                <div className="flex items-center space-x-4">
                                  <div className="relative">
                                    <Avatar className="w-12 h-12 border-2 border-white/20 dark:border-gray-700/30 shadow-lg">
                                      <AvatarImage 
                                        className='object-cover' 
                                        src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`} 
                                      />
                                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-bold">
                                        {response.userName.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    
                                    {/* Online Indicator */}
                                    <motion.div
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                                      {response.userName}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Participant #{response.id}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              
                              <TableCell className="py-6 px-6">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">Q</span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Quiz #{response.quizId}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Questionnaire</p>
                                  </div>
                                </div>
                              </TableCell>
                              
                              <TableCell className="py-6 px-6">
                                <div className="flex items-center space-x-3">
                                  <Badge className={cn("px-3 py-1 rounded-full font-bold border backdrop-blur-sm flex items-center space-x-2", getScoreColor(response.score))}>
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getScoreGradient(response.score)}`} />
                                    <span>{response.score}%</span>
                                  </Badge>
                                  
                                  {/* Score Progress Bar */}
                                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                      className={`h-full bg-gradient-to-r ${getScoreGradient(response.score)} rounded-full`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${response.score}%` }}
                                      transition={{ delay: index * 0.1 + 1, duration: 1 }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              
                              <TableCell className="py-6 px-6">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {response.timeSpent} min
                                  </span>
                                </div>
                              </TableCell>
                              
                              <TableCell className="py-6 px-6">
                                <div className="space-y-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(response.completedAt).toLocaleDateString('fr-FR')}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(response.completedAt).toLocaleTimeString('fr-FR', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </p>
                                </div>
                              </TableCell>
                              
                              <TableCell className="py-6 px-6 text-right">
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
                                      <Eye className="w-4 h-4 mr-2" />
                                      Voir les détails
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                                      <Download className="w-4 h-4 mr-2" />
                                      Exporter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                                      <Users className="w-4 h-4 mr-2" />
                                      Profil participant
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Empty State */}
            {!isLoading && (!responses || responses.length === 0) && (
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
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20"
                        animate={{
                          x: [0, 80, 0],
                          y: [0, -50, 0],
                          scale: [1, 2.5, 1],
                          opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{
                          duration: 10 + i * 2,
                          repeat: Infinity,
                          delay: i * 1.8,
                          ease: "easeInOut"
                        }}
                        style={{
                          left: `${10 + i * 15}%`,
                          top: `${15 + i * 12}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative space-y-6">
                    {/* Empty State Icon */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)]">
                          <BarChart3 className="w-12 h-12 text-white" />
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl blur-xl -z-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Aucune réponse trouvée
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Les réponses aux questionnaires apparaîtront ici une fois que les participants auront commencé à répondre.
                      </p>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5" />
                        <span>Voir les questionnaires actifs</span>
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Performance Analytics Cards */}
            {!isLoading && responses && responses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Top Performers */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
                  
                  <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                          Top Performers
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {responses?.slice(0, 3).map((response, index) => (
                        <div key={response.id} className="flex items-center space-x-3 p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                          <div className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-500 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              'bg-orange-500 text-white'
                            }`}>
                              {index + 1}
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`} />
                              <AvatarFallback className="text-xs">
                                {response.userName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {response.userName}
                            </p>
                          </div>
                          <Badge className={cn("text-xs", getScoreColor(response.score))}>
                            {response.score}%
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
                  
                  <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                          Activité Récente
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {responses?.slice(-3).reverse().map((response, index) => (
                        <div key={response.id} className="flex items-center space-x-3 p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://images.pexels.com/photos/${1000000 + index + 10}/pexels-photo-${1000000 + index + 10}.jpeg?auto=compress&cs=tinysrgb&w=400`} />
                            <AvatarFallback className="text-xs">
                              {response.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {response.userName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Il y a {Math.floor(Math.random() * 60)} min
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={cn("text-xs", getScoreColor(response.score))}>
                              {response.score}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick Stats Summary */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
                  
                  <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                          Résumé
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                          <p className="text-2xl font-bold text-green-600">
                            {responses?.filter(r => r.score >= 80).length || 0}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Excellents</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                          <p className="text-2xl font-bold text-orange-600">
                            {responses?.filter(r => r.score >= 60 && r.score < 80).length || 0}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Bons</p>
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                        <p className="text-2xl font-bold text-red-600">
                          {responses?.filter(r => r.score < 60).length || 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">À améliorer</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Load More Button */}
            {!isLoading && responses && responses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex justify-center pt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  <span>Charger plus de réponses</span>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </motion.button>
              </motion.div>
            )}

            {/* Floating Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full shadow-[12px_12px_24px_rgba(0,0,0,0.2),-12px_-12px_24px_rgba(255,255,255,0.1)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.25),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center justify-center backdrop-blur-xl border border-white/20"
              >
                <Download className="w-6 h-6" />
              </motion.button>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
              >
                Exporter toutes les réponses
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100" />
              </motion.div>
            </motion.div>

            {/* Performance Insights Banner */}
            {!isLoading && responses && responses.length > 10 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 backdrop-blur-2xl rounded-3xl" />
                
                <div className="relative p-8 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl blur-xl -z-10"
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          Analyse Avancée Disponible
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Découvrez des insights détaillés sur les performances de vos participants
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>Voir l&apos;analyse</span>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" className="px-6 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 font-semibold flex items-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>Générer rapport</span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
