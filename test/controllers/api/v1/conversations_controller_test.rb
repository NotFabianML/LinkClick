require "test_helper"

class Api::V1::ConversationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_conversations_index_url
    assert_response :success
  end
end
