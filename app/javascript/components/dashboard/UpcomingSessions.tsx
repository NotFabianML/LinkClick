import React from "react";
import { UpcomingSession } from "../../types";
import { useI18n } from "../../contexts/I18nContext";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import SessionCard from "./SessionCard";

import { Calendar } from "lucide-react";

interface UpcomingSessionsProps {
  sessions: UpcomingSession[];
}

const UpcomingSessions = ({ sessions }: UpcomingSessionsProps) => {
  const i18n = useI18n();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
        <Calendar className="h-6 w-6 text-primary" />
        {i18n.upcoming_sessions_title}
      </h2>
      {sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2 text-foreground">
              {i18n.empty_states.no_upcoming_sessions}
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              {i18n.empty_states.no_sessions_subtitle}
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {i18n.empty_states.browse_sessions_button}
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default UpcomingSessions;
