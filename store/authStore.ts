import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Sophie Martin',
  email: 'sophie@example.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  role: 'Admin',
  lastLogin: new Date().toISOString()
};

export const useAuthStore = create<AuthState>()(
  
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication - accept any email/password
        if (email && password) {
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...userData } 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);