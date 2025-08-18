"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { SessionPageProps, Message, SessionData } from "../types";
import { useI18n } from '../contexts/I18nContext';
import { toast } from 'sonner';

import SessionHeader from "../components/session/SessionHeader";
import SessionChat from "../components/session/SessionChat";
import SessionSidebar from "../components/session/SessionSidebar";

const SessionDetailPage = (props: SessionPageProps) => {
  const { session_data, i18n } = props;
  
  const [session, setSession] = useState<SessionData>(session_data);
  const [currentUserRole, setCurrentUserRole] = useState(props.current_user_role);

  useEffect(() => {
    setSession(session_data);
    setCurrentUserRole(props.current_user_role);
  }, [session_data, props.current_user_role]);

// TODO: Implement actual logic to send messages
  const handleSendMessage = async (content: string): Promise<boolean> => {
    console.log("Chat functionality will be implemented with WebSockets.");
    toast.info("Coming Soon!", { description: "Real-time chat will be available soon." });
    return Promise.resolve(false); // Devuelve 'false' para no limpiar el input
  };

  const handleJoinSuccess = () => {
    setCurrentUserRole({ ...currentUserRole, is_participant: true });

    const currentUser = (window as any).sharedProps?.user;
    if (currentUser) {
      setSession(prevSession => ({
        ...prevSession,
        participants: [
          ...prevSession.participants,
          {
            id: currentUser.id,
            full_name: `${currentUser.first_name} ${currentUser.last_name}`,
            initials: `${currentUser.first_name?.[0]}${currentUser.last_name?.[0]}`,
            is_online: true
          }
        ]
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
              messages={session.messages}
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
