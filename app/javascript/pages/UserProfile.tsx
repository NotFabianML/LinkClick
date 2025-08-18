import React from "react";
import { SharedProps, UserProfileData, UserProfileI18n } from "../types";

import UserProfileSidebar from "../components/user-profile/UserProfileSidebar";
import BioCard from "../components/user-profile/BioCard";
import InterestsCard from "../components/user-profile/InterestsCard";
import BadgesCard from "../components/user-profile/BadgesCard";
import FeedbackCard from "../components/user-profile/FeedbackCard";

type UserProfilePageProps = {
  i18n: UserProfileI18n;
  user_data: UserProfileData;
  is_current_user: boolean;
  shared_props: SharedProps;
};

const UserProfilePage = (props: UserProfilePageProps) => {
  const { i18n, user_data, is_current_user } = props;

  if (!user_data) {
    return <div>{i18n.loading || 'Cargando...'}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <UserProfileSidebar
              user={user_data}
              isCurrentUser={is_current_user}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <BioCard bio={user_data.bio} />
            <InterestsCard interests={user_data.interests} />
            <BadgesCard badges={user_data.badges} />
            <FeedbackCard feedbacks={user_data.feedbacks} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
