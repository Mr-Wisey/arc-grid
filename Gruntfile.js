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
  var jsFileListie8 = [
    'js/ie8/plugins/*.js'
  ];

  grunt.initConfig({


// CSS
    // compile sass
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
            'css/main.min.css': 'scss/main.scss',       // 'destination': 'source'
            'css/main.css': 'scss/main.scss'       // 'destination': 'source'
          }
        }
    },
    // combine all mediaqueries
    combine_mq: {
      new_filename: {
          options: {
            beautify: false
          },
        src: 'css/main.min.css',
        dest: 'css/main.min.css',
      },
      new_filename2: {
          options: {
            beautify: false
          },
        src: 'css/main.css',
        dest: 'css/main.css',
      }
    },
    // auto prefixes css
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      no_dest: {
        src: 'css/*.css', // globbing is also possible here
      }
    },

// JS
    // combine js-files
    concat: {
      concat_basic: {
        src: [jsFileList],
        dest: 'js/scripts.js',
      },
      concat_ie8: {
        src: [jsFileListie8],
        dest: 'js/ie8/ie8.js',
      },
    },
    // ugify js
    uglify: {
      uglify_basic: {
        files: {
          'js/scripts.min.js': [jsFileList],
          'js/scripts.js': [jsFileList],
        }
      },
      uglify_ie8: {
        files: {
          'js/ie8/ie8.js': 'js/ie8/ie8.js'
        }
      }
    },

  
// BASICS
    watch: {
      sass: {
        files: [
          'scss/*.scss',
          'scss/**/*.scss',
          'scss/**/**/*.scss',
          'scss/**/**/**/*.scss'
        ],
        tasks: ['sass:dev']
      },
      js: {
        files: [
          jsFileList
        ],
        tasks: ['concat']
      }
    },
    jshint: {
      all: ['js/_main.js']
    }
  });


// Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'sass:dev',
    'concat_basic'
  ]);
  grunt.registerTask('build', [
    'sass:build',
    'combine_mq',
    'autoprefixer',
    'concat:concat_basic',
    'concat:concat_ie8',
    'uglify:uglify_basic',
    'uglify:uglify_ie8'
  ]);
};
