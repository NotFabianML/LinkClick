class Api::V1::SelectableUserSerializer
  include JSONAPI::Serializer

  set_type :user

  attributes :id, :first_name, :last_name

  attribute :fullName do |user|
    "#{user.first_name} #{user.last_name}"
  end

  attribute :initials do |user|
    "#{user.first_name&.first}#{user.last_name&.first}"
  end
end
