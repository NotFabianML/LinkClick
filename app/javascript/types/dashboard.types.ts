export interface DashboardStats {
  sessions_completed: number;
  hours_learned: number;
  connections: number;
  skills_acquired: number;
}

export interface UpcomingSession {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  difficulty: string;
  participants: {
    name: string;
    avatar: string;
    initials: string;
  }[];
  participants_count_text: string;
}

export interface LearningGoal {
  id: number;
  title: string;
  progress: number;
  target: string;
}

export interface RecentActivityDashboard {
  id: number;
  type: "session_completed" | "connection_made" | "session_joined";
  title: string;
  time: string;
}

export interface SuggestedConnection {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  topSkills: string[];
  rating: number;
  sessions: number;
  sessions_completed_text: string;
}

// ---  (i18n) ---

export interface DashboardI18n {
  welcome_back: string;
  subtitle: string;
  progress_title: string;
  quick_actions_title: string;
  upcoming_sessions_title: string;
  learning_goals_title: string;
  recent_activity_title: string;
  suggested_connections_title: string;
  stats: {
    sessions_completed: string;
    hours_learned: string;
    connections: string;
    skills_acquired: string;
  };
  actions: {
    create_session: { title: string; description: string };
    browse_users: { title: string; description: string };
    my_profile: { title: string; description: string };
  };
  empty_states: {
    no_upcoming_sessions: string;
    no_sessions_subtitle: string;
    browse_sessions_button: string;
    no_goals: string;
    no_activity: string;
    no_suggestions: string;
  };
  session_card: {
    join_button: string;
  };
}
