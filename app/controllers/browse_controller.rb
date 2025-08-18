class BrowseController < ApplicationController
  def index
    @react_props = {
      i18n: t("browse_page"),

      available_interests: Interest.all.select(:id, :name).as_json
    }
  end
end
