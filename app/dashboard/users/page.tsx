'use client';

import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, MoreHorizontal, Mail, Phone, Users, Crown, Star, Activity, Sparkles, MessageSquare, Shield, Calendar, Award } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const mockUsers = [
  {
    id: '1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Participant',
    quizzesCompleted: 12,
    averageScore: 85.2,
    lastActivity: '2025-01-13',
    status: 'active',
    joinedDate: '2024-03-15',
    streak: 7
  },
  {
    id: '2',
    name: 'Bob Dupont',
    email: 'bob.dupont@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Administrateur',
    quizzesCompleted: 8,
    averageScore: 92.1,
    lastActivity: '2025-01-13',
    status: 'active',
    joinedDate: '2024-01-10',
    streak: 15
  },
  {
    id: '3',
    name: 'Claire Rousseau',
    email: 'claire.rousseau@example.com',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Participant',
    quizzesCompleted: 15,
    averageScore: 78.9,
    lastActivity: '2025-01-12',
    status: 'active',
    joinedDate: '2024-02-20',
    streak: 3
  },
  {
    id: '4',
    name: 'David Moreau',
    email: 'david.moreau@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Modérateur',
    quizzesCompleted: 6,
    averageScore: 88.7,
    lastActivity: '2025-01-11',
    status: 'inactive',
    joinedDate: '2024-04-05',
    streak: 0
  },
  {
    id: '5',
    name: 'Emma Leroy',
    email: 'emma.leroy@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Participant',
    quizzesCompleted: 20,
    averageScore: 94.5,
    lastActivity: '2025-01-13',
    status: 'active',
    joinedDate: '2024-01-25',
    streak: 12
  },
  {
    id: '6',
    name: 'François Bernard',
    email: 'francois.bernard@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Participant',
    quizzesCompleted: 9,
    averageScore: 72.3,
    lastActivity: '2025-01-10',
    status: 'active',
    joinedDate: '2024-05-12',
    streak: 2
  }
];

const quickStats = [
  { 
    label: 'Total Participants', 
    value: '1,247', 
    change: '+18%', 
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    icon: Users
  },
  { 
    label: 'Participants Actifs', 
    value: '892', 
    change: '+12%', 
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    icon: Activity
  },
  { 
    label: 'Score Moyen Global', 
    value: '84.7%', 
    change: '+5%', 
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    icon: Award
  },
  { 
    label: 'Nouveaux ce mois', 
    value: '156', 
    change: '+23%', 
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500',
    icon: Star
  }
];

const filterOptions = [
  { label: 'Tous', value: 'all', active: true },
  { label: 'Actifs', value: 'active', active: false },
  { label: 'Administrateurs', value: 'admin', active: false },
  { label: 'Modérateurs', value: 'moderator', active: false }
];

