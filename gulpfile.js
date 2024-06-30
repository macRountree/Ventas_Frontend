//Contenedor de Tareas  NO ES FRAMEWORK gulp es un automatizador de tareas (functions)

//CSS
const {src, dest, watch, parallel} = require('gulp'); //extrae la funcionalidad de gulp dentro de node modules
const sass = require('gulp-sass')(require('sass')); //busca la dependencia sass y gulp-sass para que pueda compilar mi css
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done) {
  src('src/scss/**/*.scss') //una vez identifica el source ejecuta el pipe.. se puede jecutar en cadena
    .pipe(plumber())
    .pipe(sass()) //Compilamos
    .pipe(dest('assets/css')); // Destination en assets/css

  done();
}

function image(done) {
  const options = {
    optimizationLevel: 3,
  };
  src('src/img/**/*.{png,jpg,svg}')
    .pipe(cache(imagemin()))
    .pipe(dest('assets/img'));
}

function versionWebp(done) {
  //!Convierte imagenes png/jpg en formatow webp (reduce tamaño conservando calidad)

  const options = {
    quality: 50,
  };
  src('src/img/**/*.{png,jpg,svg}')
    .pipe(webp(options)) //busca todas las imagenes con formato png,jpg
    .pipe(dest('assets/img'));

  done();
}

function dev(done) {
  watch('src/scss/**/*.scss', css); //escucha el watch nuestro archivo app.css para quue compile sin recargar

  done();
}
const build = series(css, parallel(image, versionWebp));

exports.css = css;
exports.image = image;
exports.versionWebp = versionWebp;
exports.dev = parallel(image, versionWebp, dev);
exports.build = build;
exports.default = build;

/** Instalar despues de terminar el proyectos
 * Autoprefixer: es para que el css soporte en todos los navegadores
 * cssnano; comprime el css
 * postcss : hace transformaciones por medio de autoprefixer y css nano
 *
 */
