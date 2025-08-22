import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { BarChart3 } from "lucide-react";

const AnalyticsTab = () => {
  const i18n = useI18n();
  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          {i18n.analytics_tab.title}
        </CardTitle>
        <CardDescription>{i18n.analytics_tab.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] flex items-center justify-center bg-muted/20 rounded-lg border">
          <p className="text-muted-foreground">
            Analytics Dashboard Coming Soon...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
