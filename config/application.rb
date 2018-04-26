require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.assets false # JSとCSSを生成しない
      g.helper false # helperクラスを生成しない
      g.test_framework false # テストスクリプトを生成しない
    end
    config.i18n.default_locale = :ja
  end
end
