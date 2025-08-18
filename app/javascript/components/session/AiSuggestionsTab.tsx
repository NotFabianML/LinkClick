import React, { useState } from "react";
import { useI18n } from "../../contexts/I18nContext";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { Brain, Sparkles, Target, UserPlus } from "lucide-react";

const mockRecommendedUsers = [
  {
    id: "1",
    name: "Emma Thompson",
    avatar: "",
    initials: "ET",
    role: "Senior React Developer",
    compatibilityScore: 95,
    matchingSkills: ["React Hooks", "Performance Optimization", "Custom Hooks"],
    reason: "Expert in React Hooks with extensive teaching experience",
    isOnline: true,
  },
  {
    id: "2",
    name: "David Kim",
    avatar: "",
    initials: "DK",
    role: "Frontend Architect",
    compatibilityScore: 88,
    matchingSkills: ["React", "JavaScript", "Code Review"],
    reason: "Strong background in React patterns and mentoring",
    isOnline: false,
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "",
    initials: "PP",
    role: "React Specialist",
    compatibilityScore: 92,
    matchingSkills: ["React Hooks", "State Management", "Testing"],
    reason: "Specializes in advanced React concepts and has great reviews",
    isOnline: true,
  },
];

const AiSuggestionsTab = () => {
  const i18n = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(mockRecommendedUsers);

  // TODO: Implement actual data fetching logic for AI recommendations
  const refreshRecommendations = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      // user fetching logic would go here
      setIsLoading(false);
    }, 1500);
  };

  const inviteUser = (userId: string) => {
    console.log(`Inviting user ${userId} to session`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">{i18n.sidebar.ai_tab.title}</h3>
            <p className="text-xs text-muted-foreground">
              {i18n.sidebar.ai_tab.subtitle}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshRecommendations}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm truncate">
                    {user.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-primary" />
                    <span className="text-xs font-bold text-primary">
                      {user.compatibilityScore}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {user.role}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {user.matchingSkills.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="w-full h-8 text-xs"
                  onClick={() => inviteUser(user.id)}
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  {i18n.sidebar.ai_tab.invite_button}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {i18n.sidebar.ai_tab.matching_info_title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {i18n.sidebar.ai_tab.matching_info_description}
        </p>
      </div>
    </div>
  );
};

export default AiSuggestionsTab;
