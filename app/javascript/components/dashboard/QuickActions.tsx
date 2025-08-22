import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import QuickActionsCard from "./QuickActionCard";

import { Plus, Target, Users, Zap } from "lucide-react";

const QuickActions = () => {
  const i18n = useI18n();

  const actionsData = [
    {
      key: "create_session",
      icon: Plus,
      href: "/sessions/new",
      gradient: "from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-900",
    },
    {
      key: "browse_users",
      icon: Users,
      href: "/browse",
      gradient:
        "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-900",
    },
    {
      key: "my_profile",
      icon: Target,
      href: "/profile",
      gradient: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-900",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
        <Zap className="h-6 w-6 text-primary" />
        {i18n.quick_actions_title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actionsData.map((action) => {
          const actionI18n = i18n.actions[action.key];

          return (
            <QuickActionsCard
              key={action.key}
              icon={action.icon}
              href={action.href}
              gradient={action.gradient}
              title={actionI18n.title}
              description={actionI18n.description}
            />
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
