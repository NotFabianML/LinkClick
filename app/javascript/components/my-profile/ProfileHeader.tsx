import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import { Button } from "../ui/button";

import { Save, Edit } from "lucide-react";

const Spinner = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

interface ProfileHeaderProps {
  isEditing: boolean;
  isSaving: boolean;
  saveError: string | null;
  onToggleEdit: () => void;
  onSaveChanges: () => void;
}

const ProfileHeader = ({
  isEditing,
  isSaving,
  saveError,
  onToggleEdit,
  onSaveChanges,
}: ProfileHeaderProps) => {
  const i18n = useI18n();

  const handleButtonClick = () => {
    if (isEditing) {
      onSaveChanges();
    } else {
      onToggleEdit();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {i18n.header.title}
          </h1>
          <p className="text-muted-foreground mt-2">{i18n.header.subtitle}</p>
        </div>
        <Button
          onClick={handleButtonClick}
          className="gap-2"
          variant={isEditing ? "default" : "outline"}
          disabled={isSaving}
        >
          {isEditing ? (
            isSaving ? (
              <>
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                {i18n.header.saving_button}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> {i18n.header.save_button}
              </>
            )
          ) : (
            <>
              <Edit className="h-4 w-4" /> {i18n.header.edit_button}
            </>
          )}
        </Button>
      </div>
      {saveError && (
        <p className="text-red-500 text-center mt-2">{saveError}</p>
      )}
    </div>
  );
};

export default ProfileHeader;
