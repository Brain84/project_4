module.exports = function (grunt, options) {
  return {
    options: {
      port: 9000,
      hostname: '127.0.0.1',
      keepalive: true,
      livereload: true
    },
    default: {
      options: {
        open: {
          target: 'http://localhost:9000/index.html'
        },
        base: [
          '<%= paths.dist %>',
          'resources'
        ]
      }
    }
  };
};
