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
          'bower_components/straw-android/src/**/*.js'
          'bower_components/straw-android-plugin.js/src/**/*.js'
          '../bower_components/straw-android/src/**/*.js'
          '../bower_components/straw-android-plugin.js/src/**/*.js'
          'src/infrastructure/**/*.js'
        ]
        helpers: [
          'bower_components/sinon-1.7.3.js/index.js'
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
            'node_modules/jasmine-jscoverage-reporter/reporter.js'
          ]

  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-contrib-jasmine'

  g.registerTask 'test', ['jshint', 'jasmine:app']

  g.registerTask 'default', ['test']
