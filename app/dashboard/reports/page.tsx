'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockReports = [
  {
    id: '1',
    title: 'Rapport Mensuel - Janvier 2025',
    description: 'Synthèse complète des performances des questionnaires',
    type: 'Mensuel',
    generatedAt: '2025-01-13',
    size: '2.4 MB',
    status: 'Prêt'
  },
  {
    id: '2',
    title: 'Analyse des Scores par Département',
    description: 'Comparaison des performances entre départements',
    type: 'Analytique',
    generatedAt: '2025-01-12',
    size: '1.8 MB',
    status: 'Prêt'
  },
  {
    id: '3',
    title: 'Rapport de Satisfaction Q4 2024',
    description: 'Résultats des enquêtes de satisfaction trimestrielles',
    type: 'Trimestriel',
    generatedAt: '2025-01-10',
    size: '3.1 MB',
    status: 'Prêt'
  },
  {
    id: '4',
    title: 'Tendances Annuelles 2024',
    description: 'Évolution des métriques sur l\'année écoulée',
    type: 'Annuel',
    generatedAt: '2025-01-08',
    size: '5.2 MB',
    status: 'En cours'
  }
];

const reportTypes = [
  {
    title: 'Rapport de Performance',
    description: 'Analyse détaillée des scores et temps de completion',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Rapport d\'Activité',
    description: 'Suivi de l\'engagement et de la participation',
    icon: Calendar,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Rapport Personnalisé',
    description: 'Créez un rapport selon vos critères spécifiques',
    icon: FileText,
    color: 'from-purple-500 to-purple-600'
  }
];

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Rapports et Exports
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Générez et téléchargez vos rapports d'analyse
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {reportTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {type.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Générer
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Rapports Récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {report.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {report.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {report.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {report.size}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(report.generatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={report.status === 'Prêt' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {report.status}
                        </Badge>
                        {report.status === 'Prêt' && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}