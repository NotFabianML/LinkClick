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

import { Settings } from "lucide-react";

interface AccountSettingsCardProps {
  settings: UserProfileData["settings"];
  onSettingChange: (key: string, value: boolean) => Promise<void>;
}

const AccountSettingsCard = ({
  settings,
  onSettingChange,
}: AccountSettingsCardProps) => {
  const i18n = useI18n();

  const settingItems = [
    {
      key: "email_notifications",
      labels: i18n.settings_tab.account_settings.email_notifications,
    },
    {
      key: "session_reminders",
      labels: i18n.settings_tab.account_settings.session_reminders,
    },
    {
      key: "connection_requests",
      labels: i18n.settings_tab.account_settings.connection_requests,
    },
    {
      key: "marketing_emails",
      labels: i18n.settings_tab.account_settings.marketing_emails,
    },
  ];

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          {i18n.settings_tab.account_settings.title}
        </CardTitle>
        <CardDescription>
          {i18n.settings_tab.account_settings.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {settingItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">
                {item.labels.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {item.labels.description}
              </p>
            </div>
            <Switch
              checked={settings[item.key as keyof typeof settings]}
              onCheckedChange={(checked) =>
                onSettingChange(`settings.${item.key}`, checked)
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AccountSettingsCard;
