import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TabsList, TabsTrigger } from "../ui/tabs";

import { Users, BarChart3, Settings, Shield } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const i18n = useI18n();

  const navItems = [
    { value: "users", icon: Users, ...i18n.sidebar.users },
    { value: "analytics", icon: BarChart3, ...i18n.sidebar.analytics },
    { value: "settings", icon: Settings, ...i18n.sidebar.settings },
  ];

  return (
    <Card className="sticky top-24 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          {i18n.sidebar.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <TabsList className="grid w-full grid-rows-3 h-auto bg-transparent p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                onClick={() => onTabChange(item.value)}
                className="w-full justify-start gap-3 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
              >
                <Icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;
