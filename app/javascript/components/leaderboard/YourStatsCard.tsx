import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { CurrentUserStats } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Target } from "lucide-react";

interface YourStatsCardProps {
  stats: CurrentUserStats;
}

const YourStatsCard = ({ stats }: YourStatsCardProps) => {
  const i18n = useI18n();
  const progressPercentage =
    (stats.totalPoints / stats.nextMilestone) * 100;

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          {i18n.sidebar.your_stats.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {stats.totalPoints.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {i18n.sidebar.your_stats.total_points}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-xl font-bold text-foreground">
              #{stats.rank}
            </div>
            <div className="text-xs text-muted-foreground">
              {i18n.sidebar.your_stats.rank}
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-xl font-bold text-foreground">
              {stats.sessions}
            </div>
            <div className="text-xs text-muted-foreground">
              {i18n.sidebar.your_stats.sessions}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {i18n.sidebar.your_stats.next_milestone}
            </span>
            <span className="font-medium">
              {stats.nextMilestone.toLocaleString()} pts
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YourStatsCard;
