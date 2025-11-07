import { Outlet } from "wouter";
import Sidebar from "./Sidebar";
import { Globe, Github, Mail } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <footer className="border-t bg-white px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span>© 2025 TwitterTelegram by</span>
              <a
                href="https://tawana.online"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Tawana Mohammadi
                <Globe className="h-3 w-3" />
              </a>
              <span className="hidden md:inline">•</span>
              <span className="text-gray-500">AI Researcher & Data Strategist</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tawanamohammadi/TwitterTelegram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-1"
                title="View on GitHub"
              >
                <Github className="h-4 w-4" />
                <span className="text-xs">Open Source</span>
              </a>
              <a
                href="mailto:info@tawana.online"
                className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-1"
                title="Contact Developer"
              >
                <Mail className="h-4 w-4" />
                <span className="text-xs">Contact</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}