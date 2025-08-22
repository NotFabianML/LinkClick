# app/serializers/upcoming_session_serializer.rb
class UpcomingSessionSerializer
  include JSONAPI::Serializer

  # Define the attributes based on the UpcomingSession TypeScript type.
  attributes :id, :title, :session_type

  # Custom attribute for date formatting.
  attribute :date do |session|
    session.event&.start_time&.strftime("%d de %b") || "N/A"
  end

  # Custom attribute for time formatting.
  attribute :time do |session|
    session.event&.start_time&.strftime("%I:%M %p") || "N/A"
  end

  # Placeholder for difficulty, as seen in the original controller.
  # TODO: This should later pull from session.difficulty.
  attribute :difficulty do |session|
     difficulty_key = Session::DIFFICULTY.key(session.difficulty)
    if difficulty_key
      I18n.t("session_difficulties.#{difficulty_key}")
    else
      "N/A"
    end
  end

  # Custom attribute for participants, mapping to the expected structure.
  attribute :participants do |session|
    session.participants.map do |p|
      {
        name: p.first_name,
        avatar: "...", # Placeholder
        initials: "#{p.first_name&.first}"
      }
    end
  end

  # Handle i18n for the participant count directly in the serializer.
  attribute :participants_count_text do |session|
    I18n.t("dashboard_page.session_card.participants_count", count: session.participants.length)
  end
end
