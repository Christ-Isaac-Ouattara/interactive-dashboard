"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  Bell,
  Calendar,
  MessageSquare,
  ChevronLeft,
  LogOut,
  ClipboardList,
  PieChart,
  Sparkles,
  Zap,
} from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "quizzes",
    label: "Questionnaires",
    icon: ClipboardList,
    href: "/dashboard/quizzes",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "responses",
    label: "Réponses",
    icon: FileText,
    href: "/dashboard/responses",
    badge: 12,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "analytics",
    label: "Analyses",
    icon: PieChart,
    href: "/dashboard/analytics",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "users",
    label: "Participants",
    icon: Users,
    href: "/dashboard/users",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "reports",
    label: "Rapports",
    icon: BarChart3,
    href: "/dashboard/reports",
    gradient: "from-teal-500 to-blue-500",
  },
  // {
  //   id: "calendar",
  //   label: "Calendrier",
  //   icon: Calendar,
  //   href: "/dashboard/calendar",
  //   gradient: "from-rose-500 to-pink-500",
  // },
  // {
  //   id: "messages",
  //   label: "Messages",
  //   icon: MessageSquare,
  //   href: "/dashboard/messages",
  //   badge: 3,
  //   gradient: "from-yellow-500 to-orange-500",
  // },
  // {
  //   id: "notifications",
  //   label: "Notifications",
  //   icon: Bell,
  //   href: "/dashboard/notifications",
  //   gradient: "from-violet-500 to-purple-500",
  // },
  // {
  //   id: "settings",
  //   label: "Paramètres",
  //   icon: Settings,
  //   href: "/dashboard/settings",
  //   gradient: "from-gray-500 to-slate-500",
  // },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? 100 : 260,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      className="relative h-screen flex flex-col overflow-hidden "
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/20 dark:via-gray-800/10 dark:to-transparent backdrop-blur-2xl" />

      {/* Neumorphism Container */}
      <div className="relative h-full bg-white/20 dark:bg-gray-900/20 border-r border-white/30 dark:border-gray-700/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col">
        {/* Header with Logo */}
        <motion.div
          className="p-5 border-b border-white/20 dark:border-gray-700/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  {/* Glassmorphic Logo */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-sm"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      QuizPro
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Dashboard 
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="w-10 h-10 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* User Profile Section */}
        {/* <motion.div 
          className="p-6 border-b border-white/20 dark:border-gray-700/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center space-x-4">

            <div className="relative">
              <Avatar className="w-14 h-14 ring-4 ring-white/30 dark:ring-gray-700/30 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]">
                <AvatarImage className='object-cover' src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"
              />
            </div>
            
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {user?.role}
                    </span>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div> */}

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto scrollbar-hide scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            const showBadge =
              item.id === "notifications" ? unreadCount > 0 : item.badge;
            const badgeCount =
              item.id === "notifications" ? unreadCount : item.badge;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative group w-full flex items-center px-4 py-4 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden",
                      isActive
                        ? "bg-white/40 dark:bg-gray-800/40 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.2)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)]" 
                        : "hover:bg-white/20 dark:hover:bg-gray-800/20 hover:shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.1)]"
                    )}
                  >
                    {/* Active Indicator */}
                    {/* {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b rounded-r-full",
                          item.gradient
                        )}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )} */}

                    {/* Icon Container */}
                    <div
                      className={cn(
                        "relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive
                          ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                          : "bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/40 dark:group-hover:bg-gray-700/40"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5 transition-colors duration-300",
                          isActive
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                        )}
                      />

                      {/* Icon Glow Effect */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 0.3, scale: 1 }}
                          className={cn(
                            "absolute inset-0 rounded-xl bg-gradient-to-br blur-md -z-10",
                            item.gradient
                          )}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <AnimatePresence mode="wait">
                      {!sidebarCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 flex items-center justify-between ml-2"
                        >
                          <span
                            className={cn(
                              "text-sm font-semibold transition-colors duration-300",
                              isActive
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                            )}
                          >
                            {item.label}
                          </span>

                          {/* Badge */}
                          {showBadge && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg",
                                item.id === "notifications"
                                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                                  : "bg-gradient-to-r from-blue-500 to-purple-500"
                              )}
                            >
                              {badgeCount}
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover Effect Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {/*}
        <motion.div
          className="p-6 border-t border-white/20 dark:border-gray-700/30 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          */}
          {/* Premium Badge */}
          {/* <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative p-4 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 backdrop-blur-sm overflow-hidden"
              >
                <motion.div
                  animate={{ 
                    background: [
                      "linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1))",
                      "linear-gradient(45deg, rgba(255,165,0,0.1), rgba(255,69,0,0.1))",
                      "linear-gradient(45deg, rgba(255,69,0,0.1), rgba(255,215,0,0.1))"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0"
                />
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-bold text-gray-800 dark:text-white">Premium</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Profitez de toutes les fonctionnalités avancées
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Upgrade
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}

          {/* Logout Button */}
          {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => {
                logout();
                router.push("/");
              }}
              variant="ghost"
              className={cn(
                "w-full flex items-center space-x-3 px-0 py-4  rounded-xl transition-all duration-300",
                "bg-white/20 dark:bg-gray-800/20 hover:bg-red-500/20 dark:hover:bg-red-500/20",
                "border border-white/20 dark:border-gray-700/30 hover:border-red-500/30",
                "shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.1)]",
                "dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)]",
                "hover:shadow-[4px_4px_8px_rgba(220,38,38,0.2),-4px_-4px_8px_rgba(255,255,255,0.1)]",
                "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold"
                  >
                    Déconnexion
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div> */}
          {/*
                    </motion.div>

          */}
      </div>

      {/* Floating Particles Effect */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div> */}
    </motion.aside>
  );
}
