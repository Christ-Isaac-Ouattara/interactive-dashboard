'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Calendar, TrendingUp, Sparkles, Eye, Filter, Search, Plus, BarChart3, PieChart, FileBarChart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const mockReports = [
  {
    id: '1',
    title: 'Rapport Mensuel - Janvier 2025',
    description: 'Synthèse complète des performances des questionnaires',
    type: 'Mensuel',
    generatedAt: '2025-01-13',
    size: '2.4 MB',
    status: 'Prêt',
    downloads: 127,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    title: 'Analyse des Scores par Département',
    description: 'Comparaison des performances entre départements',
    type: 'Analytique',
    generatedAt: '2025-01-12',
    size: '1.8 MB',
    status: 'Prêt',
    downloads: 89,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '3',
    title: 'Rapport de Satisfaction Q4 2024',
    description: 'Résultats des enquêtes de satisfaction trimestrielles',
    type: 'Trimestriel',
    generatedAt: '2025-01-10',
    size: '3.1 MB',
    status: 'Prêt',
    downloads: 203,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '4',
    title: 'Tendances Annuelles 2024',
    description: 'Évolution des métriques sur l\'année écoulée',
    type: 'Annuel',
    generatedAt: '2025-01-08',
    size: '5.2 MB',
    status: 'En cours',
    downloads: 0,
    color: 'from-orange-500 to-red-500'
  }
];

const reportTypes = [
  {
    title: 'Rapport de Performance',
    description: 'Analyse détaillée des scores et temps de completion',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    popular: true
  },
  {
    title: 'Rapport d\'Activité',
    description: 'Suivi de l\'engagement et de la participation',
    icon: Calendar,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-500/30',
    popular: false
  },
  {
    title: 'Rapport Personnalisé',
    description: 'Créez un rapport selon vos critères spécifiques',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/30',
    popular: false
  }
];

