class Session < ApplicationRecord
  belongs_to :creator, class_name: "User"

  SESSION_TYPES = { quick_tutoring: 0, deep_study: 1, project_collab: 2, workshop: 3, study_group: 4, discussion: 5 }.freeze
  def quick_tutoring?; self.session_type == SESSION_TYPES[:quick_tutoring]; end
  def deep_study?; self.session_type == SESSION_TYPES[:deep_study]; end
  def project_collab?; self.session_type == SESSION_TYPES[:project_collab]; end
  def workshop?; self.session_type == SESSION_TYPES[:workshop]; end
  def study_group?; self.session_type == SESSION_TYPES[:study_group]; end
  def discussion?; self.session_type == SESSION_TYPES[:discussion]; end

  STATUS = { draft: 0, published: 1, in_progress: 2, completed: 3, cancelled: 4 }.freeze
  def draft?; self.status == STATUS[:draft]; end
  def published?; self.status == STATUS[:published]; end
  def in_progress?; self.status == STATUS[:in_progress]; end
  def completed?; self.status == STATUS[:completed]; end
  def cancelled?; self.status == STATUS[:cancelled]; end

  DIFFICULTY = { beginner: 0, intermediate: 1, advanced: 2 }.freeze
  def beginner?; self.difficulty == DIFFICULTY[:beginner]; end
  def intermediate?; self.difficulty == DIFFICULTY[:intermediate]; end
  def advanced?; self.difficulty == DIFFICULTY[:advanced]; end

  # --- ASOCIACIONES ---

  has_one :event, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :resources, dependent: :destroy
  has_many :feedbacks, dependent: :destroy
  has_and_belongs_to_many :participants, class_name: "User", join_table: "sessions_users"

  has_many :join_requests, dependent: :destroy
end
