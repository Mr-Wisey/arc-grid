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


    // modernizr
    modernizr: {

        dist: {
            // [REQUIRED] Path to the build you're using for development.
            "devFile" : "js/modernizr/modernizr-latest.js",

            // Path to save out the built file.
            "outputFile" : "js/plugins/aa-modernizr-custom.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : false,
                "printshiv" : false,
                "load" : false,
                "mq" : false,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false,
                "cssclassprefix": ""
            },

            // By default, source is uglified before saving
            "uglify" : false,

            // Define any tests you want to implicitly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
            // except files that are in node_modules/.
            // You can override this by defining a "files" array below.
               "files" : {
                    "src": [
                        'js/scripts.js', 
                        'css/main.css'
                    ]
               },

            // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
            // "handler": function (tests) {},

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
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
    'modernizr',
    'concat:concat_basic',
    'concat:concat_ie8',
    'uglify:uglify_basic',
    'uglify:uglify_ie8'
  ]);
};
