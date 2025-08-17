export interface Session {
  id: number;
  title: string;
  description: string;
  session_type: string;
  status: string;
}

export interface CreateSessionPageProps {
  available_interests: { id: number; name: string; }[];
}

export interface Participant {
  id: number;
  full_name: string;
  initials: string;
  is_online: boolean;
}

export interface Message {
  id: number;
  sender_name: string;
  sender_initials: string;
  content: string;
  timestamp: string;
  is_current_user: boolean;
}

export interface EventData {
  scheduled_date: string;
  scheduled_time: string;
}

// La estructura completa de datos para una sesión
export interface SessionData {
  id: number;
  title: string;
  description: string;
  status: string;
  participants: Participant[];
  messages: Message[];
  event_data: EventData;
  notepad_content: string;
}

// Props que la página recibe del controlador
export interface SessionPageProps {
  i18n: any; 
  session_data: SessionData;
  current_user_role: {
    is_creator: boolean;
    is_participant: boolean;
  };
}

export interface SessionCardData {
  id: number;
  title: string;
  description: string;
  host: string;
  host_avatar: string;
  host_initials: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  difficulty: string;
  current_participants: number;
  max_participants: number;
  skills: string[];
}