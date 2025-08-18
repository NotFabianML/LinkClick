import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { UserProfileData } from "../../types";

import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { Github, Linkedin } from "lucide-react";

interface UserProfileSidebarProps {
  user: UserProfileData;
  isCurrentUser: boolean;
}

const UserProfileSidebar = ({
  user,
  isCurrentUser,
}: UserProfileSidebarProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const userInitials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  const handleEditProfileClick = () => {
    navigate("/profile");
  };

  // TODO: Make it dummy-proof
  // This function assumes the username is valid and does not contain special characters
  const getFullLinkedInUrl = (username: string) => `https://linkedin.com/in/${username}`;
  const getFullGitHubUrl = (username: string) => `https://github.com/${username}`;

  return (
    <Card className="sticky top-24 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.email}`}
              alt={fullName}
            />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <Badge
              variant={user.role === "Teacher" ? "default" : "secondary"}
              className="mt-2"
            >
              {user.role}
            </Badge>
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {user.linkedin_url && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={getFullLinkedInUrl(user.linkedin_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-turbo="false"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
            {user.github_url && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={getFullGitHubUrl(user.github_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-turbo="false"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Conditional button to edit profile */}
          {isCurrentUser && (
            <Button onClick={handleEditProfileClick} className="w-full">
              {i18n.sidebar.edit_profile_button}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSidebar;
