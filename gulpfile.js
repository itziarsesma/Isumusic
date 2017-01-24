var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass'); // importamos sass
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
//var concat = require("gulp-concat");
var browserify = require("browserify");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

//config
var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist/'
}

var jsConfig = {
    concatJsTaskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/'
}

var uglifyConfig = {
    uglifyTaskName: "uglify",
    src: './dist/main.js',
    dest: './dist'
};

// definimos la tarea por defecto
gulp.task("default", [sassConfig.compileSassTaskName], function() {
    // arrancar el servidor de desarrollo de browser sync
    browserSync.init({
        //server: "./"
        proxy: "127.0.0.1:8000" //conectar browsersync con sparrest
    });
    // cuando haya cambios en archivos scss, compila sass
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

    // cuando haya cambios en archivos js los concatena
    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

    // cuando se cambie el HTML recarga el navegador
    gulp.watch('./*.html', function() {
        browserSync.reload(); // recarga navegador
        notify().write("Navegador recargado"); // mostramos la notificación
    });
});

// compilar sass
gulp.task(sassConfig.compileSassTaskName, function() {
    gulp.src(sassConfig.entryPoint)    // cargo el style.scss 
    .pipe(sourcemaps.init()) // empezamos a capturar los sourcemaps  
    .pipe(sass().on('error', function(error) { // compilamos sass
        return notify().write(error);   // si ocurre un error, mostramos notificacion
    }))  // compilo sass
    .pipe(sourcemaps.write('./')) // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(sassConfig.dest))      // dejo el resultado en ./dist/
    .pipe(browserSync.stream())     // recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado"));  // Añado una notificacion al finalizar la tarea
});

// concatena js
gulp.task(jsConfig.concatJsTaskName, function(){
    gulp.src(jsConfig.entryPoint)
    .pipe(tap(function(file){ // para cada archivo seleccionado
        // lo pasamos por browserify para importar los require
        file.contents = browserify(file.path, { debug:true }).bundle().on('error', function(error){
            return notify().write(error); // si ocurre un error javascript, lanza notificación
        });
    }))
    .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
    // .pipe(concat(jsConfig.concatFile))
    .pipe(sourcemaps.init({ loadMaps: true }))    // empezamos a capturar los sourcemaps
    .pipe(sourcemaps.write('./'))   // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(jsConfig.dest))
    .pipe(notify("JS Concatenado"))
    .pipe(browserSync.stream());
});

//minifica
gulp.task(uglifyConfig.uglifyTaskName, ["concat-js"], function() {
    gulp.src(uglifyConfig.src)
    .pipe(uglify())
    .pipe(gulp.dest(uglifyConfig.dest))
    .pipe(notify("JS Minificado"));
});

