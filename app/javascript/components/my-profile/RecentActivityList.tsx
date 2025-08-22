import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { RecentActivity } from "../../types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

import { MessageSquare, Activity, Award, Users } from "lucide-react";

interface RecentActivityListProps {
  activities: RecentActivity[];
}

const RecentActivityList = ({ activities }: RecentActivityListProps) => {
  const i18n = useI18n();

  const iconMap: { [key in RecentActivity["type"]]: React.ElementType } = {
    session: MessageSquare,
    achievement: Award,
    connection: Users,
  };

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {i18n.activity_tab.recent_activity.title}
        </CardTitle>
        <CardDescription>
          {i18n.activity_tab.recent_activity.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const Icon = iconMap[activity.type];
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                >
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {activity.date}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              {i18n.activity_tab.recent_activity.empty}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
