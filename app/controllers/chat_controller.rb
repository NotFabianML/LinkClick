# app/controllers/chat_controller.rb
class ChatController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations = current_user.conversations.includes(:participants, :messages)

    options = { params: { current_user: current_user } }

    @react_props = {
      conversations: Api::V1::ConversationSerializer.new(conversations, options).serializable_hash[:data].map { |c| c[:attributes] },
      i18n: t("chat_page")
    }
  end
end
