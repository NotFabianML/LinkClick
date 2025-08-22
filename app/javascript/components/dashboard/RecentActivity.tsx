import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { RecentActivityDashboard } from "../../types";

import { Card, CardContent } from "../ui/card";

import {
  LucideIcon,
  Award,
  Users,
  MessageSquare,
  Activity,
} from "lucide-react";

interface RecentActivityProps {
  activities: RecentActivityDashboard[];
}

const activityIconMap: {
  [key in RecentActivityDashboard["type"]]: { icon: LucideIcon; color: string };
} = {
  session_completed: { icon: Award, color: "text-yellow-500" },
  connection_made: { icon: Users, color: "text-blue-500" },
  session_joined: { icon: MessageSquare, color: "text-green-500" },
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const i18n = useI18n();

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
        <Activity className="h-5 w-5 text-primary" />
        {i18n.recent_activity_title}
      </h2>
      <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4 space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => {
              const IconComponent = activityIconMap[activity.type].icon;
              const iconColor = activityIconMap[activity.type].color;

              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-muted/50 ${iconColor}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              {i18n.empty_states.no_activity}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default RecentActivity;
