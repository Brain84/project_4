module.exports = function (grunt, options) {
  return {
    default: {
      files: [
        {
          dot: true,
          src: [
            '<%= paths.tmp %>',
            '<%= paths.dist %>/**/*',
            
            
            
          ],
          filter: require('../lib/filter')(grunt).notExists()
        },
        {
          dot: true,
          src: [
            '<%= paths.tmp %>',
          ],
        }
      ]
    }
  };
};
