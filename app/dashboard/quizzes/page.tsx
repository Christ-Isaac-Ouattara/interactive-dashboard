'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreHorizontal, Play, Pause, Edit, Trash2 } from 'lucide-react';
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
  'active': { label: 'Actif', color: 'bg-green-100 text-green-800 border-green-200' },
  'draft': { label: 'Brouillon', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  'completed': { label: 'Terminé', color: 'bg-blue-100 text-blue-800 border-blue-200' }
};

export default function QuizzesPage() {
  const { data: quizzes, isLoading } = useQuizzes();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Questionnaires
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Gérez vos questionnaires et quiz
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Quiz
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un questionnaire..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>

            {/* Quiz List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {quizzes?.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                              {quiz.title}
                            </CardTitle>
                            <Badge className={cn("text-xs", statusConfig[quiz.status].color)}>
                              {statusConfig[quiz.status].label}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
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
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {quiz.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Réponses</span>
                            <span className="font-medium">{quiz.responses}</span>
                          </div>
                          
                          {quiz.averageScore && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Score moyen</span>
                              <span className="font-medium">{quiz.averageScore.toFixed(1)}%</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Créé le</span>
                            <span className="font-medium">
                              {new Date(quiz.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                          >
                            Voir les détails
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}