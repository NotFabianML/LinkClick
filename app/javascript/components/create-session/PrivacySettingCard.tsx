import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Control, Controller } from "react-hook-form";
import { CreateSessionFormData } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

import { Users } from "lucide-react";

interface PrivacySettingsCardProps {
  control: Control<CreateSessionFormData>;
}

const PrivacySettingsCard = ({ control }: PrivacySettingsCardProps) => {
  const i18n = useI18n();

  const privacyOptions: (keyof CreateSessionFormData)[] = [
    "is_public",
    "allow_recording",
    "requires_approval",
  ];

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-primary" />
          {i18n.privacy.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {privacyOptions.map((optionName) => (
          <Controller
            key={optionName}
            name={
              optionName as
                | "is_public"
                | "allow_recording"
                | "requires_approval"
            }
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={optionName}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor={optionName} className="text-sm">
                  {i18n.privacy[optionName as keyof typeof i18n.privacy]}
                </Label>
              </div>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default PrivacySettingsCard;
