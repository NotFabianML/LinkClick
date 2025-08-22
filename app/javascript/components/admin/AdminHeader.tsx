import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useI18n } from "../../contexts/I18nContext";

import { Button } from "../ui/button";

import { Download, Plus } from "lucide-react";

const AdminHeader = () => {
  const i18n = useI18n();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const locale =
        (window as any).sharedProps?.locale_data?.current_locale || "en";

      const response = await axios.get(`/${locale}/admin/users/export.csv`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const filename = `users-export-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(i18n.toasts.export_success);
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error(i18n.toasts.export_error);
    } finally {
      setIsExporting(false);
    }
  };
  
  // TODO: Implement Add User functionality
  const handleAddUser = () => {
    /* ... */
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold ...">{i18n.header.title}</h1>
          <p className="text-muted-foreground mt-2">{i18n.header.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="gap-2"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting
              ? i18n.header.exporting_button
              : i18n.header.export_button}
          </Button>

          {/* TODO: Implement Add User Button */}
          {/* <Button className="gap-2" onClick={handleAddUser}>
            <Plus className="h-4 w-4" />
            {i18n.header.add_user_button}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
