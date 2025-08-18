import React from "react";

import {
  SharedProps,
  DashboardStats,
  UpcomingSession,
  LearningGoal,
  RecentActivityDashboard,
  SuggestedConnection,
  DashboardI18n,
} from "../types";
import { useI18n } from "../contexts/I18nContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickActions from "../components/dashboard/QuickActions";
import QuickStats from "../components/dashboard/QuickStats";
import UpcomingSessions from "../components/dashboard/UpcomingSessions";
import LearningGoals from "../components/dashboard/LearningGoals";
import RecentActivity from "../components/dashboard/RecentActivity";
import SuggestedConnections from "../components/dashboard/SuggestedConnections";

type DashboardPageProps = SharedProps & {
  stats: DashboardStats;
  upcoming_sessions: UpcomingSession[];
  learning_goals: LearningGoal[];
  recent_activity: RecentActivityDashboard[];
  suggested_connections: SuggestedConnection[];
  i18n: DashboardI18n;
};

const DashboardPage = (props: DashboardPageProps) => {
  const {
    stats,
    upcoming_sessions,
    learning_goals,
    recent_activity,
    suggested_connections,
  } = props;

  const i18n = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <DashboardHeader
          welcomeMessage={i18n.welcome_back}
          subtitle={i18n.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <QuickStats stats={stats} />
            <QuickActions />
            <UpcomingSessions sessions={upcoming_sessions} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <LearningGoals goals={learning_goals} />
            <RecentActivity activities={recent_activity} />
            <SuggestedConnections connections={suggested_connections} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
