import React, { useState, useMemo } from "react";
import axios from "axios";
import { useI18n } from "../../contexts/I18nContext";
import { AdminUser } from "../../types";
import { toast } from "sonner";
import UserTableFilters from "./UserTableFilters";
import UserTable from "./UserTable";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { Users, Mail, Trash2 } from "lucide-react";

interface UserManagementTabProps {
  initialUsers: AdminUser[];
}

const UserManagementTab = ({ initialUsers }: UserManagementTabProps) => {
  const i18n = useI18n();
  const [users, setUsers] = useState(initialUsers);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        roleFilter === "all" || user.role.toLowerCase() === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [initialUsers, searchQuery, roleFilter, statusFilter]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const handleToggleStatus = async (userId: string) => {
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.patch(
        `/${locale}/admin/users/${userId}/toggle_status`,
        {},
        { headers: { "X-CSRF-Token": csrfToken } }
      );

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success(i18n.toasts.user_toggle_status_success);
    } catch (error) {
      console.error("Error toggling user status :", error);
      toast.error(i18n.toasts.user_toggle_status_error);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {i18n.users_tab.title}
            </CardTitle>
            <CardDescription>{i18n.users_tab.subtitle}</CardDescription>
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {i18n.users_tab.selected_badge.replace(
                  "%{count}",
                  selectedUsers.length.toString()
                )}
              </Badge>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-1" />
                {i18n.users_tab.email_button}
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                {i18n.users_tab.delete_button}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <UserTableFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <UserTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          onToggleStatus={handleToggleStatus}
        />
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              {i18n.users_tab.no_users_found.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {i18n.users_tab.no_users_found.subtitle}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;
