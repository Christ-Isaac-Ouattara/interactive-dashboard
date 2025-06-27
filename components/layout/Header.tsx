"use client";

import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useDashboardStore } from "@/store/dashboardStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useDashboardStore();
  const { notifications, unreadCount, markAsRead } = useNotificationStore();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const recentNotifications = notifications.slice(0, 5);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full "
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30" />

      {/* Neumorphism Container */}
      <div className="relative bg-gradient-to-r from-white/10 to-gray-50/10 dark:from-gray-800/10 dark:to-gray-900/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="flex h-20 items-center px-8 gap-6">
          {/* Mobile Menu - Neumorphic Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="w-12 h-12 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Button>
          </motion.div>

          {/* Search Bar - Glassmorphic */}
          <motion.div
            className="flex-1 max-w-2xl relative"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors group-focus-within:text-blue-500" />
              <Input
                placeholder="Rechercher dans le dashboard..."
                className="pl-12 pr-4 h-14 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.1)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.02)] text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-300"
              />
            </div>
          </motion.div>

          <div className="flex-1"></div>
          {/* Actions Container */}
          <motion.div
            className="flex justify-end items-center space-x-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Theme Toggle - Neumorphic */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-12 h-12 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-600" />
                  )}
                </motion.div>
              </Button>
            </motion.div>

            {/* Notifications - Glassmorphic */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-12 h-12 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.15)] transition-all duration-300 relative"
                  >
                    <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="destructive"
                          className="w-6 h-6 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white dark:border-gray-800 shadow-lg"
                        >
                          {unreadCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-96 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl rounded-3xl p-0 overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/10">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {unreadCount} nouvelles notifications
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentNotifications.length > 0 ? (
                    recentNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <DropdownMenuItem
                          className="p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-gray-800/20 border-b border-white/10 last:border-b-0"
                          onClick={() =>
                            !notification.read && markAsRead(notification.id)
                          }
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {new Date(
                                notification.timestamp
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Aucune notification</p>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile - Glassmorphic */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    className="h-12 px-4 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.15)] transition-all duration-300"
                  >
                    <Avatar className="w-8 h-8 mr-3 ring-2 ring-white/30 dark:ring-gray-700/30">
                      <AvatarImage
                        src={user?.avatar}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-800 dark:text-white hidden sm:block">
                      {user?.name}
                    </span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl rounded-3xl p-2"
              >
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 ring-2 ring-blue-500/30">
                      <AvatarImage
                        className="object-cover"
                        src={user?.avatar}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>
                <DropdownMenuItem className="p-3 rounded-2xl hover:bg-white/20 dark:hover:bg-gray-800/20 cursor-pointer">
                  <User className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-800 dark:text-white">
                    Mon Profil
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 rounded-2xl hover:bg-white/20 dark:hover:bg-gray-800/20 cursor-pointer">
                  <Settings className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-800 dark:text-white">
                    Paramètres
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20 dark:bg-gray-700/30" />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="p-3 rounded-2xl hover:bg-red-500/10 cursor-pointer text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-3 text-red-600 dark:text-red-400" />
                  <span className="text-sm">Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
