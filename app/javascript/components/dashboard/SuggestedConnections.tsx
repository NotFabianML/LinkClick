import React from "react";
import { SuggestedConnection } from "../../types";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

import { Users, Star } from "lucide-react";

interface SuggestedConnectionsProps {
  connections: SuggestedConnection[];
}

const SuggestedConnections = ({ connections }: SuggestedConnectionsProps) => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const handleConnectClick = (connectionId: number) => {
    navigate(`/users/${connectionId}`);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
        <Users className="h-5 w-5 text-primary" />
        {i18n.suggested_connections_title}
      </h2>
      <div className="space-y-4">
        {connections.length > 0 ? (
          connections.map((connection) => (
            <Card
              key={connection.id}
              className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={connection.avatar}
                      alt={connection.name}
                    />
                    <AvatarFallback>{connection.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      {connection.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          connection.role === "Teacher"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {connection.role}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">
                          {connection.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {connection.topSkills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {connection.sessions_completed_text}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleConnectClick(connection.id)}
                >
                  {i18n.suggested_connections.connect_button}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              {i18n.empty_states.no_suggestions}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default SuggestedConnections;
