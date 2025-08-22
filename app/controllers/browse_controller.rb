class BrowseController < ApplicationController
  def index
    interests = Interest.all

    @react_props = {
      i18n: t("browse_page"),

      available_interests: InterestSerializer.new(interests).serializable_hash[:data].map { |item| item[:attributes] }
      # available_interests: Interest.all.select(:id, :name).as_json
    }
  end
end
