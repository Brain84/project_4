module.exports = function (grunt, options) {
  var path = require('path');

  function rename(dest, matchedSrcPath, options) {
    return path.join(dest, matchedSrcPath.slice(0, -4));
  }

  return {
    default: {
      options: {
        data: grunt._config
      },
      files: grunt.getBuildFiles({
        expand: true,
        rename: rename,
        src: ['**/*.tpl']
      })
    }
  };
};
