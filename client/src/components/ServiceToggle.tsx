import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ServiceToggleProps {
  active: boolean;
}

export default function ServiceToggle({ active }: ServiceToggleProps) {
  const [isActive, setIsActive] = useState(active);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const toggleService = async () => {
    setIsPending(true);
    
    try {
      await apiRequest('POST', '/api/config', {
        serviceActive: !isActive
      });
      
      setIsActive(!isActive);
      toast({
        title: isActive ? "Service Stopped" : "Service Started",
        description: isActive 
          ? "The service has been deactivated successfully." 
          : "The service has been activated successfully.",
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/config'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
      });
      console.error("Failed to toggle service status:", error);
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <div className="flex items-center">
      <span className="mr-3 text-sm font-medium text-gray-900">Service Status:</span>
      <Switch 
        checked={isActive} 
        onCheckedChange={toggleService}
        disabled={isPending}
        className={isActive ? "bg-green-500" : ""}
      />
    </div>
  );
}
