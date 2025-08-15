class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  around_action :switch_locale
  before_action :set_shared_props

  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :role ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :first_name, :last_name, :bio, :linkedin_url, :github_url ])
  end

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def default_url_options
    { locale: I18n.locale }
  end

  # Este método prepara los datos que estarán disponibles en todas las páginas
  def set_shared_props
    @shared_props = {
      i18n: {
        navbar: t("navbar")
      },
      user: {
        logged_in: user_signed_in?,
        email: user_signed_in? ? current_user.email : nil
      },
      locale_data: {
        current_locale: I18n.locale,
        # Genera URLs para la página actual en ambos idiomas
        en_url: url_for(params.to_unsafe_h.merge(locale: :en)),
        es_url: url_for(params.to_unsafe_h.merge(locale: :es))
      }
    }
  end
end
