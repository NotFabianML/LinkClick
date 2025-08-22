"use client";

import React from "react";
import { ChatConversation } from "../../types";

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

import { Circle } from "lucide-react";

interface ConversationListItemProps {
  conversation: ChatConversation;
  isSelected: boolean;
  onSelect: () => void;
}

const ConversationListItem = ({
  conversation,
  isSelected,
  onSelect,
}: ConversationListItemProps) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
        isSelected
          ? "bg-primary/10 border border-primary/30"
          : "hover:bg-muted/50"
      }`}
      onClick={onSelect}
    >
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
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground truncate">
              {conversation.participantName}
            </h4>
            <span className="text-xs text-muted-foreground">
              {conversation.timestamp}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-muted-foreground truncate">
              {conversation.lastMessage}
            </p>
            {conversation.unreadCount > 0 && (
              <Badge className="h-5 w-5 p-0 justify-center text-xs bg-primary text-primary-foreground">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs mt-1">
            {conversation.role}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
