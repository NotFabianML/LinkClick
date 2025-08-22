require "test_helper"

class Api::V1::ConnectionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_connections_index_url
    assert_response :success
  end
end
