"use client";

import React from "react";
import { ChatConversation } from "../../types";
import ConversationListItem from "./ConversationListItem";

interface ConversationListProps {
  conversations: ChatConversation[];
  selectedConversation: ChatConversation | null;
  onSelectConversation: (conversation: ChatConversation) => void;
}

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) => {
  return (
    <div className="p-2">
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
          isSelected={selectedConversation?.id === conversation.id}
          onSelect={() => onSelectConversation(conversation)}
        />
      ))}
    </div>
  );
};

export default ConversationList;
