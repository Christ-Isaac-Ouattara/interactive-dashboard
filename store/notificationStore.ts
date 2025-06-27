import { create } from 'zustand';
import { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau utilisateur',
    message: 'Un nouvel utilisateur s\'est inscrit sur la plateforme',
    type: 'info',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: '2',
    title: 'Commande terminée',
    message: 'La commande #1234 a été livrée avec succès',
    type: 'success',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: '3',
    title: 'Alerte système',
    message: 'Utilisation mémoire élevée détectée',
    type: 'warning',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true
  }
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };

    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },

  markAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    }));
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }));
  },

  removeNotification: (id) => {
    const { notifications, unreadCount } = get();
    const notification = notifications.find(n => n.id === id);
    
    set({
      notifications: notifications.filter(n => n.id !== id),
      unreadCount: notification && !notification.read ? unreadCount - 1 : unreadCount
    });
  },

  clearAll: () => {
    set({
      notifications: [],
      unreadCount: 0
    });
  }
}));