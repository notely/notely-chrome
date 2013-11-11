module.exports = function(grunt) {

  grunt.initConfig({
    release: {
        options: {
        file: 'manifest.json', //default: package.json
        npm: false
        // github: { 
        //   repo: 'geddski/grunt-release', //put your user/repo here
        //   usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username 
        //   passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
        // }
      }
    }
  });

  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};