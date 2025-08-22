import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Interest } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface InterestsCardProps {
  interests: Interest[];
}

const InterestsCard = ({ interests }: InterestsCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{i18n.interests_card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest.id} variant="outline">
                {interest.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {i18n.interests_card.empty}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InterestsCard;
