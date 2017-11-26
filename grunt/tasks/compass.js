module.exports = function (grunt, options) {
  return {
    options: {
      sassDir: '<%= paths.app %>',
      cssDir: '<%= paths.dist %>',
      imagesDir: '<%= paths.app %>',
      fontsDir: '<%= paths.dist %>',
      generatedImagesDir: '<%= paths.dist %>',
      generatedImagesPath: '<%= paths.dist %>',
      httpGeneratedImagesPath: '../',
      relativeAssets: true
    },
    dist: {
      options: {
        noLineComments: true,
        outputStyle: 'expanded'
      }
    },
    watch: {
      options: {
        watch: true
      }
    }
  };
};
