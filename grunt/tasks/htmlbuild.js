module.exports = function (grunt, options) {
  return {
    default: {
      src: '<%= paths.app %>/**/*.html',
      dest: '<%= paths.dist %>/',
      options: {
        beautify: true,
        relative: true
      }
    }
  }
};
