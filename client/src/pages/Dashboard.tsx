import { useQuery } from "@tanstack/react-query";
import { Timer, Send, Clock } from "lucide-react";
import StatusCard from "@/components/StatusCard";
import LogsTimeline from "@/components/LogsTimeline";
import ServiceToggle from "@/components/ServiceToggle";
import ManualActions from "@/components/ManualActions";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  id: number;
  tweetsForwarded: number;
  serviceStartTime: string;
  lastReset: string;
  uptime: number;
  nextCheck: number;
}

interface Config {
  serviceActive: boolean;
}

export default function Dashboard() {
  const { data: stats, isLoading: isLoadingStats } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });
  
  const { data: config, isLoading: isLoadingConfig } = useQuery<Config>({
    queryKey: ['/api/config'],
  });
  
  // Format uptime
  const formatUptime = (seconds: number) => {
    if (!seconds) return "N/A";
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (days === 0 && minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    
    return parts.join(', ');
  };
  
  // Format next check
  const formatNextCheck = (seconds: number) => {
    if (!seconds) return "N/A";
    
    if (seconds < 60) {
      return "Less than a minute";
    }
    
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {isLoadingConfig ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          config && <ServiceToggle active={config.serviceActive} />
        )}
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {isLoadingStats ? (
          <>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <StatusCard
              icon={<Timer className="h-5 w-5 text-white" />}
              iconColor="bg-primary"
              title="Service Uptime"
              value={formatUptime(stats?.uptime || 0)}
            />
            
            <StatusCard
              icon={<Send className="h-5 w-5 text-white" />}
              iconColor="bg-amber-500"
              title="Tweets Forwarded"
              value={stats?.tweetsForwarded.toString() || "0"}
            />
            
            <StatusCard
              icon={<Clock className="h-5 w-5 text-white" />}
              iconColor="bg-teal-500"
              title="Next Check In"
              value={formatNextCheck(stats?.nextCheck || 0)}
            />
          </>
        )}
      </div>
      
      {/* Activity and Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <LogsTimeline limit={5} />
          </CardContent>
        </Card>
        
        <ManualActions />
      </div>
    </div>
  );
}
