//Contenedor de Tareas  NO ES FRAMEWORK gulp es un automatizador de tareas (functions)

const {src, dest, watch } = require('gulp') //extrae la funcionalidad de gulp dentro de node modules
const sass = require('gulp-sass')(require('sass')); //busca la dependencia sass y gulp-sass para que pueda compilar mi css
const plumber = require('gulp-plumber'); 
function css(done){
     src('src/scss/**/*.scss') //una vez identifica el source ejecuta el pipe.. se puede jecutar en cadena
     .pipe(plumber())
    .pipe(sass()) //Compilamos 
    .pipe(dest('assets/css')) // Destination en assets/css
    

    done();
}

function dev(done){
    watch('src/scss/**/*.scss',css)  //escucha el watch nuestro archivo app.css para quue compile sin recargar

    done();
}

exports.css = css;
exports.dev = dev;