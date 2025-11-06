import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RefreshCw, Send, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function ManualActions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCheckingNow, setIsCheckingNow] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const checkNow = async () => {
    setIsCheckingNow(true);
    
    try {
      await apiRequest('POST', '/api/check-now', {});
      
      toast({
        title: "Check Started",
        description: "Checking for new tweets. Results will appear in the activity logs.",
      });
      
      // Invalidate queries to refresh data
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/logs'] });
        queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      }, 2000);
    } catch (error) {
      console.error("Failed to start manual check:", error);
      toast({
        title: "Error",
        description: "Failed to start manual check. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingNow(false);
    }
  };
  
  const sendTestMessage = async () => {
    setIsSendingTest(true);
    
    try {
      await apiRequest('POST', '/api/test-telegram', {});
      
      toast({
        title: "Test Message Sent",
        description: "A test message has been sent to your Telegram channel.",
      });
      
      // Invalidate logs to show the new log entry
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/logs'] });
      }, 1000);
    } catch (error) {
      console.error("Failed to send test message:", error);
      toast({
        title: "Error",
        description: "Failed to send test message. Please check your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsSendingTest(false);
    }
  };
  
  const resetService = async () => {
    setIsResetting(true);
    
    try {
      await apiRequest('POST', '/api/reset', {});
      
      toast({
        title: "Service Reset",
        description: "The service has been reset successfully.",
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/logs'] });
    } catch (error) {
      console.error("Failed to reset service:", error);
      toast({
        title: "Error",
        description: "Failed to reset service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Actions</CardTitle>
        <CardDescription>Trigger service actions manually</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button 
            variant="default" 
            className="w-full"
            onClick={checkNow}
            disabled={isCheckingNow}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Check for New Tweets Now
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={sendTestMessage}
            disabled={isSendingTest}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Test Message
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isResetting}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Service
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset the service statistics. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetService}>
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
