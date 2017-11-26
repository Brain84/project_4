module.exports = function (grunt, options) {
  return {
    options: {
      reset: true,
      failHard: false
    },
    files: {
        src: ['<%= paths.dist %>/**/*.html'],
        filter: require('../lib/filter')(grunt).exists([grunt.config('config.paths.app')])
    }
  };
};
