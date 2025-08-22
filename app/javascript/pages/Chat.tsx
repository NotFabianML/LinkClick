"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ChatPageProps,
  ChatConversation,
  ChatMessage,
} from "../types/chat.types";
import { createConsumer } from "@rails/actioncable";
import ConversationSidebar from "../components/chat/ConversationSidebar";
import ChatWindow from "../components/chat/ChatWindow";

const cable = createConsumer();

const ChatPage = (props: ChatPageProps) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(
    props.conversations
  );
  const [selectedConversation, setSelectedConversation] =
    useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const subscriptionRef = useRef<any>(null);

  const handleConversationStarted = (newConversation: ChatConversation) => {
    if (!conversations.some((c) => c.id === newConversation.id)) {
      setConversations((prev) => [newConversation, ...prev]);
    }
    setSelectedConversation(newConversation);
  };

  useEffect(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    if (selectedConversation) {
      setLoadingMessages(true);
      const locale =
        (window as any).sharedProps?.locale_data?.current_locale || "en";

      axios
        .get(`/api/v1/conversations/${selectedConversation.id}/messages`)
        .then((response) => {
          const fetchedMessages = response.data.data.map(
            (item: any) => item.attributes
          );
          setMessages(fetchedMessages);
        })
        .catch((error) => console.error("Error fetching messages:", error))
        .finally(() => setLoadingMessages(false));

      subscriptionRef.current = cable.subscriptions.create(
        {
          channel: "ConversationChannel",
          conversation_id: selectedConversation.id,
        },
        {
          received(messageData: { data: { attributes: ChatMessage } }) {
            const newMessage = messageData.data.attributes;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          },
        }
      );
    }
  }, [selectedConversation]);

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation) return;

    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;

    try {
      await axios.post(
        `/api/v1/conversations/${selectedConversation.id}/messages`,
        { message: { content } },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect and collaborate with the TicoLink community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          <ConversationSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            onConversationStarted={handleConversationStarted}
          />
          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            isLoading={loadingMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
