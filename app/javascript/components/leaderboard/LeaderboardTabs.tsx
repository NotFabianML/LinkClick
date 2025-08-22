import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { LeaderboardUser } from "../../types";
import LeaderboardTable from "./LeaderboardTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { BookOpen, Users, Zap } from "lucide-react";

interface LeaderboardTabsProps {
  data: {
    topLearners: LeaderboardUser[];
    topTeachers: LeaderboardUser[];
    mostActive: LeaderboardUser[];
  };
  timePeriod: string;
}

const LeaderboardTabs = ({ data, timePeriod }: LeaderboardTabsProps) => {
  const i18n = useI18n();
  const timePeriodText =
    i18n.header.time_periods[timePeriod] || i18n.header.time_periods.monthly;

  return (
    <Tabs defaultValue="learners">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="learners" className="gap-2">
          <BookOpen className="h-4 w-4" />
          {i18n.tabs.learners}
        </TabsTrigger>
        <TabsTrigger value="teachers" className="gap-2">
          <Users className="h-4 w-4" />
          {i18n.tabs.teachers}
        </TabsTrigger>
        <TabsTrigger value="active" className="gap-2">
          <Zap className="h-4 w-4" />
          {i18n.tabs.active}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="learners">
        <LeaderboardTable
          title={`${i18n.learners_table.title} - ${timePeriodText}`}
          subtitle={i18n.learners_table.subtitle}
          users={data.topLearners}
          category="learners"
        />
      </TabsContent>

      <TabsContent value="teachers">
        <LeaderboardTable
          title={`${i18n.teachers_table.title} - ${timePeriodText}`}
          subtitle={i18n.teachers_table.subtitle}
          users={data.topTeachers}
          category="teachers"
        />
      </TabsContent>

      <TabsContent value="active">
        <LeaderboardTable
          title={`${i18n.active_table.title} - ${timePeriodText}`}
          subtitle={i18n.active_table.subtitle}
          users={data.mostActive}
          category="active"
        />
      </TabsContent>
    </Tabs>
  );
};

export default LeaderboardTabs;
