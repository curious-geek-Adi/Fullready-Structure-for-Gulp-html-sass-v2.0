// const gulp = require("gulp");
import gulp from "gulp";
// var sourcemaps = require("gulp-sourcemaps");
import sourcemaps from "gulp-sourcemaps"
// var concat = require("gulp-concat");
import concat from "gulp-concat"

// var minify = require("gulp-minify");
import minify  from "gulp-minify";

//var cleanCss = require("gulp-clean-css");
import cleanCss from "gulp-clean-css"

//var htmlmin = require('gulp-htmlmin');
// import htmlmin from "htmlmin"

// var imagemin = require('gulp-imagemin');
import imagemin from "gulp-imagemin"

// var htmlmin = require('gulp-htmlmin');
// import htmlmin from "gulp-htmlmin";

//var htmlmin=require("gulp-html-minifier")
import htmlmin from 'gulp-html-minifier';

//var cache=require("cache")
import cache from "gulp-cache"

//var  dartSass = require("sass");
//import dartSass from "sass"
// var gulpSass=require("gulp-sass");
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );

// Development Tasks
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss") // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css")); // Outputs it in the css folder
});



// Gulp task to minify CSS files
gulp.task("minifycss", function () {
  return (
    gulp
      .src(["src/css/style.css"])
      // Compile SASS files
      .pipe(
        sass({
          precision: 10,
          includePaths: ["."],
          onError: console.error.bind(console, "Sass error:"),
        })
      )
      .pipe(concat("bundle.min.css"))

      .pipe(cleanCss())
      // Output to src folder css
      // .pipe(gulp.dest("src/css"))

      //output to dist folder
      .pipe(gulp.dest("./dist/css"))
  );
});

// Gulp task to minify JavaScript files
gulp.task("minifyjs", function () {
  return (
    gulp
      .src(["src/js/**/*.js"])
      // Minify the file
      .pipe(concat("bundle.min.js"))
      .pipe(
        minify({
          ext: {
            min: ".js",
          },
          noSource: true,
        })
      )
      // Output to inside src js
      // .pipe(gulp.dest("src/js"))

      //output to dist 
      .pipe(gulp.dest("./dist/js"))
  );
});

// Gulp task to minify HTML files
gulp.task("minify-html", function() {
  gulp.src('./**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, ignorePath: '/assets' , removeComments: true}))
    .pipe(gulp.dest('./dist/'))
})

// Gulp task to minify Images files
  gulp.task("minifyimages", function(){
    return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
    //option 1 to optimise image
    // .pipe(imagemin())

    //option2 for optimizing image
    // .pipe(imagemin({
    //   // Setting interlaced to true
    //   interlaced: true
    // }))

    //option3 for optimizing image Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))

    .pipe(gulp.dest('./dist/images'))
  });

// Watchers to scss and generate minified file in dist folder for all files
gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass","minifycss","minifyjs","minifyimages","minify-html"));
});


//watchers to scss 
// gulp.task("watch", function () {
//   gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
// });