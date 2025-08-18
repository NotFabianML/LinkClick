import React from "react";
import { UserProfileData } from "../../types";

import PersonalInfoCard from "./PersonalInfoCard";
import SocialLinksCard from "./SocialLinksCard";
import InterestsSkillsCard from "./InterestsSkillsCard";

interface ProfileTabContentProps {
  user: UserProfileData;
  isEditing: boolean;
  onUserChange: (updatedUser: UserProfileData) => void;
  newInterest: string;
  onNewInterestChange: (value: string) => void;
  onAddInterest: () => void;
  onRemoveInterest: (interestId: number) => void;
}

const ProfileTabContent = ({
  user,
  isEditing,
  onUserChange,
  newInterest,
  onNewInterestChange,
  onAddInterest,
  onRemoveInterest,
}: ProfileTabContentProps) => {
  return (
    <div className="space-y-6">
      <PersonalInfoCard
        user={user}
        isEditing={isEditing}
        onUserChange={onUserChange}
      />

      <SocialLinksCard
        user={user}
        isEditing={isEditing}
        onUserChange={onUserChange}
      />

      <InterestsSkillsCard
        interests={user.interests}
        isEditing={isEditing}
        newInterest={newInterest}
        onNewInterestChange={onNewInterestChange}
        onAddInterest={onAddInterest}
        onRemoveInterest={onRemoveInterest}
      />
    </div>
  );
};

export default ProfileTabContent;
