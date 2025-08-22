import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { SessionData } from '../../types';

import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import DetailsTab from './DetailsTab';
import AiSuggestionsTab from './AiSuggestionsTab';
import NotepadTab from './NotepadTab';
import WhiteboardTab from './Whiteboard';

import { FileText, Brain, NotepadText, Palette } from 'lucide-react';

interface SessionSidebarProps {
  session: SessionData;
}

const SessionSidebar = ({ session }: SessionSidebarProps) => {
  const i18n = useI18n();
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Card className="h-[700px] shadow-lg border-0 bg-card/50 backdrop-blur-sm flex flex-col">
      <CardHeader className="pb-3 border-b bg-muted/30">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details" className="text-xs gap-1">
              <FileText className="h-3 w-3" /> {i18n.sidebar.tabs.details}
            </TabsTrigger>
            <TabsTrigger value="ai-suggestions" className="text-xs gap-1">
              <Brain className="h-3 w-3" /> {i18n.sidebar.tabs.ai_suggest}
            </TabsTrigger>
            <TabsTrigger value="notepad" className="text-xs gap-1">
              <NotepadText className="h-3 w-3" /> {i18n.sidebar.tabs.notepad}
            </TabsTrigger>
            <TabsTrigger value="whiteboard" className="text-xs gap-1">
              <Palette className="h-3 w-3" /> {i18n.sidebar.tabs.whiteboard}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && <DetailsTab session={session} />}
        {activeTab === 'ai-suggestions' && <AiSuggestionsTab />}
        {activeTab === 'notepad' && (
          <NotepadTab 
            initialContent={session.notepad_content} 
            sessionId={session.id} 
          />
        )}
        {activeTab === 'whiteboard' && <WhiteboardTab />}
      </CardContent>
    </Card>
  );
};

export default SessionSidebar;
