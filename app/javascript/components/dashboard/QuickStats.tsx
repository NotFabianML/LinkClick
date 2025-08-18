import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Card, CardContent } from "../ui/card";
import { TrendingUp } from "lucide-react";

interface StatsData {
  sessions_completed: number;
  hours_learned: number;
  connections: number;
  skills_acquired: number;
}

interface QuickStatsProps {
  stats: StatsData;
}

const QuickStats = ({ stats }: QuickStatsProps) => {
  const i18n = useI18n();

  const statItems = [
    { label: i18n.stats.sessions_completed, value: stats.sessions_completed },
    { label: i18n.stats.hours_learned, value: stats.hours_learned },
    { label: i18n.stats.connections, value: stats.connections },
    { label: i18n.stats.skills_acquired, value: stats.skills_acquired },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
        <TrendingUp className="h-6 w-6 text-primary" />
        {i18n.progress_title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <Card
            key={item.label}
            className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg"
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickStats;
