import { z } from 'zod';

export interface Session {
  id: number;
  title: string;
  description: string;
  session_type: string;
  status: string;
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
  senderId: number; 
}

export interface CreateSessionPageProps {
  available_interests: { id: number; name: string; }[];
}

// --- Esquema de Validación con Zod ---
export const createSessionSchema = z.object({
  title: z.string().min(1, { message: 'validation.title_required' }).min(3, { message: 'validation.title_min_length' }),
  description: z.string().min(1, { message: 'validation.description_required' }).min(10, { message: 'validation.description_min_length' }),
  session_type: z.string().min(1, { message: 'validation.session_type_required' }),
  interest_ids: z.array(z.number()).min(1, { message: 'validation.interests_required' }),
  is_public: z.boolean(),
  allow_recording: z.boolean(),
  requires_approval: z.boolean(),
  difficulty: z.string().min(1, { message: 'validation.difficulty_required' }),
  max_participants: z.string().min(1, { message: 'validation.max_participants_required' }),
  start_date: z.string().min(1, { message: 'validation.date_required' }),
  start_time: z.string().min(1, { message: 'validation.time_required' }),
  duration: z.string().min(1, { message: 'validation.duration_required' }),
});

export type CreateSessionFormData = z.infer<typeof createSessionSchema>;


export interface CreateSessionI18n {
  header: {
    title: string;
    subtitle: string;
    back_button: string;
  };
  form: {
    error_summary: string;
    submit_button: string;
    submitting_button: string;
  };
  basic_info: {
    title: string;
    session_title: {
      label: string;
      placeholder: string;
    };
    description: {
      label: string;
      placeholder: string;
    };
  };
  session_type: {
    title: string;
    description: string;
    types: {
      [key: string]: { label: string; description: string; };
    };
  };
  skills: {
    title: string;
    description: string;
    selected_skills: string;
  };
  details: {
    title: string;
    difficulty: {
      label: string;
      placeholder: string;
      options: { [key: string]: string; };
    };
    max_participants: {
      label: string;
      placeholder: string;
      options: { [key: string]: string; };
    };
    date: string;
    time: string;
    duration: {
      label: string;
      placeholder: string;
      placeholder_disabled: string;
      recommendation: string;
    };
  };
  privacy: {
    title: string;
    is_public: string;
    allow_recording: string;
    requires_approval: string;
  };
  validation: {
    [key: string]: string;
  };
  toasts: {
    create_success_title: string;
    create_success_description: string;
    create_error_title: string;
    create_error_description: string;
  };
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

export interface SessionPageI18n {
  loading: string;
  header: {
    participants: string;
    action_buttons: {
      edit: string;
      is_participant: string;
      request_join: string;
    };
  };
  chat: {
    title: string;
    placeholder: string;
  };
  sidebar: {
    tabs: {
      details: string;
      ai_suggest: string;
      notepad: string;
      whiteboard: string;
    };
    details_tab: {
      description_title: string;
      schedule_title: string;
      no_date: string;
      no_time: string;
    };
    ai_tab: {
      title: string;
      subtitle: string;
      refresh_button: string;
      compatibility: string;
      invite_button: string;
      matching_info_title: string;
      matching_info_description: string;
    };
    notepad_tab: {
      title: string;
      edit_button: string;
      preview_button: string;
      placeholder: string;
    };
    whiteboard_tab: {
      title: string;
      description: string;
      launch_button: string;
    };
  };
  toasts: {
    join_request_success_title: string;
    join_request_success_description: string;
    join_request_error_title: string;
    join_request_error_description: string;
  };
}


export interface SessionPageProps {
  i18n: SessionPageI18n; 
  session_data: SessionData;
  current_user_role: {
    is_creator: boolean;
    is_participant: boolean;
  };
}