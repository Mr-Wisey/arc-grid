'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'js/plugins/*.js',
    'js/_main.js'
  ];

  grunt.initConfig({
    sass: {                              // Task
        dev: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
            'css/main.css': 'scss/main.scss'       // 'destination': 'source'
          }
        },
        build: {                            // Target
          options: {                       // Target options
            style: 'compressed'
          },
          files: {                         // Dictionary of files
            'css/main.min.css': 'scss/main.scss'       // 'destination': 'source'
          }
        }
    },
    combine_mq: {
      new_filename: {
          options: {
                  beautify: false
          },
        src: 'css/main.min.css',
        dest: 'css/main.min.css'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [jsFileList]
        }
      }
    },
    watch: {
      sass: {
        files: [
          'scss/*.scss',
          'scss/**/*.scss',
          'scss/**/**/*.scss'
        ],
        tasks: ['sass:dev']
      },
      js: {
        files: [
          jsFileList
        ],
        tasks: ['concat']
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'sass:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'sass:build',
    'combine_mq',
    'uglify'
  ]);
};
