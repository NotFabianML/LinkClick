import React from "react";
import { FieldErrors } from "react-hook-form";
import { useI18n } from "../../contexts/I18nContext";
import { CreateSessionFormData } from "../../types";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface SubmitSectionProps {
  isSubmitting: boolean;
  errors: FieldErrors<CreateSessionFormData>;
}

const SubmitSection = ({ isSubmitting, errors }: SubmitSectionProps) => {
  const i18n = useI18n();
  const errorMessages = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

  return (
    <div className="sticky top-24 space-y-6">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full shadow-lg"
        size="lg"
      >
        {isSubmitting ? i18n.form.submitting_button : i18n.form.submit_button}
      </Button>

      {errorMessages.length > 0 && (
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="p-4">
            <h4 className="font-bold text-destructive mb-2">
              {i18n.form.error_summary}
            </h4>
            <ul className="list-disc pl-5 text-sm text-destructive space-y-1">
              {errorMessages.map((message, i) => (
                <li key={i}>{i18n.validation[message as string]}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubmitSection;
