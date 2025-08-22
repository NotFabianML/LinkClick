import React from "react";

interface DashboardHeaderProps {
  welcomeMessage: string;
  subtitle: string;
}

const DashboardHeader = ({ welcomeMessage, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border-0 shadow-xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
          {welcomeMessage} 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
