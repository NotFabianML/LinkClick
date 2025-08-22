import { Interest } from './profiles.types';

export interface BrowseUser {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  topInterests: string[];
  rating: number;
  sessions: number;
}

export interface BrowsePageProps {
  available_interests: Interest[];
  i18n: BrowsePageI18n;
}

export interface BrowsePageI18n {
  header: {
    title: string;
    subtitle: string;
  };
  filters: {
    search_placeholder: string;
    role_title: string;
    roles: {
      all: string;
      student: string;
      teacher: string;
    };
    interests_title: string;
    clear_button: string;
  };
  results: {
    users_found: {
      one: string;
      other: string;
    };
    no_users_found: string;
    top_interests: string;
  };
}
