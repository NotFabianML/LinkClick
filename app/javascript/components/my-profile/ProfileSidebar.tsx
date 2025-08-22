import React from "react";
import { UserProfileData } from "../../types";
import { useI18n } from "../../contexts/I18nContext";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { Star } from "lucide-react";

interface ProfileSidebarProps {
  user: UserProfileData;
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const i18n = useI18n();
  const userInitials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  return (
    <Card className="sticky top-24 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg mx-auto">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.email}`}
              alt={fullName}
            />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mt-4">{fullName}</h2>
          <Badge className="mt-2">{user.role}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {user.stats.sessions_joined}
            </div>
            <div className="text-xs text-muted-foreground">
              {i18n.sidebar.sessions}
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-bold">{user.stats.rating}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {i18n.sidebar.rating}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
