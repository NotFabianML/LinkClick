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
  type: 'session' | 'achievement' | 'connection';
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
}


export interface UserProfileI18n {
  title: string;
  edit_button: string;
  bio: string;
  interests_and_skills: string;
  badges_earned: string;
  feedback_received: string;
  feedback_description: string;
  no_bio: string;
  no_interests: string;
  no_badges: string;
  no_feedback: string;
}

export interface MyProfileI18n {
  [key: string]: string;
}