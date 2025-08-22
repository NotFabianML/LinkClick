import { Interest } from './profiles.types';

export interface DiscoverSessionCardData {
  id: number;
  title: string;
  description: string;
  host: string;
  host_avatar: string;
  host_initials: string;
  host_rating: number; 
  date: string;
  time: string;
  duration: string;
  type: string;
  difficulty: string;
  max_participants: number;
  current_participants: number;
  skills: string[];
  featured: boolean;
}

export interface DiscoverSessionsPageProps {
  available_skills: Interest[];
  i18n: DiscoverSessionsPageI18n;
}

export interface DiscoverSessionsPageI18n {
  header: {
    title: string;
    subtitle: string;
    create_button: string;
  };
  filters: {
    search_placeholder: string;
    sort_by: {
      label: string;
      date: string;
      popularity: string;
      rating: string;
    };
    filters_button: string;
    advanced_filters_title: string;
    session_type_label: string;
    all_types: string;
    difficulty_label: string;
    all_levels: string;
    skills_label: string;
    clear_button: string;
  };
  featured: {
    title: string;
    badge: string;
  };
  results: {
    title: string;
    sessions_found: {
      one: string;
      other: string;
    };
    no_sessions_found: string;
    join_button: string;
    view_button: string;
    skills_more: string;
  };
}
