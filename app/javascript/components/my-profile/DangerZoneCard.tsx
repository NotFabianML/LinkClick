import React, { useState } from "react";
import axios from "axios";
import { useI18n } from "../../contexts/I18nContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

declare const Turbo: {
  visit: (url: string) => void;
};

const DangerZoneCard = () => {
  const i18n = useI18n();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.delete(`/${locale}/profile`, {
        headers: { "X-CSRF-Token": csrfToken },
      });

      toast.success(i18n.toasts.account_delete_success_title, {
        description: i18n.toasts.account_delete_success_description,
      });

      setTimeout(() => {
        Turbo.visit("/");
      }, 2000);
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast.error(i18n.toasts.account_delete_error_title, {
        description: i18n.toasts.account_delete_error_description,
      });
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-red-600">
            {i18n.settings_tab.danger_zone.title}
          </CardTitle>
          <CardDescription>
            {i18n.settings_tab.danger_zone.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900/50 rounded-lg">
            <div>
              <Label className="text-base font-medium text-red-600">
                {i18n.settings_tab.danger_zone.delete_account.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {i18n.settings_tab.danger_zone.delete_account.description}
              </p>
            </div>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                {i18n.settings_tab.danger_zone.delete_account.button}
              </Button>
            </AlertDialogTrigger>
          </div>
        </CardContent>
      </Card>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {i18n.settings_tab.danger_zone.delete_account.confirm_title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {i18n.settings_tab.danger_zone.delete_account.confirm_description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {i18n.settings_tab.danger_zone.delete_account.confirm_cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting
              ? "Eliminando..."
              : i18n.settings_tab.danger_zone.delete_account.confirm_continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DangerZoneCard;
