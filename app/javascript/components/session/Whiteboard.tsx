import React from 'react';
import { useI18n } from '../../contexts/I18nContext';

import { Button } from '../ui/button';

import { Palette } from 'lucide-react';

const WhiteboardTab = () => {
  const i18n = useI18n();

  // TODO: Implement actual logic to launch the digital whiteboard
  const handleLaunch = () => {
    console.log("Launching digital whiteboard...");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
        <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-semibold mb-2">{i18n.sidebar.whiteboard_tab.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          {i18n.sidebar.whiteboard_tab.description}
        </p>
        <Button className="w-full" onClick={handleLaunch}>
          {i18n.sidebar.whiteboard_tab.launch_button}
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardTab;
