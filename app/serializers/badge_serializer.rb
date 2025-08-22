class BadgeSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :description
end
