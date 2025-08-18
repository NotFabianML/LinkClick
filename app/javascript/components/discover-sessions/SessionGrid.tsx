import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { DiscoverSessionCardData } from "../../types";

import { Button } from "../ui/button";
import SessionCard from "./SessionCard";

import { Calendar, Plus } from "lucide-react";

interface SessionGridProps {
  sessions: DiscoverSessionCardData[];
  loading: boolean;
  error: string | null;
  onClearFilters: () => void;
}

const SessionGrid = ({
  sessions,
  loading,
  error,
  onClearFilters,
}: SessionGridProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  if (loading) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Loading sessions...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-destructive py-12">{error}</p>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          {i18n.results.no_sessions_found}
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onClearFilters}>
            {i18n.filters.clear_button}
          </Button>
          <Button onClick={() => navigate("/sessions/new")}>
            <Plus className="h-4 w-4 mr-2" />
            {i18n.header.create_button}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {i18n.results.title}
        </h2>
        <p className="text-muted-foreground">
          {sessions.length === 1
            ? i18n.results.sessions_found.one
            : i18n.results.sessions_found.other.replace(
                "%{count}",
                sessions.length.toString()
              )}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default SessionGrid;
