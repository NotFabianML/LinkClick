"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createConsumer } from "@rails/actioncable";
import { SessionPageProps, Message, SessionData, ChatMessage } from "../types"; // Import ChatMessage
import SessionHeader from "../components/session/SessionHeader";
import SessionChat from "../components/session/SessionChat";
import SessionSidebar from "../components/session/SessionSidebar";

const cable = createConsumer();

const SessionDetailPage = (props: SessionPageProps) => {
  const { session_data, i18n } = props;

  // Map the initial messages from snake_case (Message) to camelCase (ChatMessage).
  const initialMessages: ChatMessage[] = session_data.messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    timestamp: msg.timestamp,
    senderId: msg.senderId,
    senderName: msg.sender_name,
    senderInitials: msg.sender_initials,
  }));

  const [session, setSession] = useState<SessionData>(session_data);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [currentUserRole, setCurrentUserRole] = useState(
    props.current_user_role
  );
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    subscriptionRef.current = cable.subscriptions.create(
      { channel: "SessionChannel", session_id: session.id },
      {
        received(messageData: { data: { attributes: ChatMessage } }) {
          const newMessage = messageData.data.attributes;
          setMessages((prevMessages) =>
            prevMessages.some((msg) => msg.id === newMessage.id)
              ? prevMessages
              : [...prevMessages, newMessage]
          );
        },
      }
    );

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [session.id]);

  const handleSendMessage = async (content: string): Promise<void> => {
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;

    try {
      await axios.post(
        `/api/v1/sessions/${session.id}/messages`,
        { message: { content } },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleJoinSuccess = () => {
    setCurrentUserRole({ ...currentUserRole, is_participant: true });

    const currentUser = (window as any).sharedProps?.user;
    if (currentUser) {
      setSession((prevSession) => ({
        ...prevSession,
        participants: [
          ...prevSession.participants,
          {
            id: currentUser.id,
            full_name: `${currentUser.first_name} ${currentUser.last_name}`,
            initials: `${currentUser.first_name?.[0]}${currentUser.last_name?.[0]}`,
            is_online: true,
          },
        ],
      }));
    }
  };

  if (!session) {
    return <div className="container mx-auto p-8">{i18n.loading}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <SessionHeader
          session={session}
          currentUserRole={currentUserRole}
          onJoinSuccess={handleJoinSuccess}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SessionChat
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
          <div className="lg:col-span-1">
            <SessionSidebar session={session} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionDetailPage;
