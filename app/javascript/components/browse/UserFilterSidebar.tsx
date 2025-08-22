import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Interest } from "../../types";

import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

import { Search } from "lucide-react";

interface UserFilterSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  availableInterests: Interest[];
  selectedInterests: string[];
  onInterestChange: (interest: string, checked: boolean) => void;
  onClearFilters: () => void;
}

const UserFilterSidebar = ({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  availableInterests,
  selectedInterests,
  onInterestChange,
  onClearFilters,
}: UserFilterSidebarProps) => {
  const i18n = useI18n();

  return (
    <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-0 shadow-lg">
      <div className="p-6 space-y-6">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search">{i18n.filters.search_placeholder}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder={i18n.filters.search_placeholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-muted/30"
            />
          </div>
        </div>

        {/* Role Filter */}
        <div className="space-y-3">
          <Label>{i18n.filters.role_title}</Label>
          <RadioGroup value={selectedRole} onValueChange={onRoleChange}>
            {Object.entries(i18n.filters.roles).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`role-${key}`} />
                <Label htmlFor={`role-${key}`}>{String(label)}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Interests Filter */}
        <div className="space-y-3">
          <Label>{i18n.filters.interests_title}</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {availableInterests.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`interest-${interest.id}`}
                  checked={selectedInterests.includes(interest.name)}
                  onCheckedChange={(checked) =>
                    onInterestChange(interest.name, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`interest-${interest.id}`}
                  className="text-sm font-normal"
                >
                  {interest.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full bg-transparent"
        >
          {i18n.filters.clear_button}
        </Button>
      </div>
    </Card>
  );
};

export default UserFilterSidebar;
