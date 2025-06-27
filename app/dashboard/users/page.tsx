'use client';

import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, MoreHorizontal, Mail, Phone } from 'lucide-react';
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

const mockUsers = [
  {
    id: '1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Participant',
    quizzesCompleted: 12,
    averageScore: 85.2,
    lastActivity: '2025-01-13'
  },
  {
    id: '2',
    name: 'Bob Dupont',
    email: 'bob.dupont@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Administrateur',
    quizzesCompleted: 8,
    averageScore: 92.1,
    lastActivity: '2025-01-13'
  },
  {
    id: '3',
    name: 'Claire Rousseau',
    email: 'claire.rousseau@example.com',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Participant',
    quizzesCompleted: 15,
    averageScore: 78.9,
    lastActivity: '2025-01-12'
  },
  {
    id: '4',
    name: 'David Moreau',
    email: 'david.moreau@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Modérateur',
    quizzesCompleted: 6,
    averageScore: 88.7,
    lastActivity: '2025-01-11'
  }
];

export default function UsersPage() {
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
                  Participants
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Gérez les utilisateurs et leurs performances
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Inviter un utilisateur
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un participant..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>

            {/* Users Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mockUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg font-semibold">
                              {user.name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Envoyer un email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="w-4 h-4 mr-2" />
                              Voir le profil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                              {user.quizzesCompleted}
                            </p>
                            <p className="text-xs text-gray-500">Quiz complétés</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                              {user.averageScore}%
                            </p>
                            <p className="text-xs text-gray-500">Score moyen</p>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-500">
                            Dernière activité: {new Date(user.lastActivity).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}