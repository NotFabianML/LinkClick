# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the user here.
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, published: true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md

    # Los usuarios no autenticados (invitados) no tienen un objeto `user`.
    user ||= User.new # guest user (not logged in)

    # --- REGLAS GLOBALES PARA TODOS ---
    # Todos pueden ver las sesiones públicas.
    can :read, Session, is_public: true, status: :published

    # --- REGLAS ESPECÍFICAS POR ROL ---
    if user.admin?
      # Los administradores pueden gestionar absolutamente todo.
      can :manage, :all
      can :access, :admin_dashboard
    # elsif user.teacher?
    #   # Los profesores pueden leer todas las sesiones públicas.
    #   can :read, Session, status: :published

    #   # Pueden crear nuevas sesiones.
    #   can :create, Session

    #   # Solo pueden actualizar o destruir las sesiones que ellos crearon.
    #   can :update, Session, creator_id: user.id
    #   can :destroy, Session, creator_id: user.id

    #   # Pueden gestionar las solicitudes para unirse a sus propias sesiones.
    #   can :manage, JoinRequest, session: { creator_id: user.id }

    # elsif user.student?
    #   # # Los estudiantes pueden leer todas las sesiones públicas.
    #   # can :read, Session, status: :published

    #   # # Pueden solicitar unirse a las sesiones.
    #   # can :join, Session

    #   # # pueden crear, actualizar o destruir sesiones.
    #   # can :create, Session
    #   # can :update, Session
    #   # can :destroy, Session

    #   can :manage, :all
    # end
    elsif user.persisted? && (user.student? || user.teacher?)
      # Define general abilities for all authenticated users.
      # They can view the main sections of the app.
      can :view, :browse
      can :view, :sessions
      can :view, :chat
      can :view, :leaderboard

      # Abilities for their own profile
      can :manage, :profile, user_id: user.id

      # Abilities for sessions
      can :create, Session
      can :read, Session # They can read details of any session they have access to
      can :update, Session, creator_id: user.id
      can :destroy, Session, creator_id: user.id
      can :join, Session

      # Abilities for other interactions
      can :manage, JoinRequest, user_id: user.id
      can :manage, Message, sender_id: user.id

      # Explicitly deny access to the admin dashboard.
      cannot :access, :admin_dashboard
    end
  end
end
