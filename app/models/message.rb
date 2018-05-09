class Message < ApplicationRecord
  validates :body_or_image, presence: true
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImageUploader

  private
  def body_or_image
    body.presence or image.presence
  end
end
