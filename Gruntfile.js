// require('time-grunt')(grunt);
// grunt-timer 返回各个task的执行时间
var timer = require("grunt-timer");
module.exports = function(grunt) {

  // grunt-timer 初始化
  timer.init(grunt);

  // 工作目录path
  var paths = {
    htmlDist: "../_html/",
    sassDev: "scss/",
    cssDist: "../css/",
    imagesDev: "images/",
    imagesDist: "../images/"
  };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // clean
    clean: {
      scss: [".sass-cache"]
    },
    // sumushit
    smushit: {
      mygroup: {
        src: paths.imagesDev,
        dest: paths.imagesDist
      }
    },

    sass: { 
      dist: {
        option:{
          style: 'expanded', // nested || expanded || compact || 
          sourcemap : true 
        },
        // files :{
        //   '../css/index.css': 'scss/index.scss'
        // }
        files: [{
          expand: true,
          cwd: paths.sassDev,
          src: [ '*.scss'],
          dest: paths.cssDist,
          ext: '.css'
        }]
      },
      build: {
        option:{
          style: 'compressed',
        },
        files: [{
          expand: true,
          cwd: paths.sassDev,
          src: [ '*.scss'],
          dest: paths.cssDist,
          ext: '.css'
        }]
      }
    },
    // 自动合并生成雪碧图
        sprite: {
            sprite: {
                files: [
                    {
                        expand: true, // 启用动态扩展
                        cwd: 'sprite/css', // CSS 文件源的文件夹
                        src: ['*.css'], // 匹配规则
                        dest: 'sprite/dist', // 导出 CSS 和雪碧图的路径地址
                        ext: '.sprite.css' // 导出的 CSS 名
                    }
                ],
                // options
                options: {
                    // 选择图片处理引擎: auto, canvas, gm
                    'engine': 'gm',
                    // 设置雪碧图合并算法，如：二叉树算法(top-down, left-right, diagonal, alt-diagonal)
                    'algorithm': 'binary-tree',
                    // 默认给雪碧图追加时间戳，如：background-image:url(../sprite/style@2x.png?20140304100328);
                    'imagestamp':true,
                    // 默认给样式文件追加时间戳，如：.TmTStamp{content:"20140304100328"}
                    'cssstamp':true,
                    // 每次编译生成新文件名，如：style-20140304102859.png
                    'newsprite':false
                }

            }
        },
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms'); //'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },
      css: {
        files: [paths.sassDev + "*.scss", paths.cssDist],
        tasks: ['sass:dist'],
        options: {
          livereload: true
        }
      },
      livereload: {
        files: paths.htmlDist + "*.html",
        options: {
          livereload: true
        }
      }
    }
    //compass
    // compass: { // Task
    //   dist: { // Target
    //     options: { // Target options
    //       sassDir: paths.sassDev,
    //       cssDir:paths.cssDist,
    //       environment: 'production' // no min : 'development'
    //        // outputStyle: compact ,
    //     }
    //   }
    // },
    // open : {
    //    dev : {
    //      path: paths.htmlDist,
    //      app: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    //    }
    // file : {
    //   path : "";
    // },
    // custom: {
    //   path : function () {
    //     return grunt.option('path');
    //   }
    // }
    // }
  });

  // load plugin
  // grunt.loadNpmTasks('grunt-sprite');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-sprite');
  grunt.loadNpmTasks('grunt-2x2x');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('grunt-spritesmith');
  // grunt.loadNpmTasks('grunt-concurrent');  //多任务
  //register Task
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sass:build', 'smushit', 'clean']);
  grunt.registerTask('sprite', ['sprite']);
};