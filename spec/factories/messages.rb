FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/fixtures/no_image.jpg")
    user
    group
  end
end
