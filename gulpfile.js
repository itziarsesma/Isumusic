var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// definimos la tarea por defecto
gulp.task("default", ["compile-sass"], function() {
    // arrancar el servidor de desarrollo de browser sync
    browserSync.init({
        server: "./"
    });
    // cuando haya cambios en style.scss, compila sass
    gulp.watch('./src/scss/style.scss', ['compile-sass']);

    // cuando se cambie el HTML recarga el navegador
    gulp.watch('./*.html', function() {
        browserSync.reload(); // recarga navegador
        notify().write("Navegador recargado"); // mostramos la notificación
    });
});

// compilar sass
gulp.task("compile-sass", function() {
    gulp.src('./src/scss/style.scss')    // cargo el style.scss   
    .pipe(sass().on('error', function(error) { // compilamos sass
        return notify().write(error);   // si ocurre un error, mostramos notificacion
    }))  // compilo sass
    .pipe(gulp.dest('./dist/'))      // dejo el resultado en ./dist/
    .pipe(browserSync.stream())     // recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado"));  // Añado una notificacion al finalizar la tarea
});

