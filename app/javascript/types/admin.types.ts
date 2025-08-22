export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Teacher" | "Student" | "Admin";
  avatar: string;
  initials: string;
  joinDate: string;
  status: "Active" | "Inactive";
  lastActive: string;
  sessionsCreated?: number;
  sessionsJoined?: number;
  rating: number;
  location: string;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  sessionsThisWeek: number;
  // ... y más estadísticas que definas
}

export interface AdminPageProps {
  i18n: AdminPageI18n;
  users: AdminUser[];
  stats: PlatformStats;
}

export interface AdminPageI18n {
  header: {
    breadcrumb: string;
    title: string;
    subtitle: string;
    export_button: string;
    add_user_button: string;
    exporting_button: string;
  };
  sidebar: {
    title: string;
    users: { title: string; description: string };
    analytics: { title: string; description: string };
    settings: { title: string; description: string };
  };
  users_tab: {
    title: string;
    subtitle: string;
    selected_badge: string;
    email_button: string;
    delete_button: string;
    filters: {
      search_placeholder: string;
      all_roles: string;
      teachers: string;
      students: string;
      all_status: string;
      active: string;
      inactive: string;
      more_filters: string;
    };
    table_headers: { [key: string]: string };
    user_stats: {
      sessions_created: string;
      sessions_joined: string;
    };
    no_users_found: {
      title: string;
      subtitle: string;
    };
    actions: {
      view_details: string;
      deactivate_user: string;
      activate_user: string;
    };
    details_modal: {
      title: string;
      description: string;
      join_date: string;
      last_active: string;
      rating: string;
      location: string;
    };
    delete_modal: {
      title: string;
      description: string;
      cancel: string;
      confirm: string;
    };
  };
  analytics_tab: {
    title: string;
    subtitle: string;
  };
  settings_tab: {
    title: string;
    subtitle: string;
  };
  toasts: {
    export_success: string;
    export_error: string;
    user_toggle_status_success: string;
    user_toggle_status_error: string;
  };
}
