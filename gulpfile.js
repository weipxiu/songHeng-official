let gulp = require('gulp');
let minifycss = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let sass = require('gulp-sass');
let clean = require('gulp-clean');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let htmlmin = require('gulp-htmlmin');
let gutil = require('gulp-util');
// let imagemin = require('gulp-imagemin');
// replace = require('gulp-replace')

let srcStaticPath = 'src';
let distStaticPath = 'dist';
let browserSync = require('browser-sync');
let baseJsArr = [
  'jquery.min.js',
  'swiper.min.js',
  'swiper.animate.min.js',
  'data.js'
];
let baseCssArr = [
  'animate.scss',
  'header.scss',
  'footer.scss',
  'common.scss',
  'swiper.scss'
];

// 删除dist文件夹以及其内容
gulp.task('clean', function() {
  return gulp.src('dist').pipe(clean());
});

// html复制
gulp.task('html', function() {
  return gulp.src(['src/*.html']).pipe(gulp.dest('dist'));
});

// swf复制
gulp.task('swf', function() {
  return gulp
    .src(srcStaticPath + '/js/common/*.swf')
    .pipe(gulp.dest(distStaticPath + '/js/common'));
});

// 字体复制
gulp.task('font', function() {
  return gulp
    .src(srcStaticPath + '/font/**')
    .pipe(gulp.dest(distStaticPath + '/font'));
});

// 图片复制
gulp.task('img', function() {
  return (
    gulp
      .src(srcStaticPath + '/img/**/*')
      // .pipe(imagemin())
      .pipe(gulp.dest(distStaticPath + '/img'))
  );
});

// 插件复制
gulp.task('plugin', function(cb) {
  gulp
    .src(srcStaticPath + '/js/plugin/**/*')
    .pipe(gulp.dest(distStaticPath + '/js/plugin'));
  cb();
});

// 页面scss的处理
gulp.task('pageCss', function(cb) {
  // scss转成css压缩
  gulp
    .src(srcStaticPath + '/css/page/*.scss')
    .pipe(sass())
    .pipe(minifycss())
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false,
        remove: true
      })
    )
    .pipe(
      rename(function(path) {
        path.basename = path.basename + '.min';
      })
    )
    .pipe(gulp.dest(distStaticPath + '/css/page'));

  cb();
});

// 公共样式处理
gulp.task('commonCss', function(cb) {
  gulp
    .src(srcStaticPath + '/css/common/*.scss')
    .pipe(sass())
    .pipe(minifycss())
    .pipe(concat('base.css'))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false,
        remove: true
      })
    )
    .pipe(
      rename(function(path) {
        path.basename = path.basename + '.min';
      })
    )
    .pipe(gulp.dest(distStaticPath + '/css/common'));
  cb();
});

// 公共js处理
gulp.task('commonJs', function(cb) {
  let arr = [];
  for (let i = 0; i < baseJsArr.length; i++) {
    arr.push(srcStaticPath + '/js/common/' + baseJsArr[i]);
  }
  gulp
    .src(arr)
    .pipe(concat('base.js'))
    .pipe(
      rename(function(path) {
        path.basename = path.basename + '.min';
      })
    )
    .pipe(gulp.dest(distStaticPath + '/js/common'));
  cb();
});

// 页面js处理
gulp.task('pageJs', function(cb) {
  // （每个页面对应一个js文件）
  gulp
    .src([srcStaticPath + '/js/page/*.js'])
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(
      rename(function(path) {
        path.basename = path.basename + '.min';
      })
    )
    .pipe(gulp.dest(distStaticPath + '/js/page'));
  cb();
});

// 生产环境
gulp.task('pro', ['clean'], function() {
  gulp.start(
    [
      'img',
      'pageJs',
      'commonJs',
      'commonCss',
      'pageCss',
      'html',
      'swf',
      'font',
      'plugin'
    ],
    function() {
      console.log('编译打包完成!');
      gulp.start('minhtml', function() {
        console.log('html压缩完成！');
      });
    }
  );
});

gulp.task('minhtml', function() {
  let htmlSrc = ['./dist/*.html'],
    htmlDst = './dist/';
  let options = {
    removeComments: true, // 清除HTML注释
    collapseWhitespace: true, // 压缩HTML
    collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
    minifyJS: true, // 压缩页面JS
    minifyCSS: true // 压缩页面CSS
  };
  gulp
    .src(htmlSrc)
    .pipe(htmlmin(options))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(htmlDst));
});

// 开发环境
gulp.task('dev', function() {
  function scssSolve(pathname) {
    let sass = require('node-sass');
    let str = '';
    if (pathname.match(/css\/common/)) {
      let files = baseCssArr;
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])
        str += sass
          .renderSync({
            file: 'src/css/common/' + files[i]
          })
          .css.toString();
      }
      return str;
    } else if (pathname.match(/css\/page/)) {
      let path =
        'src' + pathname.replace(/\.min/, '').replace(/\.css/, '.scss');
      str = sass
        .renderSync({
          file: path
        })
        .css.toString();
      return str;
    } else {
      console.log('无需处理文件：', pathname);
      // console.log('不符合预期')
    }
  }

  function jsSolve(pathname) {
    let str = '';
    let path = '';
    if (pathname.match(/js\/common/)) {
      let files = baseJsArr;
      for (let i = 0; i < files.length; i++) {
        path = 'src/js/common/' + files[i];
        str += require('fs')
          .readFileSync(path)
          .toString();
      }
      return str;
    } else if (pathname.match(/js\/page/)) {
      path = 'src' + pathname.replace(/\.min/, '');
      str = require('fs')
        .readFileSync(path)
        .toString();
      return str;
    } else {
      console.log('无需处理文件：', pathname);
    }
  }

  browserSync.init({
    server: {
      baseDir: './src'
    },
    middleware: function(req, res, next) {
      let str = '';
      let pathname = require('url').parse(req.url).pathname;
      if (pathname.match(/\.css/)) {
        str = scssSolve(pathname);
        if (str) {
          res.end(str);
        }
      }
      if (pathname.match(/\.js/)) {
        str = jsSolve(pathname);
        if (str) {
          res.end(str);
        }
      }
      next();
    }
  });

  gulp.watch('src/*.html').on('change', function() {
    browserSync.reload('*.html');
  });
  gulp.watch(srcStaticPath + '/css/**/*.scss').on('change', function() {
    browserSync.reload('*.css');
  });
  gulp.watch(srcStaticPath + '/js/**/*.js').on('change', function() {
    browserSync.reload('*.js');
  });
  browserSync.reload();
});
