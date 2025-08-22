import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Button } from "../ui/button";

import { Plus } from "lucide-react";

const DiscoverSessionsHeader = () => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const handleCreateSessionClick = () => {
    navigate("/sessions/new");
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            {i18n.header.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {i18n.header.subtitle}
          </p>
        </div>
        <Button
          onClick={handleCreateSessionClick}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          {i18n.header.create_button}
        </Button>
      </div>
    </div>
  );
};

export default DiscoverSessionsHeader;
