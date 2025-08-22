import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { UserProfileData } from "../../types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Shield, Eye, EyeOff } from "lucide-react";

interface PrivacyTabContentProps {
  privacy: UserProfileData["privacy"];
  onSettingChange: (key: string, value: any) => void;
}

const PrivacyTabContent = ({
  privacy,
  onSettingChange,
}: PrivacyTabContentProps) => {
  const i18n = useI18n();

  const switchItems = [
    { key: "show_email", labels: i18n.privacy_tab.show_email },
    { key: "show_phone", labels: i18n.privacy_tab.show_phone },
    { key: "show_activity", labels: i18n.privacy_tab.show_activity },
    { key: "allow_messages", labels: i18n.privacy_tab.allow_messages },
  ];

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          {i18n.privacy_tab.title}
        </CardTitle>
        <CardDescription>{i18n.privacy_tab.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Profile Visibility Select */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            {i18n.privacy_tab.profile_visibility.label}
          </Label>
          <Select
            value={privacy.profile_visibility}
            onValueChange={(value) =>
              onSettingChange("privacy.profile_visibility", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public_profile">
                {i18n.privacy_tab.profile_visibility.options.public}
              </SelectItem>
              <SelectItem value="connections_only">
                {i18n.privacy_tab.profile_visibility.options.connections}
              </SelectItem>
              <SelectItem value="private_profile">
                {i18n.privacy_tab.profile_visibility.options.private}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Privacy Options - Switches */}
        {switchItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium flex items-center gap-2">
                {privacy[item.key as keyof typeof privacy] ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                {item.labels.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {item.labels.description}
              </p>
            </div>
            <Switch
              checked={Boolean(privacy[item.key as keyof typeof privacy])}
              onCheckedChange={(checked) =>
                onSettingChange(`privacy.${item.key}`, checked)
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrivacyTabContent;
