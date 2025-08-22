class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  around_action :switch_locale
  before_action :set_shared_props

  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, alert: exception.message
  end

  protected

  def after_sign_in_path_for(resource)
    dashboard_path(locale: I18n.locale)
  end

  def after_sign_up_path_for(resource)
    new_user_session_path(locale: I18n.locale)
  end


  def configure_permitted_parameters
    #   devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :role ])
    #   devise_parameter_sanitizer.permit(:account_update, keys: [ :first_name, :last_name, :bio, :linkedin_url, :github_url ])
    devise_parameter_sanitizer.permit(:sign_up, keys: [
      :first_name,
      :last_name,
      :role,
      :website,
      :github_url,
      :linkedin_url,
      # This special syntax allows an array of IDs to be accepted for the 'interests' association.
      interest_ids: []
    ])

    devise_parameter_sanitizer.permit(:account_update, keys: [ :first_name, :last_name, :bio, :linkedin_url, :github_url ])
  end

  private

  def switch_locale(&action)
    locale = params[:locale] || session[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
    session[:locale] = locale
  end

  def default_url_options
    { locale: I18n.locale }
  end

  def set_shared_props
    # path = request.path

    @shared_props = {
      i18n: {
        navbar: t("navbar")
      },
      user: {
        logged_in: user_signed_in?,
        id: user_signed_in? ? current_user.id : nil,
        email: user_signed_in? ? current_user.email : nil,
        first_name: user_signed_in? ? current_user.first_name : nil,
        last_name: user_signed_in? ? current_user.last_name : nil,

        abilities: {
          can_create_session: user_signed_in? && can?(:create, Session),
          can_view_leaderboard: user_signed_in? && can?(:view, :leaderboard) # Ejemplo para el futuro
          # Añade aquí cualquier otro permiso que el frontend necesite conocer.
        }
      },
      locale_data: {
        current_locale: I18n.locale,
        # Genera URLs para la página actual en ambos idiomas
        en_url: url_for(params.to_unsafe_h.merge(locale: :en)),
        es_url: url_for(params.to_unsafe_h.merge(locale: :es))
        # en_url: url_for(path: path, locale: :en),
        # es_url: url_for(path: path, locale: :es)
      }
    }
  end
end
