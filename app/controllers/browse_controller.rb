class BrowseController < ApplicationController
  def index
    @react_props = {
      i18n: t("browse_page")
    }
  end
end
