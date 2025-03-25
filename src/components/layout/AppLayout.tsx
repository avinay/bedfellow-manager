
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageTransition from "./PageTransition";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 ml-[280px]">
        <Header title={title} />
        <main className="p-6">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
