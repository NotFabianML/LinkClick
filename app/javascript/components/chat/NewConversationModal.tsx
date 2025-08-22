// app/javascript/components/chat/NewConversationModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { ChatConversation } from "../../types";

type SelectableUser = {
  id: string;
  fullName: string;
  initials: string;
};

interface NewConversationModalProps {
  onConversationStarted: (conversation: ChatConversation) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const NewConversationModal = ({ onConversationStarted, setIsOpen }: NewConversationModalProps) => {
  const [connections, setConnections] = useState<SelectableUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/v1/connections")
      .then(response => {
        const users = response.data.data.map((item: any) => item.attributes);
        setConnections(users);
      })
      .catch(error => console.error("Error fetching connections:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectUser = (userId: string) => {
    // Check if a userId was actually passed
    if (!userId) return;

    const csrfToken = document.querySelector<HTMLMetaElement>("meta[name='csrf-token']")?.content;
    
    axios.post("/api/v1/conversations", 
      { conversation: { participant_id: userId } },
      { headers: { "X-CSRF-Token": csrfToken } }
    )
    .then(response => {
      const conversation = response.data.data.attributes;
      onConversationStarted(conversation);
      setIsOpen(false);
    })
    .catch(error => console.error("Error starting conversation:", error));
  };

  return (
    // The onSelect handler is now on each CommandItem.
    <Command>
      <CommandInput placeholder="Search connections..." />
      <CommandList>
        {loading && <CommandEmpty>Loading connections...</CommandEmpty>}
        {!loading && connections.length === 0 && <CommandEmpty>No connections found.</CommandEmpty>}
        <CommandGroup>
          {connections.map((user) => (
            // Each item now has a unique `value` prop and its own onSelect handler.
            <CommandItem
              key={user.id}
              value={user.id}
              className="flex items-center gap-3 cursor-pointer"
              onSelect={() => handleSelectUser(user.id)}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <span>{user.fullName}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default NewConversationModal;