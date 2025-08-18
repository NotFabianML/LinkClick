import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Interest } from "../../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Star, Plus, X } from "lucide-react";

interface InterestsSkillsCardProps {
  interests: Interest[];
  isEditing: boolean;
  newInterest: string;
  onNewInterestChange: (value: string) => void;
  onAddInterest: () => void;
  onRemoveInterest: (interestId: number) => void;
}

const InterestsSkillsCard = ({
  interests,
  isEditing,
  newInterest,
  onNewInterestChange,
  onAddInterest,
  onRemoveInterest,
}: InterestsSkillsCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          {i18n.profile_tab.interests_skills.title}
        </CardTitle>
        <CardDescription>
          {i18n.profile_tab.interests_skills.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {interests.map((interest) => (
            <Badge key={interest.id} variant="secondary" className="gap-1">
              {interest.name}
              {isEditing && (
                <button
                  onClick={() => onRemoveInterest(interest.id)}
                  className="ml-1 hover:text-destructive"
                  aria-label={`Remove ${interest.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <Input
              placeholder={i18n.profile_tab.interests_skills.add_placeholder}
              value={newInterest}
              onChange={(e) => onNewInterestChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onAddInterest()}
            />
            <Button onClick={onAddInterest} size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterestsSkillsCard;
