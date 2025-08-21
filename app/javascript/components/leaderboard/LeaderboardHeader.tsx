import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Trophy } from "lucide-react";

interface LeaderboardHeaderProps {
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
}

const LeaderboardHeader = ({
  timePeriod,
  onTimePeriodChange,
}: LeaderboardHeaderProps) => {
  const i18n = useI18n();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            {i18n.header.title}
          </h1>
          <p className="text-muted-foreground mt-2">{i18n.header.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timePeriod} onValueChange={onTimePeriodChange}>
            <SelectTrigger className="w-40 bg-card/50 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(i18n.header.time_periods).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {String(label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
