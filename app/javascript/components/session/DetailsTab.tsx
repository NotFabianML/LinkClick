import React from "react";
import { SessionData } from "../../types";
import { useI18n } from "../../contexts/I18nContext";

import { FileText, Clock, Calendar } from "lucide-react";

interface DetailsTabProps {
  session: SessionData;
}

const DetailsTab = ({ session }: DetailsTabProps) => {
  const i18n = useI18n();

  return (
    <div className="space-y-4">
      {/* Description Section */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {i18n.sidebar.details_tab.description_title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
          {session.description}
        </p>
      </div>

      {/* Schedule Section */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {i18n.sidebar.details_tab.schedule_title}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">
              {session.event_data.scheduled_date ||
                i18n.sidebar.details_tab.no_date}
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm">
              {session.event_data.scheduled_time ||
                i18n.sidebar.details_tab.no_time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