const getRoleConfig = (role: string) => {
  switch (role) {
    case 'Administrateur':
      return { 
        color: 'bg-red-500/20 text-red-600 border-red-500/30',
        icon: Crown,
        gradient: 'from-red-500 to-pink-500'
      };
    case 'Modérateur':
      return { 
        color: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
        icon: Shield,
        gradient: 'from-orange-500 to-yellow-500'
      };
    default:
      return { 
        color: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
        icon: Users,
        gradient: 'from-blue-500 to-cyan-500'
      };
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 bg-green-50 dark:bg-green-900/20';
  if (score >= 80) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
  if (score >= 70) return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
  return 'text-red-600 bg-red-50 dark:bg-red-900/20';
};

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10"
              animate={{
                x: [0, 120, 0],
                y: [0, -100, 0],
                scale: [1, 2.5, 1],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 12 + i * 1.5,
                repeat: Infinity,
                delay: i * 1.0,
                ease: "easeInOut"
              }}
              style={{
                left: `${2 + i * 5}%`,
                top: `${5 + i * 4}%`
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
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                          <Users className="w-8 h-8 text-white" />
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
                          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl -z-10"
                        />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                          Participants
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          Gérez les utilisateurs et leurs performances
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-3">
                      <UserPlus className="w-5 h-5" />
                      <span>Inviter un utilisateur</span>
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
                        x: [0, 30, 0],
                        y: [0, -25, 0],
                        scale: [1, 2, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: index * 0.8,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: '70%',
                        top: '30%'
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
                      placeholder="Rechercher un participant..."
                      className="pl-12 pr-4 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
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
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
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

            {/* Users Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {mockUsers.map((user, index) => {
                const roleConfig = getRoleConfig(user.role);
                const RoleIcon = roleConfig.icon;
                
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -8 }}
                    className="relative group"
                  >
                    {/* Glassmorphic Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
                    
                    {/* Floating Particles for each card */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
                          animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0],
                            scale: [1, 2, 1],
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            delay: index * 0.5 + i * 1.5,
                            ease: "easeInOut"
                          }}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${15 + i * 25}%`
                          }}
                        />
                      ))}
                    </div>

                    <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[16px_16px_32px_rgba(0,0,0,0.1),-16px_-16px_32px_rgba(255,255,255,0.1)] rounded-3xl overflow-hidden group-hover:shadow-[20px_20px_40px_rgba(0,0,0,0.15),-20px_-20px_40px_rgba(255,255,255,0.15)] transition-all duration-500">
                      
                      <CardHeader className="pb-4 p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16 border-3 border-white/30 dark:border-gray-700/30 shadow-xl">
                                <AvatarImage className='object-cover' src={user.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              
                              {/* Status Indicator */}
                              <motion.div
                                animate={{ 
                                  scale: user.status === 'active' ? [1, 1.2, 1] : 1,
                                  opacity: user.status === 'active' ? [1, 0.7, 1] : 0.5
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white dark:border-gray-900 ${
                                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                }`}
                              />
                              
                              {/* Streak Badge */}
                              {user.streak > 0 && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.1 + 1 }}
                                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                >
                                  {user.streak}
                                </motion.div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {user.name}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge className={cn("text-xs font-medium border backdrop-blur-sm flex items-center space-x-1", roleConfig.color)}>
                                  <RoleIcon className="w-3 h-3" />
                                  <span>{user.role}</span>
                                </Badge>
                                {user.averageScore >= 90 && (
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    <Crown className="w-4 h-4 text-yellow-500" />
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                          
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
                                <Mail className="w-4 h-4 mr-2" />
                                Envoyer un email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                                <Phone className="w-4 h-4 mr-2" />
                                Voir le profil
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Envoyer un message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-8 pt-0 space-y-6">
                        {/* Contact Info */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                              <Mail className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="truncate font-medium">{user.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="font-medium">
                              Rejoint le {new Date(user.joinedDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                        
                        {/* Performance Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                            <motion.p 
                              className="text-2xl font-bold text-blue-600"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 1.2, type: "spring" }}
                            >
                              {user.quizzesCompleted}
                            </motion.p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Quiz complétés</p>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                            <motion.p 
                              className={cn("text-2xl font-bold", getScoreColor(user.averageScore).split(' ')[0])}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 1.4, type: "spring" }}
                            >
                              {user.averageScore}%
                            </motion.p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Score moyen</p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Performance</span>
                            <Badge className={cn("text-xs font-medium", getScoreColor(user.averageScore))}>
                              {user.averageScore >= 90 ? 'Excellent' : 
                               user.averageScore >= 80 ? 'Très bien' :
                               user.averageScore >= 70 ? 'Bien' : 'À améliorer'}
                            </Badge>
                          </div>
                          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${
                                user.averageScore >= 90 ? 'from-green-500 to-emerald-500' :
                                user.averageScore >= 80 ? 'from-blue-500 to-cyan-500' :
                                user.averageScore >= 70 ? 'from-orange-500 to-yellow-500' : 'from-red-500 to-pink-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${user.averageScore}%` }}
                              transition={{ delay: index * 0.1 + 1.6, duration: 1.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                        
                        {/* Last Activity */}
                        <div className="pt-4 border-t border-white/20 dark:border-gray-700/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Activity className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Dernière activité
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {new Date(user.lastActivity).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          {/* Streak Info */}
                          {user.streak > 0 && (
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Série active
                                </span>
                              </div>
                              <span className="text-sm font-bold text-orange-600">
                                {user.streak} jours
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Top Performers Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
              
              <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl overflow-hidden">
                <CardHeader className="p-8 border-b border-white/20 dark:border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          Top Performers
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Les meilleurs participants ce mois-ci
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="px-4 py-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                      Voir tout
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockUsers
                      .sort((a, b) => b.averageScore - a.averageScore)
                      .slice(0, 3)
                      .map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 1.4 }}
                          className="relative text-center"
                        >
                          {/* Podium Effect */}
                          <div className={`absolute inset-0 rounded-2xl ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10' :
                            index === 1 ? 'bg-gradient-to-br from-gray-400/10 to-gray-500/10' :
                            'bg-gradient-to-br from-orange-600/10 to-red-500/10'
                          } backdrop-blur-sm`} />
                          
                          <div className="relative p-6 space-y-4">
                            {/* Rank Badge */}
                            <div className="flex justify-center">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                                index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                                index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                                'bg-gradient-to-br from-orange-600 to-red-500'
                              }`}>
                                {index + 1}
                              </div>
                            </div>
                            
                            {/* Avatar */}
                            <div className="flex justify-center">
                              <div className="relative">
                                <Avatar className="w-16 h-16 border-3 border-white/30 shadow-xl">
                                  <AvatarImage className='object-cover' src={user.avatar} />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                
                                {/* Crown for #1 */}
                                {index === 0 && (
                                  <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                                  >
                                    <Crown className="w-6 h-6 text-yellow-500" />
                                  </motion.div>
                                )}
                              </div>
                            </div>
                            
                            {/* User Info */}
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{user.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                            </div>
                            
                            {/* Score */}
                            <div className="space-y-2">
                              <p className={`text-2xl font-bold ${
                                index === 0 ? 'text-yellow-600' :
                                index === 1 ? 'text-gray-600' : 'text-orange-600'
                              }`}>
                                {user.averageScore}%
                              </p>
                              <p className="text-xs text-gray-500">{user.quizzesCompleted} quiz complétés</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Recent Joiners */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
                
                <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        Nouveaux Participants
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockUsers.slice(-3).map((user, index) => (
                      <div key={user.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                        <Avatar className="w-10 h-10">
                          <AvatarImage className='object-cover' src={user.avatar} />
                          <AvatarFallback className="text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Rejoint le {new Date(user.joinedDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Nouveau
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Summary */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-2xl" />
                
                <Card className="relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl overflow-hidden group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        Résumé d&apos;Activité
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                        <p className="text-2xl font-bold text-green-600">
                          {mockUsers.filter(u => u.status === 'active').length}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">En ligne</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
                        <p className="text-2xl font-bold text-blue-600">
                          {Math.round(mockUsers.reduce((acc, u) => acc + u.averageScore, 0) / mockUsers.length)}%
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Score moyen</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Taux de participation</span>
                        <span className="text-sm font-bold text-purple-600">87%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '87%' }}
                          transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Rétention mensuelle</span>
                        <span className="text-sm font-bold text-green-600">92%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ delay: 2.0, duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Load More Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex justify-center pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <span>Charger plus de participants</span>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ↓
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 z-50 space-y-4">
              {/* Export Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="relative group"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-[12px_12px_24px_rgba(0,0,0,0.2),-12px_-12px_24px_rgba(255,255,255,0.1)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.25),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center justify-center backdrop-blur-xl border border-white/20"
                >
                  <Mail className="w-5 h-5" />
                </motion.button>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                >
                  Envoyer un email groupé
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100" />
                </motion.div>
              </motion.div>

              {/* Add User Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0, duration: 0.5 }}
                className="relative group"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-[12px_12px_24px_rgba(0,0,0,0.2),-12px_-12px_24px_rgba(255,255,255,0.1)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.25),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center justify-center backdrop-blur-xl border border-white/20"
                >
                  <UserPlus className="w-6 h-6" />
                </motion.button>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                >
                  Ajouter un participant
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100" />
                </motion.div>
              </motion.div>
            </div>

            {/* Insights Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-3xl" />
              
              <div className="relative p-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] rounded-3xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
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
                        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl -z-10"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Analyse Comportementale Avancée
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Découvrez des insights détaillés sur l'engagement de vos participants
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Voir l'analyse</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" className="px-6 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 font-semibold flex items-center space-x-2">
                        <Mail className="w-5 h-5" />
                        <span>Campagne email</span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
