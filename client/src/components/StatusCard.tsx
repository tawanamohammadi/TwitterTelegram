import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatusCardProps {
  icon: ReactNode;
  iconColor: string;
  title: string;
  value: string;
}

export default function StatusCard({ icon, iconColor, title, value }: StatusCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconColor} rounded-md p-3`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
