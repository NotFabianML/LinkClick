import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateSessionFormData } from "../../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  BookOpen,
  Zap,
  GraduationCap,
  Briefcase,
  Users,
  MessageSquare,
} from "lucide-react";

const iconMap = {
  quick_tutoring: Zap,
  deep_study: GraduationCap,
  project_collab: Briefcase,
  workshop: BookOpen,
  study_group: Users,
  discussion: MessageSquare,
};

interface SessionTypeCardProps {
  control: Control<CreateSessionFormData>;
  errors: FieldErrors<CreateSessionFormData>;
}

const SessionTypeCard = ({ control, errors }: SessionTypeCardProps) => {
  const i18n = useI18n();

  const sessionTypes = Object.entries(i18n.session_type.types).map(
    ([key, value]) => {
      const typedValue = value as { label: string; description: string };
      return {
        value: key,
        label: typedValue.label,
        description: typedValue.description,
        icon: iconMap[key as keyof typeof iconMap],
      };
    }
  );

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-primary" />
          {i18n.session_type.title}
        </CardTitle>
        <CardDescription>{i18n.session_type.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Controller
          name="session_type"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionTypes.map((type) => {
                const isSelected = field.value === type.value;
                return (
                  <div
                    key={type.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-muted/30"
                    }`}
                    onClick={() => field.onChange(type.value)}
                  >
                    <div className="flex items-start gap-3">
                      <type.icon
                        className={`h-6 w-6 mt-1 flex-shrink-0 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div>
                        <h3 className="font-medium text-foreground">
                          {type.label}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        />
        {errors.session_type && (
          <p className="text-sm text-destructive mt-4">
            {i18n.validation[errors.session_type.message as string]}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionTypeCard;
