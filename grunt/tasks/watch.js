var path = require('path'),
    fs = require('fs');

module.exports = function (grunt, options) {
  function sync(action, filepath, srcDir, destDir) {
    var destPath = destDir + '/' + filepath.split(path.sep).slice((srcDir.match(/\//g) || []).length + 1).join('/');

    if (action == 'deleted') {
      grunt.file.delete(destPath);
    } else {
      var srcStat = fs.statSync(filepath);

      if (grunt.file.exists(destPath)) {
        var destStat = fs.statSync(destPath);
        if (destStat.mtime >= srcStat.mtime) return;
      }

      if (grunt.file.isDir(filepath)) {
        grunt.file.mkdir(destPath);
        grunt.file.recurse(filepath, function(abspath) {
          sync(action, abspath, srcDir, destDir);
        });
      } else {
        grunt.file.copy(filepath, destPath);
        fs.utimesSync(destPath, srcStat.atime, srcStat.mtime);
      }
    }
  }

  grunt.event.on('watch', function(action, filepath, target) {
    if (target.match(/^copy/)) {
      sync(action, filepath, options.paths.app, options.paths.dist);
    }
  });

  return {
    copy: {
      options: {
        debounceDelay: 50
      },
      files: [
        '<%= paths.app %>/**/*.{css,js}'
      ]
    },
    copyL: {
      options: {
        debounceDelay: 50,
        livereload: true
      },


      files: [
        '<%= paths.app %>/**/*',
        '!<%= paths.app %>/**/*.{css,js,coffee,scss,sass,less,jade,styl,tpl}',
        '<%= paths.debug %>/**/*.{jpg,jpeg,png,json}',
      ]
    },

    template: {
      options: {
        livereload: true
      },
      files: ['<%= paths.app %>/**/*.tpl'],
      tasks: ['template']
    },
    // bower: {
    //   files: ['bower.json'],
    //   tasks: ['bowercopy']
    // }
    css: {
      options: {
        livereload: true,
        filter: require('../lib/filter')(grunt).exists(grunt.config.get('config.paths.app'), true)
      },
      files: [
        '<%= paths.dist %>/**/*.css'
      ]
    },
    flats: {
      options: {
        debounceDelay: 700,
        spawn: true,
        livereloadOnError: false
      },
      files: ['<%= paths.debug %>/**/*.{jpg,jpeg,png}'],
      tasks: ['flayup']
    },
  };
};
