"use client";

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../../types";
import MessageBubble from "./MessageBubble";

import { CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  return (
    <CardContent className="flex-1 p-0">
      <ScrollArea className="h-full" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  );
};

export default MessageList;