class DashboardController < ApplicationController
  def index
    @react_props = {
      i18n: t("dashboard_page")
    }
  end
end
