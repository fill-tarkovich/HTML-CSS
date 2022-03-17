"use strict";

import gulp from "gulp";
import plumber from "gulp-plumber";
// const sourcemap = require("gulp-sourcemaps");
import sourcemap from "gulp-sourcemaps";
// const sass = require("gulp-sass")(require("sass"));
import gulpSass from "gulp-sass";
import dartSass from "sass";
const sass = gulpSass(dartSass);
// const postcss = require("gulp-postcss");
import postcss from "gulp-postcss";
// const autoprefixer = require("autoprefixer");
import autoprefixer from "autoprefixer";
// const server = require("browser-sync").create();
import server from "browser-sync";
// .create();
// const csso = require("gulp-csso");
import csso from "gulp-csso";
// const rename = require("gulp-rename");
import rename from "gulp-rename";
// const webp = require("gulp-webp");
import webp from "gulp-webp";
// const posthtml = require("gulp-posthtml");
import posthtml from "gulp-posthtml";
// const include = require("posthtml-include");
import include from "posthtml-include";
// const del = require("del");
import del from "del";
import imagemin from "gulp-imagemin";

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("webp", function () {
  return gulp
    .src("build/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("compress", function () {
  return gulp.src("source/img/*").pipe(imagemin()).pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2, ttf}",
        "source/img/**",
        "source/js/**",
        "source//*.ico",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "compress", "html"));
gulp.task("start", gulp.series("build", "server"));
