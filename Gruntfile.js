module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      dist: {
        files: {
          'dist/index.js': 'index.js'
        }
      }
    }
  });

  grunt.registerTask('default', ['babel']);

};