module.exports = function (grunt, options) {
  return {
    default: {
      tasks: [
        
        'connect',
        
        'watch',
        'compass:watch'
      ],
      options: {
        limit: 3,
        logConcurrentOutput: true
      }
    }
  };
};
