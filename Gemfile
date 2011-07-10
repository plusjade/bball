source 'http://rubygems.org'

RAILS_VERSION = '~> 3.0.5'
DM_VERSION    = '~> 1.1.0'

gem 'rails', '3.0.5'
gem "mysql"
gem 'rake' #, '0.8.7'
gem 'activesupport',      RAILS_VERSION, :require => 'active_support'
gem 'actionpack',         RAILS_VERSION, :require => 'action_pack'
gem 'actionmailer',       RAILS_VERSION, :require => 'action_mailer'
gem 'railties',           RAILS_VERSION, :require => 'rails'
gem 'mongrel'

gem 'dm-rails',          '~> 1.1.0'
gem 'dm-sqlite-adapter',    DM_VERSION
gem 'dm-mysql-adapter',     DM_VERSION
gem 'dm-migrations',        DM_VERSION
gem 'dm-types',             DM_VERSION
gem 'dm-validations',       DM_VERSION
gem 'dm-constraints',       DM_VERSION
gem 'dm-transactions',      DM_VERSION
gem 'dm-aggregates',        DM_VERSION
gem 'dm-timestamps',        DM_VERSION
gem 'dm-serializer',        DM_VERSION
gem 'dm-chunked_query'
gem 'mime-types', :require => 'mime/types'

gem 'cancan'
gem 'apron', '0.0.8', :git => 'https://github.com/plusjade/apron.git'

# Bundle the extra gems:
# gem 'bj'
# gem 'nokogiri'
# gem 'sqlite3-ruby', :require => 'sqlite3'
# gem 'aws-s3', :require => 'aws/s3'

group(:development, :test) do
  #gem 'ruby-debug'
  #gem 'shoulda-context'
  #gem 'ruby-debug'
  gem "rspec", "~> 2.5.0"
  gem 'rspec-rails', '~> 2.5'
  #gem 'capybara', :git => 'git://github.com/jnicklas/capybara.git'
  gem 'factory_girl_rails'
  gem "wirble"
  gem "hirb"
end
