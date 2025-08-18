import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { Message } from '../../types';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

import { Send } from 'lucide-react';

interface SessionChatProps {
  messages: Message[];
  onSendMessage: (content: string) => Promise<boolean>;
}

const SessionChat = ({ messages, onSendMessage }: SessionChatProps) => {
  const i18n = useI18n();
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const success = await onSendMessage(newMessage);
    
    if (success) {
      setNewMessage("");
    }
    setIsSending(false);
  };

  return (
    <Card className="h-[700px] flex flex-col shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle>{i18n.chat.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.is_current_user ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-3 max-w-[80%]">
                {!message.is_current_user && (
                  <Avatar className="h-8 w-8 mt-1"><AvatarFallback>{message.sender_initials}</AvatarFallback></Avatar>
                )}
                <div className="space-y-1">
                  <div className={`rounded-2xl p-3 ${message.is_current_user ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                    {!message.is_current_user && (
                      <p className="text-xs font-medium mb-1">{message.sender_name}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.is_current_user ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t bg-background/80">
          <div className="flex gap-2 items-center">
            <Input
              placeholder={i18n.chat.placeholder}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isSending}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isSending}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionChat;
