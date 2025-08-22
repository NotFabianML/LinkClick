import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Award } from "lucide-react";

import { Achievement } from "../../types";

interface AchievementsCardProps {
  achievements: Achievement[];
}

// TODO: Estos datos vendrán del controlador en el futuro.
// const mockAchievements: Achievement[] = [
//   {
//     name: "First Steps",
//     description: "Complete your first session",
//     icon: "🚀",
//     rarity: "common",
//   },
//   {
//     name: "Knowledge Seeker",
//     description: "Join 10 sessions",
//     icon: "📚",
//     rarity: "common",
//   },
//   {
//     name: "Rising Star",
//     description: "Earn 1000 points",
//     icon: "⭐",
//     rarity: "uncommon",
//   },
//   {
//     name: "Mentor",
//     description: "Help 5 students",
//     icon: "🤝",
//     rarity: "uncommon",
//   },
//   {
//     name: "Expert",
//     description: "Create 10 sessions",
//     icon: "👨‍🏫",
//     rarity: "rare",
//   },
//   {
//     name: "Perfectionist",
//     description: "Maintain 4.8+ rating",
//     icon: "🎯",
//     rarity: "rare",
//   },
// ];

const getRarityColor = (rarity: string, i18n: any) => {
  const colors: { [key: string]: string } = {
    common: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    uncommon:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    rare: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    epic: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    legendary:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  };
  return colors[rarity] || "bg-muted/50 text-muted-foreground";
};

const AchievementsCard = ({ achievements }: AchievementsCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          {i18n.sidebar.achievements.title}
        </CardTitle>
        <CardDescription>{i18n.sidebar.achievements.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {achievements.slice(0, 6).map((achievement, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
            >
              <span className="text-lg">{achievement.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">
                  {achievement.description}
                </div>
              </div>
              <Badge
                className={`text-xs capitalize ${getRarityColor(
                  achievement.rarity,
                  i18n
                )}`}
              >
                {i18n.sidebar.achievements.rarities[achievement.rarity]}
              </Badge>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          {i18n.sidebar.achievements.view_all_button}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
