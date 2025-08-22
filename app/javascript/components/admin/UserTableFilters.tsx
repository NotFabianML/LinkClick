import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

import { Search, Filter } from "lucide-react";

interface UserTableFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

const UserTableFilters = (props: UserTableFiltersProps) => {
  const i18n = useI18n();
  const {
    searchQuery,
    onSearchChange,
    roleFilter,
    onRoleChange,
    statusFilter,
    onStatusChange,
  } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={i18n.users_tab.filters.search_placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={roleFilter} onValueChange={onRoleChange}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {i18n.users_tab.filters.all_roles}
          </SelectItem>
          <SelectItem value="teacher">
            {i18n.users_tab.filters.teachers}
          </SelectItem>
          <SelectItem value="student">
            {i18n.users_tab.filters.students}
          </SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {i18n.users_tab.filters.all_status}
          </SelectItem>
          <SelectItem value="active">
            {i18n.users_tab.filters.active}
          </SelectItem>
          <SelectItem value="inactive">
            {i18n.users_tab.filters.inactive}
          </SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Filter className="h-4 w-4" />
        {i18n.users_tab.filters.more_filters}
      </Button>
    </div>
  );
};

export default UserTableFilters;
