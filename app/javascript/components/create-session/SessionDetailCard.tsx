import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { CreateSessionFormData } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Clock } from "lucide-react";

const sessionTypes = [
  {
    value: "quick-tutoring",
    label: "Quick Tutoring",
    suggestedDuration: ["0.5", "1", "1.5"],
  },
  {
    value: "deep-study",
    label: "Deep Study Session",
    suggestedDuration: ["2", "3", "4", "6"],
  },
  {
    value: "project-collab",
    label: "Project Collaboration",
    suggestedDuration: ["4", "6", "8", "12", "24"],
  },
  { value: "workshop", label: "Workshop", suggestedDuration: ["2", "3", "4"] },
  {
    value: "study-group",
    label: "Study Group",
    suggestedDuration: ["1.5", "2", "3"],
  },
  {
    value: "discussion",
    label: "Discussion",
    suggestedDuration: ["1", "1.5", "2"],
  },
];
const getDurationOptions = (sessionType: string) => {
  const selectedType = sessionTypes.find((type) => type.value === sessionType);
  if (!selectedType) return [];
  const durationMap: { [key: string]: string } = {
    "0.5": "30 minutes",
    "1": "1 hour",
    "1.5": "1.5 hours",
    "2": "2 hours",
    "3": "3 hours",
    "4": "4 hours",
    "6": "6 hours",
    "8": "8 hours",
    "12": "12 hours",
    "24": "1 day",
  };
  return selectedType.suggestedDuration.map((duration) => ({
    value: duration,
    label: durationMap[duration],
  }));
};

interface SessionDetailsCardProps {
  control: Control<CreateSessionFormData>;
  register: UseFormRegister<CreateSessionFormData>;
  errors: FieldErrors<CreateSessionFormData>;
  watch: UseFormWatch<CreateSessionFormData>;
}

const SessionDetailsCard = ({
  control,
  register,
  errors,
  watch,
}: SessionDetailsCardProps) => {
  const i18n = useI18n();
  const selectedSessionType = watch("session_type");

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Clock className="h-5 w-5 text-primary" />
          {i18n.details.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Difficulty Level */}
        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <div>
              <Label>{i18n.details.difficulty.label}</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={i18n.details.difficulty.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(i18n.details.difficulty.options).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {String(label)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* Max Participants */}
        <Controller
          name="max_participants"
          control={control}
          render={({ field }) => (
            <div>
              <Label>{i18n.details.max_participants.label}</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={i18n.details.max_participants.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(i18n.details.max_participants.options).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {String(label)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* Date */}
        <div>
          <Label>{i18n.details.date}</Label>
          <Input type="date" {...register("date")} />
        </div>

        {/* Time */}
        <div>
          <Label>{i18n.details.time}</Label>
          <Input type="time" {...register("time")} />
        </div>

        {/* Duration */}
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <div>
              <Label>{i18n.details.duration.label}</Label>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedSessionType}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedSessionType
                        ? i18n.details.duration.placeholder
                        : i18n.details.duration.placeholder_disabled
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {getDurationOptions(selectedSessionType).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default SessionDetailsCard;
