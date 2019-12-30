const { src, dest, parallel, series,  watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
const postcss = require('gulp-postcss')
var browserSync = require('browser-sync').create();


//use ES6, minimise js and rename file
function jsFn(cb) {
    return src('js/main.js')
    //babel needs the preset object or it won't work
    .pipe(babel({
        plugins: ['@babel/transform-runtime'],
        presets: ['@babel/preset-env']
    }))
    // The gulp-uglify plugin won't update the filename
    .pipe(uglify())
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('js/'));
  }
  

// Autoprefix and minimise css  
function cssFn(cb) {
    var plugins = [
        autoprefixer(),
        cssnano()
    ]
    return src('css/style.css')
    // PostCSS gulp plugin to pipe CSS through several plugins, but parse CSS only once.
    //it's quicker
        .pipe(postcss(plugins))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('css/'))
  }
  

// set up server with browserSync then watch for changes on main.js and style.css
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
            //👇 if you are running a local dev server
            // proxy: 'sandpit404:8888/'
        },
        notify:false
    });
    watch('./index.html').on('change', browserSync.reload);

    watch('./css/style.css', cssFn)
    watch('./css/style.min.css').on('change', browserSync.reload);
    watch('./js/main.js', jsFn)
    watch('./js/main.min.js').on('change', browserSync.reload)

}


// Set the  default gulp function(s)
exports.default = function() {
    serve()
  };