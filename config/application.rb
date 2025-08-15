require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Blogify
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Define los idiomas disponibles para la aplicación
    config.i18n.available_locales = [ :en, :es ]

    # Establece el idioma por defecto
    config.i18n.default_locale = :en

    config.autoload_lib(ignore: %w[assets tasks])
  end
end
