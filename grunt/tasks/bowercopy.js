module.exports = function (grunt, options) {
  return {
    default: {
      options: {
        destPrefix: '<%= paths.dist %>'
      },
      files: {
        'js/vendor/jquery.js': 'jquery/dist/jquery.min.js'
      }
    }
  };
};
