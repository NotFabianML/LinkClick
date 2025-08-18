export interface Interest {
  id: number;
  name: string;
}
export interface Badge {
  id: number;
  name: string;
  description: string;
}
export interface Feedback {
  id: number;
  giver_name: string;
  rating: number;
  comment: string;
}
export interface Skill {
  id: number;
  name: string;
}
export interface RecentActivity {
  type: "session" | "achievement" | "connection";
  title: string;
  date: string;
}

export interface UserProfileData {
  // Datos Básicos
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string; // "Student", "Teacher", o "Admin"
  bio: string | null;

  phone: string | null;
  country: string | null;
  website: string | null;
  university: string | null;
  linkedin_url: string | null;
  github_url: string | null;

  // Datos de Asociaciones
  interests: Interest[];
  badges: Badge[];
  skills: Skill[];
  feedbacks: Feedback[];

  // Configuraciones de Privacidad
  privacy: {
    profile_visibility: string;
    show_email: boolean;
    show_phone: boolean;
    show_activity: boolean;
    allow_messages: boolean;
  };

  // Datos Calculados (Estadísticas)
  stats: {
    sessions_joined: number;
    sessions_created: number;
    rating: number;
    achievements: number;
    hours_learned: number;
    connections: number;
  };

  // Actividad reciente
  recent_activity: RecentActivity[];

  settings: {
    email_notifications: boolean;
    session_reminders: boolean;
    connection_requests: boolean;
    marketing_emails: boolean;
  };
}

export interface UserProfileI18n {
  loading: string;
  sidebar: {
    edit_profile_button: string;
  };
  bio_card: {
    title: string;
    empty: string;
  };
  interests_card: {
    title: string;
    empty: string;
  };
  badges_card: {
    title: string;
    empty: string;
  };
  feedback_card: {
    title: string;
    description: string;
    empty: string;
  };
}

export interface MyProfileI18n {
  loading: string;
  header: {
    title: string;
    subtitle: string;
    edit_button: string;
    save_button: string;
    saving_button: string;
    error_saving: string;
  };
  sidebar: {
    sessions: string;
    rating: string;
  };
  tabs: {
    profile: string;
    activity: string;
    settings: string;
    privacy: string;
  };
  profile_tab: {
    personal_info: {
      title: string;
      description: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      country: string;
      university: string;
      bio: string;
      bio_placeholder: string;
    };
    social_links: {
      title: string;
      description: string;
      website: string;
      website_placeholder: string;
      github: string;
      github_placeholder: string;
      linkedin: string;
      linkedin_placeholder: string;
    };
    interests_skills: {
      title: string;
      description: string;
      add_placeholder: string;
    };
  };
  activity_tab: {
    stats: {
      sessions_participated: string;
      hours_learned: string;
      connections: string;
    };
    recent_activity: {
      title: string;
      description: string;
      empty: string;
    };
  };
  settings_tab: {
    account_settings: {
      title: string;
      description: string;
      email_notifications: { label: string; description: string };
      session_reminders: { label: string; description: string };
      connection_requests: { label: string; description: string };
      marketing_emails: { label: string; description: string };
    };
    danger_zone: {
      title: string;
      description: string;
      delete_account: { label: string; description: string; button: string };
    };
  };
  privacy_tab: {
    title: string;
    description: string;
    profile_visibility: {
      label: string;
      options: {
        public: string;
        connections: string;
        private: string;
      };
    };
    show_email: { label: string; description: string };
    show_phone: { label: string; description: string };
    show_activity: { label: string; description: string };
    allow_messages: { label: string; description: string };
  };
  toasts: {
    profile_update_success_title: string;
    profile_update_success_description: string;
    profile_update_error_title: string;
    account_delete_success_title: string;
    account_delete_success_description: string;
    account_delete_error_title: string;
    account_delete_error_description: string;
  };
}
