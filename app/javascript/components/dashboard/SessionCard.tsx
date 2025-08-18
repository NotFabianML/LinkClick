import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { UpcomingSession } from "../../types";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Calendar, Clock, Users } from "lucide-react";

interface SessionCardProps {
  session: UpcomingSession;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

   const handleJoinClick = () => {
    navigate(`/sessions/${session.id}`);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {session.title}
            </h3>
            <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {session.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {session.time}
              </span>
              <Badge variant="outline" className="text-xs">
                {session.type}
              </Badge>
              <Badge
                variant={
                  session.difficulty === "Advanced"
                    ? "destructive"
                    : session.difficulty === "Intermediate"
                    ? "default"
                    : "secondary"
                }
                className="text-xs"
              >
                {session.difficulty}
              </Badge>
            </div>
          </div>
           <Button 
            onClick={handleJoinClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {i18n.session_card.join_button}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div className="flex -space-x-2">
            {session.participants.map((participant, index) => (
              <Avatar
                key={index}
                className="h-8 w-8 border-2 border-background"
              >
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback className="text-xs">
                  {participant.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {session.participants_count_text}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
