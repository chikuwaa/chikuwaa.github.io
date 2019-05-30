var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var rename   = require("gulp-rename");
var uglify = require('gulp-uglify');
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var ejs = require("gulp-ejs");
// var cmq = require('gulp-combine-media-queries');//@media
var plumber = require('gulp-plumber');
// var changed = require('gulp-changed');

var imageminOption = [
  imageminPngquant({ quality: [.65, .8] }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.jpegtran(),
  imagemin.optipng(),
  imagemin.svgo()
];
var src_dir = "./_src/study/";
var dest_dir = "./study/";


gulp.task('browser-sync', function(done) {
  browserSync.init({
      server: {
          baseDir: dest_dir,
          index: "index.html"
      }
  });
  done();
});

gulp.task('bs-reload' , function (done) {
  browserSync.reload();
  done();
});

// gulp.task('mincss', function() {
//   return gulp.src(src_dir+"css/**/*.css")
//     .pipe(cleanCSS())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest(dest_dir+'css/'));
// });

gulp.task('minjs', function() {
  return gulp.src(src_dir+"js/**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dest_dir+'js/'));
});

gulp.task( 'img', function() {
  return gulp
    .src( src_dir+'images/**/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( dest_dir+'images/' ) );
});

gulp.task('sass', function() {
  return gulp.src( src_dir+'sass/**/*.scss' )
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest( dest_dir+'css' ));
});

// gulp.task('cmq', function () {
//   gulp.src( dest_dir+'css/*.css')
//     .pipe(cmq({
//       log: false
//     }))
//     .pipe(gulp.dest( dest_dir+'css'));
// });

gulp.task( "ejs", function () {
    return gulp.src([ src_dir+"ejs/**/*.ejs", '!' + src_dir+"ejs/**/_*.ejs"])
        .pipe(plumber())
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(rename({ extname: '.html' }))
        .pipe( gulp.dest( dest_dir ) );
});

gulp.task( 'default', gulp.series( 'browser-sync' , function() {
  gulp.watch( [ src_dir+"ejs/**/*.ejs" ], gulp.series( 'ejs' , 'bs-reload' ) );
  gulp.watch( [ src_dir+'sass/**/*.scss' ], gulp.series( 'sass' , 'bs-reload' ) );
  gulp.watch( [ src_dir+"js/**/*.js" ], gulp.series( 'minjs' , 'bs-reload' ) );

} ));
