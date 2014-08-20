# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jshint:
      options:
        jshintrc: '.jshintrc'
      source: 'app/src/**/*.js'
      test: 'app/spec/**/*.js'

    jasmine:

      options:
        specs: 'app/spec/*spec.js'
        vendor: [
          'bower_components/jquery/jquery.min.js'
          'bower_components/straw-android/src/**/*.js'
          'bower_components/straw-android-plugin.js/src/**/*.js'
        ]
        helpers: [
          'bower_components/sinon-1.7.3.js/index.js'
        ]

      app:
        src: 'app/src/domain/*.js'

      'app-cov':
        src: 'app/src-cov/domain/*.js'
        options:
          helpers: [
            'bower_components/sinon-1.7.3.js/index.js'
            'node_modules/jasmine-jscoverage-reporter/reporter.js'
          ]

  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-contrib-jasmine'

  g.registerTask 'test', ['jshint', 'jasmine:app']

  g.registerTask 'default', ['test']
