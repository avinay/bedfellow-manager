
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Hotel,
  Users,
  Ticket,
  Utensils,
  Settings,
  BarChart3,
  HelpCircle,
  Bell,
  LogOut
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/rooms", name: "Rooms & Beds", icon: <Hotel size={20} /> },
    { path: "/guests", name: "Guests", icon: <Users size={20} /> },
    { path: "/tickets", name: "Facility Tickets", icon: <Ticket size={20} /> },
    { path: "/kitchen", name: "Kitchen & Menu", icon: <Utensils size={20} /> },
    { path: "/reports", name: "Reports", icon: <BarChart3 size={20} /> },
    { path: "/settings", name: "Settings", icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-screen bg-sidebar fixed left-0 top-0 border-r border-border z-50 flex flex-col"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence initial={false} mode="wait">
          {!collapsed && (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                BM
              </div>
              <span className="font-semibold text-lg">BedManager</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="rounded-full p-1.5 hover:bg-secondary transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2.5 rounded-lg",
                  "transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-foreground"
                )
              }
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              <AnimatePresence initial={false} mode="wait">
                {!collapsed && (
                  <motion.span
                    key={`text-${item.path}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Users size={16} />
          </div>
          <AnimatePresence initial={false} mode="wait">
            {!collapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-hidden"
              >
                <p className="font-medium text-sm truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
