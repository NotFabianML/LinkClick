"use client";

import React, { useState } from "react";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { Send, Paperclip, Smile } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="border-t bg-muted/30 p-4">
      <div className="flex items-center gap-2">
        {/* NOTE: These buttons are for UI purposes and are not functional yet. */}
        <Button size="icon" variant="ghost" className="h-9 w-9">
          <Paperclip className="h-4 w-4" />
        </Button>
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;