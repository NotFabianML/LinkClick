class Achievement < ApplicationRecord
  RARITY = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 }.freeze
  def common?; self.rarity == RARITY[:common]; end
  def uncommon?; self.rarity == RARITY[:uncommon]; end
  def rare?; self.rarity == RARITY[:rare]; end
  def epic?; self.rarity == RARITY[:epic]; end
  def legendary?; self.rarity == RARITY[:legendary]; end
end
