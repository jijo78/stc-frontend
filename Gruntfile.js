module.exports = function(grunt) {
    var path = require('path');

    grunt.initConfig({
        staticPath: path.resolve() + '/app',
        outputPath: path.resolve() + '/public',
        jshint: {
            files: ['Gruntfile.js', 'app/assets/js/*.js'],
            options: {
                esnext: true,
                browser: true,
                curly: true,
                undef: true,
                predef: [ 'alert','define', 'module', 'require', 'it', 'expect', 'describe', 'jasmine', 'console', 'class' ],
                quotmark: true, // Enforce double quotes
                globals: {
                    $: false, //Grunt doesn't know $ is declared in jquery, so keep getting undefined, this line fixes it.
                    Handlebars: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', 'app/assets/sass/*.scss','app/assets/js/*.js' ],
            tasks: ['jshint','sassWatch']
        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: [ {
                    expand: true,
                    cwd: '<%=staticPath%>/assets/sass',
                    src: [ '*.scss' ],
                    dest: '<%=outputPath%>/css',
                    ext: '.css'
                } ]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [ {
                    expand: true,
                    cwd: '<%=staticPath%>/assets/sass',
                    src: [ '*.scss' ],
                    dest: '<%=outputPath%>/css',
                    ext: '.css'
                } ]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%=staticPath%>/assets/js',
                    src: ['**'],
                    dest: '<%=outputPath%>/js',
                }]
            },
            assets: {
                expand: true,
                flatten: true,
                cwd: '<%=staticPath%>/assets/images',
                src: [
                    '**'
                ],
                dest: '<%=outputPath%>/img'
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // grunt
    grunt.registerTask( 'sassWatch', [ 'sass' ] );

    // grunt ci
    grunt.registerTask('default', [ 'sass:dev', 'jshint', 'copy' ]);
    grunt.registerTask('ci', [ 'sass:dist', 'copy']);

};
