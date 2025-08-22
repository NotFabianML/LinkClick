class Resource < ApplicationRecord
  belongs_to :session

  RESOURCE_TYPES = { notepad: 0, whiteboard: 1 }.freeze
  def notepad?; self.resource_type == RESOURCE_TYPES[:notepad]; end
  def whiteboard?; self.resource_type == RESOURCE_TYPES[:whiteboard]; end
end
