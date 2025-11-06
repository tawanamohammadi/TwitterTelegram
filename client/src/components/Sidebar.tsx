import { useLocation, Link } from "wouter";
import { RefreshCw, Home, Settings, History, HelpCircle, CircleUser } from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;
  
  return (
    <div className="flex flex-col flex-grow bg-primary text-white shadow-lg h-full">
      <div className="flex items-center justify-center h-16 px-4 border-b border-blue-700">
        <RefreshCw className="mr-2 h-5 w-5" />
        <h1 className="text-xl font-medium">UNFEM Sync</h1>
      </div>
      
      <div className="flex-grow flex flex-col py-4">
        <nav className="flex-1 px-2 space-y-1">
          <Link href="/" className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`}>
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link href="/configuration" className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/configuration') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`}>
            <Settings className="mr-3 h-5 w-5" />
            Configuration
          </Link>
          
          <Link href="/logs" className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/logs') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`}>
            <History className="mr-3 h-5 w-5" />
            Logs
          </Link>
          
          <Link href="/help" className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/help') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`}>
            <HelpCircle className="mr-3 h-5 w-5" />
            Help
          </Link>
        </nav>
      </div>
      
      <div className="px-4 py-3 border-t border-blue-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center">
              <CircleUser className="h-5 w-5" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-blue-200">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
