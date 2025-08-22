"use client";

import React from "react";
import { ChatConversation, ChatMessage } from "../../types";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { Card } from "../../components/ui/card";

import { MessageSquare } from "lucide-react";

interface ChatWindowProps {
  conversation: ChatConversation | null;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
}

const ChatWindow = ({
  conversation,
  messages,
  isLoading,
  onSendMessage,
}: ChatWindowProps) => {
  if (!conversation) {
    return (
      <div className="lg:col-span-3">
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-full flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Select a conversation
            </h3>
            <p className="text-muted-foreground">
              Choose a conversation from the sidebar to start chatting
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-full flex flex-col">
        <ChatHeader conversation={conversation} />
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput onSendMessage={onSendMessage} />
      </Card>
    </div>
  );
};

export default ChatWindow;
