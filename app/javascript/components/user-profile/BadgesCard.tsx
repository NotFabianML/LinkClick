import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Badge as BadgeType } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Award } from "lucide-react";

interface BadgesCardProps {
  badges: BadgeType[];
}

const BadgesCard = ({ badges }: BadgesCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          {i18n.badges_card.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {badges.length > 0 ? (
          <div className="space-y-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
              >
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {i18n.badges_card.empty}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgesCard;
