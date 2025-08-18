import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Button } from "../ui/button";

const CreateSessionHeader = () => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  return (
    <div className="mb-8">
      <div className="shadow-lg border-0 bg-card/50 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {i18n.header.title}
            </h1>
            <p className="text-muted-foreground text-lg mt-1">
              {i18n.header.subtitle}
            </p>
          </div>
          <Button
            onClick={() => navigate("dashboard")}
            variant="outline"
            className="shadow-md"
          >
            {i18n.header.back_button}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSessionHeader;
