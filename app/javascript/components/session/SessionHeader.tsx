import React, { useState } from "react";
import { SessionData, SessionPageProps } from "../../types";
import axios from "axios";
import { useI18n } from "../../contexts/I18nContext";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner";

import { Calendar, Clock } from "lucide-react";

interface SessionHeaderProps {
  session: SessionData;
  currentUserRole: SessionPageProps["current_user_role"];
  onJoinSuccess: () => void;
}

const SessionHeader = ({
  session,
  currentUserRole,
  onJoinSuccess,
}: SessionHeaderProps) => {
  const i18n = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestJoin = async () => {
    setIsSubmitting(true);
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.post(
        `/${locale}/sessions/${session.id}/join.json`,
        {},
        { headers: { "X-CSRF-Token": csrfToken } }
      );

      toast.success(i18n.toasts.join_request_success_title, {
        description: i18n.toasts.join_request_success_description,
      });
      setRequestSent(true);
      onJoinSuccess();
    } catch (error) {
      toast.error(i18n.toasts.join_request_error_title, {
        description: i18n.toasts.join_request_error_description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActionButtons = () => {
    if (currentUserRole.is_creator) {
      return <Button>{i18n.header.action_buttons.edit}</Button>;
    }
    if (currentUserRole.is_participant) {
      return (
        <Badge variant="secondary">
          {i18n.header.action_buttons.is_participant}
        </Badge>
      );
    }
    if (requestSent) {
      return (
        <Badge variant="outline">
          {i18n.header.action_buttons.request_sent}
        </Badge>
      );
    }
    return (
      <Button onClick={handleRequestJoin} disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : i18n.header.action_buttons.request_join}
      </Button>
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold text-foreground">{session.title}</h1>
        <Badge variant="default" className="animate-pulse">
          {session.status}
        </Badge>
        <div className="flex items-center gap-2 ml-auto">
          {renderActionButtons()}
        </div>
      </div>
      <div className="flex items-center gap-6 text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {session.event_data.scheduled_date ||
            i18n.sidebar.details_tab.no_date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {session.event_data.scheduled_time ||
            i18n.sidebar.details_tab.no_time}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {i18n.header.participants}
        </span>
        <div className="flex -space-x-2">
          {session.participants.map((participant) => (
            <div key={participant.id} className="relative group">
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback className="text-xs">
                  {participant.initials}
                </AvatarFallback>
              </Avatar>
              {participant.is_online && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
              )}
              <span className="absolute bottom-full mb-2 w-max bg-background text-foreground text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {participant.full_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionHeader;
