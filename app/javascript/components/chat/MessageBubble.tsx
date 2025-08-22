// app/javascript/components/chat/MessageBubble.tsx
"use client";

import React from "react";
import { ChatMessage } from "../../types";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const currentUserId = (window as any).sharedProps?.user?.id;

  // By converting both to Number, we ensure the comparison is accurate
  // even if one is a string (e.g., "12") and the other is a number (e.g., 12).
  const isCurrentUser = Number(message.senderId) === Number(currentUserId);
  
  // For debugging, you can uncomment this to see the types in your browser console:
  console.log({
    messageId: message.id,
    senderId: message.senderId,
    typeOfSenderId: typeof message.senderId,
    currentUserId: currentUserId,
    typeOfCurrentUserId: typeof currentUserId,
    isMatch: Number(message.senderId) === Number(currentUserId)
  });

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50 text-foreground"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 text-right ${
            isCurrentUser
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;