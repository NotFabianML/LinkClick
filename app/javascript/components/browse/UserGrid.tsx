import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { BrowseUser } from "../../types";

import UserCard from "./UserCard";
import { Button } from "../ui/button";

import { Users } from "lucide-react";

interface UserGridProps {
  users: BrowseUser[];
  loading: boolean;
  error: string | null;
  onClearFilters: () => void;
}

const UserGrid = ({ users, loading, error, onClearFilters }: UserGridProps) => {
  const i18n = useI18n();

  if (loading) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Loading users...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-destructive py-12">{error}</p>;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          {i18n.results.no_users_found}
        </p>
        <Button variant="outline" onClick={onClearFilters}>
          {i18n.filters.clear_button}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-muted-foreground">
          {users.length === 1
            ? i18n.results.users_found.one
            : i18n.results.users_found.other.replace(
                "%{count}",
                users.length.toString()
              )}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
