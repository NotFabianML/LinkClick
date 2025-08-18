import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { DiscoverSessionCardData } from "../../types";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  Star,
  Calendar,
  Clock,
  Video,
  Users2,
  Eye,
  BookOpen,
  Zap,
  GraduationCap,
  Briefcase,
  MessageSquare,
} from "lucide-react";

const typeIconMap: { [key: string]: React.ElementType } = {
  Workshop: BookOpen,
  "Quick Tutoring": Zap,
  "Study Group": GraduationCap,
  Project: Briefcase,
  Discussion: MessageSquare,
  Tutorial: BookOpen,
};

interface SessionCardProps {
  session: DiscoverSessionCardData;
  isFeatured?: boolean;
}

const SessionCard = ({ session, isFeatured = false }: SessionCardProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();
  const TypeIcon = typeIconMap[session.type] || BookOpen;

  const handleJoinSession = () => {
    // TODO: Implement join session logic
    console.log(`Joining session ${session.id}`);
  };

  const handleViewDetails = () => {
    navigate(`/sessions/${session.id}`);
  };

  return (
    <Card
      className={`bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col ${
        isFeatured
          ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
          : ""
      }`}
    >
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <TypeIcon className="h-4 w-4 text-primary" />
            <Badge variant="outline" className="text-xs">
              {session.type}
            </Badge>
          </div>
          <Badge
            variant={
              session.difficulty === "Advanced"
                ? "destructive"
                : session.difficulty === "Intermediate"
                ? "default"
                : "secondary"
            }
          >
            {session.difficulty}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2">
          {session.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {session.description}
        </p>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.host_avatar} alt={session.host} />
            <AvatarFallback className="text-xs">
              {session.host_initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">
              {session.host}
            </p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">
                {session.host_rating}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2 mb-4 mt-auto pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {session.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {session.time}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              {session.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users2 className="h-4 w-4" />
              {session.current_participants}/{session.max_participants}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <Button className="flex-1" onClick={handleJoinSession}>
            {i18n.results.join_button}
          </Button>
          <Button variant="outline" size="icon" onClick={handleViewDetails}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {session.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {session.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              {i18n.results.skills_more.replace(
                "%{count}",
                (session.skills.length - 3).toString()
              )}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
