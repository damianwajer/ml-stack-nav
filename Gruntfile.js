module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json'),
        globalConfig = {
            pkg: pkg,
            getBanner: function (raw) {
                var prefix = raw ? '' : '/*!\n',
                    newLinePrefix = raw ? '' : ' * ',
                    suffix = raw ? '' : '\n */';

                return prefix +
                    newLinePrefix + pkg.name + ' - v' + pkg.version + '\n' +
                    newLinePrefix + pkg.description + '\n' +
                    newLinePrefix + pkg.homepage + '\n' +
                    newLinePrefix + '\n' +
                    newLinePrefix + 'Author: ' + pkg.author + '\n' +
                    newLinePrefix + 'License: ' + pkg.license + '\n' +
                    newLinePrefix + '\n' +
                    newLinePrefix + '@preserve' +
                    suffix;
            }
        };

    grunt.initConfig({
        pkg: pkg,
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        concat: {
            options: {
                banner: globalConfig.getBanner() + "\n",
                sourceMap: true
            },
            dist: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: globalConfig.getBanner(),
                sourceMap: true
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.scss'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**/*.css', '!**/*.min.css'],
                        dest: 'dist',
                        ext: '.min.css'
                    }
                ]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('postcss-banner')({
                        banner: globalConfig.getBanner(true),
                        important: true
                    }),
                    require('autoprefixer')({
                        remove: false
                    })
                ]
            },
            dist: {
                src: 'dist/*.css'
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    'dist/**/*.css',
                    'dist/**/*.js',
                    'index.html'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        watch: {
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            sass: {
                files: ['src/**/*.scss'],
                tasks: ['sass', 'postcss', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'postcss', 'cssmin', 'browserSync', 'watch']);

};
