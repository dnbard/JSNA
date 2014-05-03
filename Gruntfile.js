module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.initConfig({
        sprite:{
            all: {
            src: ['images/*.png', 'images/*/*.png'],
            destImg: 'sprites/spritesheet.png',
            destCSS: 'sprites/sprites.json',
            cssFormat: 'json'
            }
        },
        connect: {
            server: {
                options: {
                    port: 7999,
                    base: '.',
                    hostname: 'localhost',
                    keepalive: true
                }
            }
        }
    });
    
    
    grunt.registerTask('default', 'sprite');
    grunt.registerTask('server', 'connect');
}