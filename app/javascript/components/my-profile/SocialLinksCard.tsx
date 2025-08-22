import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { UserProfileData } from "../../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Globe, Github, Linkedin } from "lucide-react";

interface SocialLinksCardProps {
  user: UserProfileData;
  isEditing: boolean;
  onUserChange: (updatedUser: UserProfileData) => void;
}

const SocialLinksCard = ({
  user,
  isEditing,
  onUserChange,
}: SocialLinksCardProps) => {
  const i18n = useI18n();

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    onUserChange({ ...user, [field]: value });
  };

  const socialFields = [
    {
      id: "website",
      label: i18n.profile_tab.social_links.website,
      placeholder: i18n.profile_tab.social_links.website_placeholder,
      icon: Globe,
    },
    {
      id: "github_url",
      label: i18n.profile_tab.social_links.github,
      placeholder: i18n.profile_tab.social_links.github_placeholder,
      icon: Github,
    },
    {
      id: "linkedin_url",
      label: i18n.profile_tab.social_links.linkedin,
      placeholder: i18n.profile_tab.social_links.linkedin_placeholder,
      icon: Linkedin,
    },
  ];

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          {i18n.profile_tab.social_links.title}
        </CardTitle>
        <CardDescription>
          {i18n.profile_tab.social_links.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {field.label}
              </Label>
              <Input
                id={field.id}
                value={
                  (user[field.id as keyof UserProfileData] as string) || ""
                }
                onChange={(e) =>
                  handleInputChange(
                    field.id as keyof UserProfileData,
                    e.target.value
                  )
                }
                disabled={!isEditing}
                placeholder={field.placeholder}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SocialLinksCard;
