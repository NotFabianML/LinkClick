// Este archivo actúa como el punto de entrada para todos nuestros tipos.

export * from './home.types';
export * from './devise.types';
export * from './profiles.types';
export * from './users.types';
export * from './sessions.types';
export * from './dashboard.types';
export * from './browse.types';
export * from './discover_sessions.types';

export interface LocaleData {
  en_url: string;
  es_url: string;
  current_locale: 'en' | 'es';
}

export interface UserData {
  logged_in: boolean;
  id: number | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  abilities: {
    can_create_session: boolean;
    can_view_leaderboard: boolean;
    // ... otros permisos
  };
}

export interface NavbarI18n {
  brand: string;
  posts_link: string;
  log_out: string;
  log_in: string;
  sign_up: string;
  chat_link: string;
  leaderboard_link: string;
  profile_link: string;
  sessions_link: string;
}

export interface SharedProps {
  locale_data: LocaleData;
  user: UserData;
  i18n: {
    navbar: NavbarI18n;
  };
}