import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { DiscoverSessionCardData } from "../../types";

import SessionCard from "./SessionCard";

import { TrendingUp } from "lucide-react";

interface FeaturedSessionsProps {
  sessions: DiscoverSessionCardData[];
}

const FeaturedSessions = ({ sessions }: FeaturedSessionsProps) => {
  const i18n = useI18n();

  if (sessions.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          {i18n.featured.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} isFeatured={true} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSessions;
