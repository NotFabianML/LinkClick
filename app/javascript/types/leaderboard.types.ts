export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  initials: string;
  points: number;
  change: 'up' | 'down' | 'same';
  role: string;
  isCurrentUser?: boolean;

  sessionsJoined?: number;
  hoursLearned?: number;
  sessionsCreated?: number;
  studentsHelped?: number;
  rating?: number;
  dailyStreak?: number;
  weeklyHours?: number;
}

export interface Achievement {
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface CurrentUserStats {
  totalPoints: number;
  rank: number | string;
  sessions: number;
  nextMilestone: number;
}

export interface LeaderboardPageProps {
  i18n: LeaderboardPageI18n;
  leaderboard_data: {
    topLearners: LeaderboardUser[];
    topTeachers: LeaderboardUser[];
    mostActive: LeaderboardUser[];
  };
  current_user_stats: CurrentUserStats;
  achievements: Achievement[];
}

export interface LeaderboardPageI18n {
  header: {
    breadcrumb: string;
    title: string;
    subtitle: string;
    time_periods: { [key: string]: string };
  };
  tabs: { [key: string]: string };
  learners_table: {
    title: string;
    subtitle: string;
    you_badge: string;
    stats: string;
    points: string;
  };
  teachers_table: {
    title: string;
    subtitle: string;
    stats: string;
    points: string;
  };
  active_table: {
    title: string;
    subtitle:string;
    stats: string;
    points: string;
  };
  sidebar: {
    your_stats: {
      title: string;
      total_points: string;
      rank: string;
      sessions: string;
      next_milestone: string;
    };
    achievements: {
      title: string;
      subtitle: string;
      view_all_button: string;
      rarities: { [key: string]: string };
    };
    quick_stats: {
      growth: string;
    };
  };
}
