import { Check, AlertCircle, SendHorizontal, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Log {
  id: number;
  type: string;
  message: string;
  details?: string;
  timestamp: string;
}

interface LogsTimelineProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function LogsTimeline({ limit = 5, showViewAll = true }: LogsTimelineProps) {
  const { data: logs, isLoading, isError, refetch } = useQuery<Log[]>({
    queryKey: ['/api/logs'],
  });
  
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <SendHorizontal className="h-4 w-4 text-primary" />;
    }
  };
  
  const getLogIconClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'error':
        return 'bg-red-100';
      case 'warning':
        return 'bg-amber-100';
      default:
        return 'bg-blue-100';
    }
  };
  
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, 'MMM d, HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  if (isLoading) {
    return (
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <div className="relative pb-8">
                {i < 2 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <Skeleton className="h-4 w-64 mb-2" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="py-4 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <h3 className="text-lg font-medium text-gray-900">Error loading logs</h3>
        <p className="mt-1 text-sm text-gray-500">Failed to load activity logs.</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flow-root">
      <div className="flex justify-between mb-4 items-center">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => refetch()} 
          className="h-8"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      {logs && logs.length > 0 ? (
        <ul role="list" className="-mb-8">
          {logs.slice(0, limit).map((log, idx) => (
            <li key={log.id}>
              <div className="relative pb-8">
                {idx < logs.slice(0, limit).length - 1 && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full ${getLogIconClass(log.type)} flex items-center justify-center ring-8 ring-white`}>
                      {getLogIcon(log.type)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-800">
                        {log.message}
                        {log.details && (
                          <span className="font-medium text-gray-900 ml-1">
                            {log.details}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={log.timestamp}>
                        {formatDate(log.timestamp)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No activity logs found
        </div>
      )}
      
      {showViewAll && logs && logs.length > limit && (
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/logs'}
          >
            View all activity logs
          </Button>
        </div>
      )}
    </div>
  );
}
