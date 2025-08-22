"use client";

import React, { useState } from "react";
import { ChatConversation } from "../../types";
import ConversationList from "./ConversationList";
import NewConversationModal from "./NewConversationModal";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

import { MessageSquare, Plus, Search } from "lucide-react";

interface ConversationSidebarProps {
  conversations: ChatConversation[];
  selectedConversation: ChatConversation | null;
  onSelectConversation: (conversation: ChatConversation) => void;
  onConversationStarted: (conversation: ChatConversation) => void;
}

const ConversationSidebar = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onConversationStarted,
}: ConversationSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="lg:col-span-1">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-full flex flex-col">
        <CardHeader className="border-b bg-muted/30 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversations
            </CardTitle>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Conversation</DialogTitle>
                </DialogHeader>
                <NewConversationModal
                  onConversationStarted={onConversationStarted}
                  setIsOpen={setIsModalOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-full">
            <ConversationList
              conversations={filteredConversations}
              selectedConversation={selectedConversation}
              onSelectConversation={onSelectConversation}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationSidebar;
