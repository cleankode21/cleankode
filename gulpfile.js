const {src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const notify = require('gulp-notify'); 
const cache = require('gulp-cache');
const { phantom } = require('is');

const paths = {
    scss: 'src/scss/**/*.scss',
    imagenes: 'src/img/**/*'
}

function css(){
    return src(paths.scss)
    .pipe(sass())
    .pipe(dest('./desarrollo/css'));
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(dest('desarrollo/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('desarrollo/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}


function watchArchivos() {
    watch( paths.scss, css );
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}

exports.default = parallel(css,  watchArchivos ); 