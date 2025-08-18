import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateSessionFormData } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface BasicInfoCardProps {
  register: UseFormRegister<CreateSessionFormData>;
  errors: FieldErrors<CreateSessionFormData>;
}

const BasicInfoCard = ({ register, errors }: BasicInfoCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{i18n.basic_info.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">{i18n.basic_info.session_title.label}</Label>
          <Input
            id="title"
            placeholder={i18n.basic_info.session_title.placeholder}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-destructive">
              {i18n.validation[errors.title.message as string]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            {i18n.basic_info.description.label}
          </Label>
          <Textarea
            id="description"
            placeholder={i18n.basic_info.description.placeholder}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {i18n.validation[errors.description.message as string]}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoCard;
