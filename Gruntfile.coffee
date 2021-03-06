# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jshint:
      options:
        jshintrc: '.jshintrc'
      source: 'src/**/*.js'
      test: 'spec/**/*.js'

    jasmine:

      options:
        specs: 'spec/**/*.js'
        vendor: [
          'bower_components/jquery/jquery.min.js'
          'bower_components/es6-promise/promise.min.js'
        ]
        helpers: [
          'bower_components/sinon-1.7.3.js/index.js'
          'spec-helper/infrastructure.js'
        ]

      app:
        src: [
          'src/domain/**/*.js'
        ]

      'app-cov':
        src: [
          'src-cov/domain/**/*.js'
        ]
        options:
          helpers: [
            'bower_components/sinon-1.7.3.js/index.js'
            'spec-helper/infrastructure.js'
            'node_modules/jasmine-jscoverage-reporter/reporter.js'
          ]

  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-contrib-jasmine'

  g.registerTask 'test', ['jshint', 'jasmine:app']

  g.registerTask 'default', ['test']
