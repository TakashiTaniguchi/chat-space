json.body  @message.body
json.image_url  @message.image.url
json.user_name  @message.user.name
json.created_at  l @message.created_at, format: :long
