import React from 'react';
import { UserProfileData } from '../../types';

import ActivityStatsGrid from './ActivityStatsGrid';
import RecentActivityList from './RecentActivityList';

interface ActivityTabContentProps {
  user: UserProfileData;
}

const ActivityTabContent = ({ user }: ActivityTabContentProps) => {
  return (
    <div className="space-y-6">
      <ActivityStatsGrid stats={user.stats} />
      <RecentActivityList activities={user.recent_activity} />
    </div>
  );
};

export default ActivityTabContent;
