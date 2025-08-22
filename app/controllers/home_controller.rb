class HomeController < ApplicationController
  def index
    @react_props = {
      i18n: t("homepage")
    }
  end
end
