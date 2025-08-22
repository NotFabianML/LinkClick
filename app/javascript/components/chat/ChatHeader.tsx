"use client";

import React from "react";
import { ChatConversation } from "../../types";

import { CardHeader } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";

import { Circle, Phone, Video, Info, MoreVertical } from "lucide-react";

interface ChatHeaderProps {
  conversation: ChatConversation;
}

const ChatHeader = ({ conversation }: ChatHeaderProps) => {
  return (
    <CardHeader className="border-b bg-muted/30 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={conversation.participantAvatarUrl}
                alt={conversation.participantName}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {conversation.participantInitials}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {conversation.participantName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {conversation.isOnline ? "Online" : "Offline"} •{" "}
              {conversation.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* NOTE: These buttons are for UI purposes and are not functional yet. */}
          <Button size="icon" variant="ghost" className="h-9 w-9">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-9 w-9">
            <Video className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-9 w-9">
            <Info className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-9 w-9">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
