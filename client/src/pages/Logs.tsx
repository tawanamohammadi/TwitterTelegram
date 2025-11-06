import LogsTimeline from "@/components/LogsTimeline";
import { Card, CardContent } from "@/components/ui/card";

export default function Logs() {
  return (
    <Card>
      <CardContent className="p-6">
        <LogsTimeline limit={20} showViewAll={false} />
      </CardContent>
    </Card>
  );
}
