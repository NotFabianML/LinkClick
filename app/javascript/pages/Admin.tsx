"use client";

import React, { useState } from "react";
import { AdminPageProps } from "../types";
import { useI18n } from "../contexts/I18nContext";

import { Tabs, TabsContent } from "../components/ui/tabs";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import UserManagementTab from "../components/admin/UserManagementTab";
import AnalyticsTab from "../components/admin/AnalyticsTab";
import SettingsTab from "../components/admin/SettingsTab";

const AdminPage = (props: AdminPageProps) => {
  const i18n = useI18n();

  const [activeTab, setActiveTab] = useState("users");

  const { users, stats } = props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <AdminHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="lg:col-span-3">
              <TabsContent value="users">
                <UserManagementTab initialUsers={users} />
              </TabsContent>
              <TabsContent value="analytics">
                {/* TODO: Implement analytics tab */}
                <AnalyticsTab />
              </TabsContent>
              <TabsContent value="settings">
                {/* TODO: Implement settings tab */}
                <SettingsTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
