import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Interest } from "../../types";

import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

import { Search, Filter } from "lucide-react";

interface SessionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  availableSkills: Interest[];
  selectedSkills: string[];
  onSkillChange: (skill: string, checked: boolean) => void;
  onClearFilters: () => void;
}

const SessionFilters = (props: SessionFiltersProps) => {
  const i18n = useI18n();
  // TODO: These session types could come from the backend later
  const sessionTypes = [
    "Workshop",
    "Tutorial",
    "Study Group",
    "Project",
    "Quick Tutoring",
    "Discussion",
  ];
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={i18n.filters.search_placeholder}
              value={props.searchQuery}
              onChange={(e) => props.onSearchChange(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2">
            <Select value={props.sortBy} onValueChange={props.onSortByChange}>
              <SelectTrigger className="w-40 bg-background/50">
                <SelectValue placeholder={i18n.filters.sort_by.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">
                  {i18n.filters.sort_by.date}
                </SelectItem>
                <SelectItem value="popularity">
                  {i18n.filters.sort_by.popularity}
                </SelectItem>
                <SelectItem value="rating">
                  {i18n.filters.sort_by.rating}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={props.onToggleFilters}
              className="bg-background/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              {i18n.filters.filters_button}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {props.showFilters && (
          <div className="mt-6 pt-6 border-t border-border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>{i18n.filters.session_type_label}</Label>
                <Select
                  value={props.selectedType}
                  onValueChange={props.onTypeChange}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {i18n.filters.all_types}
                    </SelectItem>
                    {sessionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{i18n.filters.difficulty_label}</Label>
                <Select
                  value={props.selectedDifficulty}
                  onValueChange={props.onDifficultyChange}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {i18n.filters.all_levels}
                    </SelectItem>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={props.onClearFilters}
                  className="w-full bg-background/50"
                >
                  {i18n.filters.clear_button}
                </Button>
              </div>
            </div>
            <div>
              <Label className="mb-3 block">{i18n.filters.skills_label}</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {props.availableSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill.id}`}
                      checked={props.selectedSkills.includes(skill.name)}
                      onCheckedChange={(checked) =>
                        props.onSkillChange(skill.name, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`skill-${skill.id}`}
                      className="text-sm font-normal"
                    >
                      {skill.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionFilters;
