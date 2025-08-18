"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { SharedProps, UserProfileData, MyProfileI18n } from "../types";
import { useI18n } from "../contexts/I18nContext";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { User, Settings, Activity, Shield } from "lucide-react";

import ProfileHeader from "../components/my-profile/ProfileHeader";
import ProfileSidebar from "../components/my-profile/ProfileSidebar";
import ProfileTabContent from "../components/my-profile/ProfileTabContent";
import ActivityTabContent from "../components/my-profile/ActivityTabContent";
import SettingsTabContent from "../components/my-profile/SettingsTabContent";
import PrivacyTabContent from "../components/my-profile/PrivacyTabContent";

type MyProfilePageProps = SharedProps & {
  user_data: UserProfileData;
  i18n: MyProfileI18n;
};

const MyProfilePage = (props: MyProfilePageProps) => {
  const i18n = useI18n();
  const [user, setUser] = useState(props.user_data);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    setUser(props.user_data);
  }, [props.user_data]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.patch(
        `/${locale}/profile`,
        { user: user },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
      setIsEditing(false);
      toast.success(i18n.toasts.profile_update_success_title, {
        description: i18n.toasts.profile_update_success_description,
      });
    } catch (error: any) {
      const errorMessages = error.response?.data?.errors || [
        i18n.header.error_saving,
      ];
      setSaveError(errorMessages.join(", "));
      toast.error(i18n.toasts.profile_update_error_title, {
        description: errorMessages.join(", "),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingChange = async (key: string, value: any) => {
    const originalUser = { ...user };
    const [parentKey, childKey] = key.split(".") as [
      keyof UserProfileData,
      string
    ];

    setUser((prev) => {
      const parentObject = prev[parentKey];
      if (parentObject && typeof parentObject === "object") {
        return {
          ...prev,
          [parentKey]: {
            ...parentObject,
            [childKey]: value,
          },
        };
      }
      return prev;
    });

    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      const payload = { user: { [parentKey]: { [childKey]: value } } };
      await axios.patch(`/${locale}/profile`, payload, {
        headers: { "X-CSRF-Token": csrfToken },
      });
    } catch (error) {
      console.error("Error saving setting:", error);
      setUser(originalUser);
    }
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !user.interests.some((i) => i.name === newInterest.trim())
    ) {
      // Note: This logic is only for the frontend. Actual saving happens in handleSave.
      setUser({
        ...user,
        interests: [
          ...user.interests,
          { id: Date.now(), name: newInterest.trim() },
        ],
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interestId: number) => {
    setUser({
      ...user,
      interests: user.interests.filter((i) => i.id !== interestId),
    });
  };

  if (!user) {
    return <div className="container mx-auto p-8">{i18n.loading}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader
          isEditing={isEditing}
          isSaving={isSaving}
          saveError={saveError}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onSaveChanges={handleSave}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar user={user} />
          </div>
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  {i18n.tabs.profile}
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Activity className="h-4 w-4" />
                  {i18n.tabs.activity}
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  {i18n.tabs.settings}
                </TabsTrigger>
                <TabsTrigger value="privacy" className="gap-2">
                  <Shield className="h-4 w-4" />
                  {i18n.tabs.privacy}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <ProfileTabContent
                  user={user}
                  isEditing={isEditing}
                  onUserChange={setUser}
                  newInterest={newInterest}
                  onNewInterestChange={setNewInterest}
                  onAddInterest={addInterest}
                  onRemoveInterest={removeInterest}
                />
              </TabsContent>

              <TabsContent value="activity">
                <ActivityTabContent user={user} />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsTabContent
                  settings={user.settings}
                  onSettingChange={handleSettingChange}
                />
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacyTabContent
                  privacy={user.privacy}
                  onSettingChange={handleSettingChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfilePage;
