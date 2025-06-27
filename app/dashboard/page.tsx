'use client';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={cn(
          "flex-1 overflow-y-auto p-6",
          "scrollbar-hide scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
        )}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Tableau de bord
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Vue d&apos;ensemble de vos données et activités
              </p>
            </div>
            <DashboardContent />
          </div>
        </main>
      </div>
    </div>
  );
}