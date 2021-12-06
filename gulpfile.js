/**
 * Settings
 * Turn on/off build features
 */

let settings = {
  clean: true,
  scripts: true,
  polyfills: true,
  styles: true,
  views: true,
  copy: true,
  reload: true,
  images: true,
};

/**
 * Paths to project folders
 */

let paths = {
  input: "src/",
  output: "dist/",
  scripts: {
    input: "src/js/*",
    polyfills: ".polyfill.js",
    output: "dist/js/",
  },
  styles: {
    input: "src/css/**/*.{scss,sass}",
    output: "dist/css/",
  },
  images: {
    input: "src/images/**/*.{png,jpg,gif,svg}",
    output: "dist/images/",
  },
  views: {
    input: "views/*",
    output: "dist/views"
  },
  copy: {
    input: "src/copy/**/*",
    output: "dist/",
  },
  reload: "./dist/",
};

/**
 * Template for banner to add to file headers
 */

let banner = {
  main:
    "/*!" +
    " <%= package.name %> v<%= package.version %>" +
    " | (c) " +
    new Date().getFullYear() +
    " <%= package.author.name %>" +
    " | <%= package.license %> License" +
    " | <%= package.repository.url %>" +
    " */\n",
};

/**
 * Gulp Packages
 */

// General
let { src, dest, watch, series, parallel } = require("gulp");
let del = require("del");
let flatmap = require("gulp-flatmap");
let lazypipe = require("lazypipe");
let rename = require("gulp-rename");
let header = require("gulp-header");
let package = require("./package.json");

// pug views
let pug = require('gulp-pug');

// Scripts
let jshint = require("gulp-jshint");
let concat = require("gulp-concat");
let uglify = require("gulp-terser");

// Styles
let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let prefix = require("autoprefixer");
let minify = require("cssnano");

// Images
let imagemin = require("gulp-imagemin");

// BrowserSync
let browserSync = require("browser-sync");

/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
let cleanDist = function (done) {
  // Make sure this feature is activated before running
  if (!settings.clean) return done();

  // Clean the dist folder
  del.sync([paths.output]);

  // Signal completion
  return done();
};

// Repeated JavaScript tasks
let jsTasks = lazypipe()
  .pipe(header, banner.main, { package: package })
  // .pipe(optimizejs)
  .pipe(dest, paths.scripts.output)
  .pipe(rename, { suffix: ".min" })
  .pipe(uglify)
  // .pipe(optimizejs)
  .pipe(header, banner.main, { package: package })
  .pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
let buildScripts = function (done) {
  // Make sure this feature is activated before running
  if (!settings.scripts) return done();

  // Run tasks on script files
  return src(paths.scripts.input).pipe(
    flatmap(function (stream, file) {
      // If the file is a directory
      if (file.isDirectory()) {
        // Setup a suffix variable
        let suffix = "";

        // If separate polyfill files enabled
        if (settings.polyfills) {
          // Update the suffix
          suffix = ".polyfills";

          // Grab files that aren't polyfills, concatenate them, and process them
          src([
            file.path + "/*.js",
            "!" + file.path + "/*" + paths.scripts.polyfills,
          ])
            .pipe(concat(file.relative + ".js"))
            .pipe(jsTasks());
        }

        // Grab all files and concatenate them
        // If separate polyfills enabled, this will have .polyfills in the filename
        src(file.path + "/*.js")
          .pipe(concat(file.relative + suffix + ".js"))
          .pipe(jsTasks());

        return stream;
      }

      // Otherwise, process the file
      return stream.pipe(jsTasks());
    })
  );
};

// Lint scripts
let lintScripts = function (done) {
  // Make sure this feature is activated before running
  if (!settings.scripts) return done();

  // Lint scripts
  return src(paths.scripts.input)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
};

// Process, lint, and minify Sass files
let buildStyles = async function (done) {
  // Make sure this feature is activated before running
  if (!settings.styles) return done();

  // Run tasks on all Sass files
  return src(paths.styles.input)
    .pipe(sass())
    .pipe(dest(paths.styles.output))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(paths.styles.output));
};

let buildPugViews = async function(done){
  if (!settings.views) return (done);

  return src(paths.views.input).pipe(pug({pretty: true})).pipe(dest(paths.views.output));
}

let buildImages = async function (done) {
  // Make sure this feature is activated before running
  if (!settings.images) return done();

  // Optimize PNG/JPG files
  return src(paths.images.input).pipe(imagemin()).pipe(dest(paths.images.output));
};

// Copy static files into output folder
let copyFiles = function (done) {
  // Make sure this feature is activated before running
  if (!settings.copy) return done();

  // Copy static files
  return src(paths.copy.input).pipe(dest(paths.copy.output));
};

// Watch for changes to the src directory
let startServer = function (done) {
  // Make sure this feature is activated before running
  if (!settings.reload) return done();

  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: paths.reload,
    },
  });

  // Signal completion
  done();
};

// Reload the browser when files change
let reloadBrowser = function (done) {
  if (!settings.reload) return done();
  browserSync.reload();
  done();
};

// Watch for changes
let watchSource = function (done) {
  watch(paths.input, series(exports.default, reloadBrowser));
  done();
};

/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
  cleanDist,
  parallel(
    buildScripts,
    lintScripts,
    buildStyles,
    buildImages,
    buildPugViews,
    copyFiles,
  )
);

// Watch and reload
// gulp watch
exports.watch = series(exports.default, startServer, watchSource);
