import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { UserProfileData } from "../../types";

import { Card, CardContent } from "../ui/card";

import { MessageSquare, Clock, Users } from "lucide-react";

interface ActivityStatsGridProps {
  stats: UserProfileData["stats"];
}

const ActivityStatsGrid = ({ stats: userStats }: ActivityStatsGridProps) => {
  const i18n = useI18n();

  const statsData = [
    {
      icon: MessageSquare,
      value: userStats.sessions_joined,
      label: i18n.activity_tab.stats.sessions_participated,
      color: "blue",
    },
    {
      icon: Clock,
      value: userStats.hours_learned,
      label: i18n.activity_tab.stats.hours_learned,
      color: "green",
    },
    {
      icon: Users,
      value: userStats.connections,
      label: i18n.activity_tab.stats.connections,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat) => (
        <Card
          key={stat.label}
          className={`shadow-lg border-0 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-950 dark:to-${stat.color}-900`}
        >
          <CardContent className="p-6 text-center">
            <stat.icon
              className={`h-8 w-8 text-${stat.color}-600 mx-auto mb-2`}
            />
            <div
              className={`text-2xl font-bold text-${stat.color}-700 dark:text-${stat.color}-300`}
            >
              {stat.value}
            </div>
            <div className={`text-sm text-${stat.color}-600`}>{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActivityStatsGrid;
