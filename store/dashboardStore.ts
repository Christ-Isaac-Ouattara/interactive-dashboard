import { create } from 'zustand';

interface DashboardState {
  sidebarCollapsed: boolean;
  activeTab: string;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  toggleTheme: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarCollapsed: false,
  activeTab: 'dashboard',
  theme: 'light',

  toggleSidebar: () => {
    set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  toggleTheme: () => {
    set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
  }
}));