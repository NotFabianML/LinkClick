import React from "react";
import YourStatsCard from "./YourStatsCard";
import AchievementsCard from "./AchievementsCard";
import { Card, CardContent } from "../ui/card";
import { TrendingUp } from "lucide-react";
import { useI18n } from "../../contexts/I18nContext";

const LeaderboardSidebar = () => {
  const i18n = useI18n();

  return (
    <div className="lg:col-span-1 space-y-6">
      <YourStatsCard />
      <AchievementsCard />

      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            +15%
          </div>
          <div className="text-sm text-blue-600">
            {i18n.sidebar.quick_stats.growth}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardSidebar;
