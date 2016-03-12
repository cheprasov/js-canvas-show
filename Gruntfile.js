module.exports = function(grunt) {

    grunt.initConfig({

        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {"presets": ["es2015"]}]
                        //["babelify", {loose: "all"}]
                    ]
                },
                files: {
                    './build/app.js': ['./src/**/*.js']
                }
            }
        },

        "babel": {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "src/",
                    "src": ["**/*.js"],
                    "dest": "build/",
                    "ext": ".js"
                }]
            }
        },

        clean: {
            local: [
                './build/*.js'
            ]
        },

        shell: {
            rmDir: {
                command: 'rm -f -r ./dist/*'
            }
        },

        concat: {
            basic_and_extras: {
                files: {
                    'dist/app.js': ['build/**/*.js']
                }
            }
        },

        copy: {
            base: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'build/app.js',
                dest: './../../git/js-canvas-show/dist/'
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['update'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-shell');

    //grunt.registerTask('update', ['clean', 'browserify', 'concat', 'copy']);
    grunt.registerTask('update', ['clean', 'shell:rmDir', 'browserify', 'copy']);
    grunt.registerTask('default', ['update', 'watch']);

};
