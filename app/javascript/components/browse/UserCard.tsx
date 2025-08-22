import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { BrowseUser } from "../../types";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { Star } from "lucide-react";

interface UserCardProps {
  user: BrowseUser;
}

const UserCard = ({ user }: UserCardProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const handleCardClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer group">
      <Card className="bg-card/50 backdrop-blur-sm border-0 group-hover:bg-card/70 transition-all duration-300 shadow-lg h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {user.name}
              </h3>
              <Badge
                variant={user.role === "Teacher" ? "default" : "secondary"}
              >
                {user.role}
              </Badge>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-muted-foreground">
                  {user.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {user.sessions} sessions
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {i18n.results.top_interests}
            </p>
            <div className="flex flex-wrap gap-1">
              {user.topInterests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCard;
