import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const pageNames: Record<string, string> = {
  "/": "Service Dashboard",
  "/configuration": "Configuration",
  "/logs": "Logs",
  "/help": "Help"
};

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      {/* Mobile header */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="px-4 text-gray-500">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          
          <div className="flex-1 flex justify-center items-center px-4">
            <div className="flex items-center">
              <span className="material-icons text-primary mr-2">sync</span>
              <h1 className="text-xl font-medium">UNFEM Sync</h1>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {pageNames[location] || "Page Not Found"}
                </h1>
              </div>
              
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