const quickStats = [
  { label: 'Rapports générés', value: '1,247', change: '+12%', color: 'text-blue-600' },
  { label: 'Téléchargements', value: '3,891', change: '+8%', color: 'text-green-600' },
  { label: 'Taille totale', value: '127 GB', change: '+15%', color: 'text-purple-600' },
  { label: 'Utilisateurs actifs', value: '456', change: '+23%', color: 'text-orange-600' }
];

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`
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
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                        <FileBarChart className="w-14 text-white" />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                          Rapports et Exports
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                          Générez et téléchargez vos rapports d&apos;analyse avancés
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Rechercher un rapport..."
                        className="pl-12 pr-4 py-3 w-80 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                      />
                    </div>
                    <Button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Filter className="w-5 h-5 mr-2" />
                      Filtrer
                    </Button>
                  </div>
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
                  
                  <div className="relative p-6 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] rounded-2xl group-hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.15)] transition-all duration-300">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className={`text-sm font-semibold ${stat.color}`}>{stat.change}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Report Generation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {reportTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="relative group"
                >
                  {/* Popular Badge */}
                  {type.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ delay: index * 0.15 + 0.8, type: "spring", bounce: 0.5 }}
                      className="absolute -top-3 -right-3 z-10 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>POPULAIRE</span>
                    </motion.div>
                  )}
                  
                  {/* Glassmorphic Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent dark:from-gray-900/25 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl rounded-3xl" />
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full opacity-30 ${
                          type.color.includes('blue') ? 'bg-blue-400' :
                          type.color.includes('green') ? 'bg-green-400' : 'bg-purple-400'
                        }`}
                        animate={{
                          x: [0, 30, 0],
                          y: [0, -20, 0],
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 6 + i * 2,
                          repeat: Infinity,
                          delay: i * 2,
                          ease: "easeInOut"
                        }}
                        style={{
                          left: `${25 + i * 25}%`,
                          top: `${20 + i * 20}%`
                        }}
                      />
                    ))}
                  </div>

                  <Card className={`relative bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-[20px_20px_40px_rgba(0,0,0,0.1),-20px_-20px_40px_rgba(255,255,255,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.3),-20px_-20px_40px_rgba(255,255,255,0.02)] rounded-3xl overflow-hidden group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.15)] transition-all duration-500`}>
                    
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${type.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      initial={false}
                    />

                    <CardContent className="relative p-8 space-y-6">
                      {/* Icon Container */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-3xl flex items-center justify-center shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] group-hover:shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.15)] transition-all duration-300`}>
                            <type.icon className="w-10 h-10 text-white" />
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
                            className={`absolute inset-0 bg-gradient-to-br ${type.color} rounded-3xl blur-xl -z-10`}
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {type.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                      
                      {/* Generate Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className={`w-full py-3 bg-gradient-to-r ${type.color} hover:opacity-90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2`}>
                          <Plus className="w-5 h-5" />
                          <span>Générer</span>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Reports */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
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
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Rapports Récents
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Historique de vos dernières générations
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="px-6 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
                      <Eye className="w-5 h-5 mr-2" />
                      Voir tout
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="space-y-6">
                    {mockReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="group/report relative p-6 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.05)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden"
                      >
                        {/* Hover Effect Background */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${report.color} opacity-0 group-hover/report:opacity-5 transition-opacity duration-300`}
                          initial={false}
                        />
                        
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            {/* Report Icon */}
                            <div className={`w-16 h-16 bg-gradient-to-br ${report.color} rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] group-hover/report:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.15)] transition-all duration-300`}>
                              {report.type === 'Mensuel' ? <Calendar className="w-8 h-8 text-white" /> :
                               report.type === 'Analytique' ? <BarChart3 className="w-8 h-8 text-white" /> :
                               report.type === 'Trimestriel' ? <PieChart className="w-8 h-8 text-white" /> :
                               <TrendingUp className="w-8 h-8 text-white" />}
                            </div>
                            
                            {/* Report Details */}
                            <div className="space-y-2">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover/report:text-indigo-600 dark:group-hover/report:text-indigo-400 transition-colors duration-300">
                                {report.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                                {report.description}
                              </p>
                              
                              {/* Metadata */}
                              <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                                <Badge className={`px-3 py-1 rounded-full border backdrop-blur-sm ${
                                  report.type === 'Mensuel' ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' :
                                  report.type === 'Analytique' ? 'bg-green-500/20 text-green-600 border-green-500/30' :
                                  report.type === 'Trimestriel' ? 'bg-purple-500/20 text-purple-600 border-purple-500/30' :
                                  'bg-orange-500/20 text-orange-600 border-orange-500/30'
                                }`}>
                                  {report.type}
                                </Badge>
                                <span className="font-medium">{report.size}</span>
                                <span>{new Date(report.generatedAt).toLocaleDateString('fr-FR')}</span>
                                {report.downloads > 0 && (
                                  <span className="flex items-center space-x-1">
                                    <Download className="w-3 h-3" />
                                    <span>{report.downloads}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-4">
                            {/* Status Badge */}
                            <Badge className={`px-4 py-2 rounded-full font-bold border backdrop-blur-sm ${
                              report.status === 'Prêt' 
                                ? 'bg-green-500/20 text-green-600 border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                            }`}>
                              {report.status === 'Prêt' && <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-green-500 rounded-full mr-2"
                              />}
                              {report.status}
                            </Badge>
                            
                            {/* Download Button */}
                            {report.status === 'Prêt' && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button className={`px-6 py-3 bg-gradient-to-r ${report.color} hover:opacity-90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center space-x-2`}>
                                  <Download className="w-4 h-4" />
                                  <span>Télécharger</span>
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar for In Progress Reports */}
                        {report.status === 'En cours' && (
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Génération en cours...</span>
                              <span>73%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${report.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: '73%' }}
                                transition={{ delay: index * 0.1 + 1, duration: 1.5 }}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
