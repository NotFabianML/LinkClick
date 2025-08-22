"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BrowseUser, BrowsePageProps } from "../types";
import { useI18n } from "../contexts/I18nContext";

import UserFilterSidebar from "../components/browse/UserFilterSidebar";
import UserGrid from "../components/browse/UserGrid";

const BrowsePage = (props: BrowsePageProps) => {
  const i18n = useI18n();

  const [allUsers, setAllUsers] = useState<BrowseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const locale =
          (window as any).sharedProps?.locale_data?.current_locale || "en";
        const response = await axios.get(`/${locale}/users.json`);

        const transformedUsers: BrowseUser[] = response.data.map(
          (user: any) => ({
            id: user.id,
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            role: user.role,
            avatar: `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.email}`,
            initials: `${user.first_name?.[0] || ""}${
              user.last_name?.[0] || ""
            }`.toUpperCase(),
            topInterests: user.topInterests || [],
            rating: user.rating || 0,
            sessions: user.sessions || 0,
          })
        );

        setAllUsers(transformedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Could not load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRole =
        selectedRole === "all" || user.role.toLowerCase() === selectedRole;
      const matchesInterests =
        selectedInterests.length === 0 ||
        selectedInterests.every((interest) =>
          user.topInterests.includes(interest)
        );

      return matchesSearch && matchesRole && matchesInterests;
    });
  }, [allUsers, searchQuery, selectedRole, selectedInterests]);

  const handleInterestChange = (interest: string, checked: boolean) => {
    setSelectedInterests((prev) =>
      checked ? [...prev, interest] : prev.filter((i) => i !== interest)
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setSelectedInterests([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            {i18n.header.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {i18n.header.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <UserFilterSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              availableInterests={props.available_interests}
              selectedInterests={selectedInterests}
              onInterestChange={handleInterestChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Results grid */}
          <div className="lg:col-span-3">
            <UserGrid
              users={filteredUsers}
              loading={loading}
              error={error}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowsePage;
