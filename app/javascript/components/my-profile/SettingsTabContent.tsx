import React from "react";
import { UserProfileData } from "../../types";

import AccountSettingsCard from "./AccountSettingsCard";
import DangerZoneCard from "./DangerZoneCard";

interface SettingsTabContentProps {
  settings: UserProfileData["settings"];
  onSettingChange: (key: string, value: boolean) => Promise<void>;
}

const SettingsTabContent = ({
  settings,
  onSettingChange,
}: SettingsTabContentProps) => {
    
  return (
    <div className="space-y-6">
      <AccountSettingsCard
        settings={settings}
        onSettingChange={onSettingChange}
      />

      <DangerZoneCard />
    </div>
  );
};

export default SettingsTabContent;
