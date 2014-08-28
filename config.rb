# middleman config file
# see http://middlemanapp.com/

require 'yaml'

config_plus = '../middleman-plus.yml'

# load platform specific middleman settings
platform_settings = File.exist?(config_plus) ? YAML.load_file(config_plus) : {}

set :source, 'm'

set :build_dir, platform_settings['build_dir'] || 'middleman-build'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

ready do
  sprockets.append_path File.join root, "bower_components"
  sprockets.append_path File.join root, "../bower_components" # bower components of the parent project
  sprockets.append_path '../src' # main implementations
  sprockets.append_path '../../infrastructure' # infrastructure implementations in the parent project
end



config = {}


# develop mode configuration
configure :development do

  config['language'] = 'en'

end


# build time settings
configure :build do

  activate :minify_css
  activate :minify_javascript

end


set :config, config
