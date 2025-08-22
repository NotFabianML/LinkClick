import React from "react";
import { LeaderboardUser } from "../../types";
import { useI18n } from "../../contexts/I18nContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import {
  Crown,
  Medal,
  Award,
  Star,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
  return (
    <span className="text-lg font-bold text-muted-foreground w-5 text-center">
      #{rank}
    </span>
  );
};

const getChangeIcon = (change: string) => {
  if (change === "up") return <ChevronUp className="h-4 w-4 text-green-500" />;
  if (change === "down")
    return <ChevronDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

interface LeaderboardTableProps {
  title: string;
  subtitle: string;
  users: LeaderboardUser[];
  category: "learners" | "teachers" | "active";
}

const LeaderboardTable = ({
  title,
  subtitle,
  users,
  category,
}: LeaderboardTableProps) => {
  const i18n = useI18n();

  const renderStats = (user: LeaderboardUser) => {
    switch (category) {
      case "learners":
        return i18n.learners_table.stats
          .replace("%{sessions}", user.sessionsJoined?.toString() || "0")
          .replace("%{hours}", user.hoursLearned?.toString() || "0");
      case "teachers":
        return i18n.teachers_table.stats
          .replace("%{sessions}", user.sessionsCreated?.toString() || "0")
          .replace("%{students}", user.studentsHelped?.toString() || "0");
      case "active":
        return i18n.active_table.stats
          .replace("%{streak}", user.dailyStreak?.toString() || "0")
          .replace("%{hours}", user.weeklyHours?.toString() || "0");
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-4">
          {users.map((user, index) => (
            <div
              key={user.rank}
              className={`p-3 rounded-lg transition-colors duration-200 flex items-center gap-4 ${
                user.isCurrentUser
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3 w-16">
                {getRankIcon(user.rank)}
              </div>
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  {user.isCurrentUser && (
                    <Badge className="text-xs">
                      {i18n.learners_table.you_badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{renderStats(user)}</span>
                  {category === "teachers" && user.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{" "}
                      {user.rating}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-2xl font-bold text-primary">
                    {user.points.toLocaleString()}
                  </span>
                  {getChangeIcon(user.change)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {i18n[`${category}_table`].points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
