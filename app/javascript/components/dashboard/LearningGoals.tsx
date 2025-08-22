import React from "react";
import { LearningGoal } from "../../types";
import { useI18n } from "../../contexts/I18nContext";

import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

import { Target } from "lucide-react";

interface LearningGoalsProps {
  goals: LearningGoal[];
}

const LearningGoals = ({ goals }: LearningGoalsProps) => {
  const i18n = useI18n();

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
        <Target className="h-5 w-5 text-primary" />
        {i18n.learning_goals_title}
      </h2>
      <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4 space-y-4">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">{goal.title}</h4>
                  <span className="text-sm text-muted-foreground">
                    {goal.progress}%
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{goal.target}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              {i18n.empty_states.no_goals}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default LearningGoals;
