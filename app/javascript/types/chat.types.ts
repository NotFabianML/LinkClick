export interface ChatMessage {
  id: number;
  content: string;
  timestamp: string;
  senderId: number;
  senderName: string;
  senderInitials: string;
}

export interface ChatConversation {
  id: number;
  participantName: string;
  participantAvatarUrl: string;
  participantInitials: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  role: string;
}

export interface ChatPageProps {
  conversations: ChatConversation[];
  i18n: ChatPageI18n;
}

export interface ChatPageI18n {
  header: {
    breadcrumb_part1: string;
    breadcrumb_part2: string;
    title: string;
    subtitle: string;
  };
  sidebar: {
    title: string;
    search_placeholder: string;
  };
  chat_window: {
    online: string;
    offline: string;
    message_placeholder: string;
  };
  empty_state: {
    title: string;
    subtitle: string;
  };
}