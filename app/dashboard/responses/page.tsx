'use client';

import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, MoreHorizontal } from 'lucide-react';
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
  if (score >= 80) return 'text-green-600 bg-green-50';
  if (score >= 60) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
};

export default function ResponsesPage() {
  const { data: responses, isLoading } = useQuizResponses();

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
                  Réponses aux Quiz
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Analysez les réponses et performances des participants
                </p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par participant..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>

            {/* Responses Table */}
            <Card>
              <CardHeader>
                <CardTitle>Dernières Réponses</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Participant</TableHead>
                          <TableHead>Quiz</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Temps</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {responses?.map((response, index) => (
                          <motion.tr
                            key={response.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`} />
                                  <AvatarFallback>
                                    {response.userName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{response.userName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">Quiz #{response.quizId}</span>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("text-xs font-medium", getScoreColor(response.score))}>
                                {response.score}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {response.timeSpent} min
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {new Date(response.completedAt).toLocaleDateString()}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Voir les détails
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" />
                                    Exporter
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}