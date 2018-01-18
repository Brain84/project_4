var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var minifycss = require('gulp-clean-css');

var rename = require('gulp-rename');
var es = require('event-stream');



// Load all gulp plugins from package.json into the plugins object.
var plugins = require('gulp-load-plugins')();

var src = {
    html: 'source/*.html',
    libs: 'source/vendor/**',
    libsCss: 'source/vendor/**/*.css',
    scripts: {
        all: 'source/js/**/*.js',
        app: 'source/js/scripts.js',
        files: [
            'source/js/scripts.js'
        ]
    },
    style: {
        all: 'source/css/**/*.scss',
        main: 'source/css'
    },
    images: 'source/images/**',
    fonts: 'source/fonts/**'
};

var build = 'dist/';
var out = {
    libs: build + 'vendor/',
    scripts: {
        file: 'scripts.js',
        folder: build + 'js/'
    },
    style: build + 'css/',
    images: build + 'images/',
    fonts: build + 'fonts/'
};


gulp.task('styles', function () {
    return gulp.src([src.style.all])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(out.style))
        .pipe(plugins.connect.reload());
});

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(gulp.dest(build))
        .pipe(plugins.connect.reload());
});
gulp.task('fonts', function () {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(out.fonts))
        .pipe(plugins.connect.reload());
});
gulp.task('images', function () {
    return gulp.src(src.images)
        .pipe(gulp.dest(out.images))
        .pipe(plugins.connect.reload());
});

/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function () {
    return gulp.src(src.scripts.all)
        .pipe(plugins.jshint({
            // Enable ES6 support
            esnext: true
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('libs', function () {
    /* In a production project  use npm or bower to manage libraries. */
    return gulp.src([src.libs, '!libs/**/*.css'])
        .pipe(gulp.dest(out.libs))
        .pipe(plugins.connect.reload());
});
gulp.task('libsCss', function () {
    /* In a production project  use npm or bower to manage libraries. */
    return gulp.src(src.libsCss)
        .pipe(minifycss())
        .pipe(gulp.dest(out.libs))
        .pipe(plugins.connect.reload());
});

/* Compile all script files into one output minified JS file. */
gulp.task('scripts', ['jshint'], function () {

    var tasks = src.scripts.files.map(function(entry) {
        return browserify({ entries: [entry] })
            .transform(babelify.configure({
                // You can configure babel here!
                // https://babeljs.io/docs/usage/options/
                presets: ["es2015"]
            }))
            .bundle()
            .pipe(vinylSourceStream(entry))
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.js',
                dirname: ''
            }))
            .pipe(vinylBuffer())
            .pipe(plugins.sourcemaps.init({
                // Load the sourcemaps browserify already generated
                loadMaps: true
            }))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write('./', {
                includeContent: true
            }))
            .pipe(gulp.dest(out.scripts.folder))
            .pipe(plugins.connect.reload());
        });
    // create a merged stream
    return es.merge.apply(null, tasks);

});

gulp.task('serve', ['build', 'watch'], function () {
    plugins.connect.server({
        root: build,
        port: 4200,
        livereload: true,
        fallback: build + 'index.html'
    });
});

gulp.task('watch', function () {
    gulp.watch(src.style.all, ['styles']);
    gulp.watch(src.html, ['html']);
    gulp.watch(src.scripts.all, ['scripts']);
});

gulp.task('build', ['scripts', 'html', 'styles', 'fonts', 'images', 'libsCss', 'libs']);
gulp.task('default', ['serve', 'build', 'watch']);
