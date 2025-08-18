import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Feedback } from "../../types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import StarRating from "../common/StartRating";

import { MessageSquare } from "lucide-react";

interface FeedbackCardProps {
  feedbacks: Feedback[];
}

const FeedbackCard = ({ feedbacks }: FeedbackCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          {i18n.feedback_card.title}
        </CardTitle>
        <CardDescription>{i18n.feedback_card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {feedbacks.length > 0 ? (
          <div className="space-y-4">
            {feedbacks.map((review) => (
              <div
                key={review.id}
                className="border-l-2 border-primary/20 pl-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.giver_name}</span>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {i18n.feedback_card.empty}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
