
import React from "react";
import { Bell, HelpCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
      <div className="flex items-center justify-between p-4">
        <motion.h1 
          className="text-2xl font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 py-2 pr-4 rounded-full bg-secondary h-10 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <button className="rounded-full p-2 hover:bg-secondary relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <button className="rounded-full p-2 hover:bg-secondary">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
