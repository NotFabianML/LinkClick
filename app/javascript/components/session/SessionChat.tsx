"use client";

import React from 'react';
import { Card } from '../../components/ui/card';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';
import { ChatMessage } from '../../types';

interface SessionChatProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

const SessionChat = ({ messages, onSendMessage }: SessionChatProps) => {
  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-[600px] flex flex-col">
      <MessageList messages={messages} isLoading={false} />
      <MessageInput onSendMessage={onSendMessage} />
    </Card>
  );
};

export default SessionChat;