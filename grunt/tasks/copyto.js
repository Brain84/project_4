module.exports = function (grunt, options) {
  return {
    options: {
      ignore: [
        '.gitkeep',
        '**/.git',
        '**/.git/**/*',
        '**/*.{coffee,scss,sass,less,jade,styl,tpl}',
        '**/.*.{coffee,scss,sass,less,jade,styl,tpl}',
      ]
    },
    default: {
      files: grunt.getBuildFiles({
        src: '**'
      })
    }
  };
};
