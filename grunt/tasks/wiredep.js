module.exports = function (grunt, options) {
  return {
    task: {

      src: [
        '<%= paths.app %>/**/*.html',   // .html support...
        '<%= paths.app %>/css/.{scss,sass,less}'  // .scss & .sass support...
      ],

    }
  };
};
