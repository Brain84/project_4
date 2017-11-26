module.exports = function (grunt, options) {
  return {
    main: {
      options: {
        archive: 'public_html/<%= id %>.zip'
      },
      files: [
        
        {
          cwd: '<%= paths.dist %>',
          src: ['**'],
          expand: true,
          dest: '<%= id %>'
        }
        
      ]
    }
  };
};
