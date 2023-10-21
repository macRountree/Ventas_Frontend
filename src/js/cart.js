import { fetchApi } from './common/fetch.js';

//VARIABLES
//usamos querySelector porq nomas tenemos 1 carrito
//seleccionamos todos los ids que esten dentro del carrito
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCart = document.querySelector('#vaciar-carrito');
const comprarCart = document.querySelector('#comprar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
//utilizamos let porque ira cambiando... tambien ponemos el arreglo vacio proque se ira llenando
let articulosCarrito = [];

cargarEventos();

//Aqui hacemos esta funcion para nuestros eventos del carrito
function cargarEventos() {
  //Cuando damos click en Agregar al carrito, agregarCurso es una funcion que definimos abajo
  listaCursos.addEventListener('click', agregarCurso);

  //Eliminar cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  //vaciar carrito
  vaciarCart.addEventListener('click', () => {
    vaciarCarrito();
  });
}

//Functions

function vaciarCarrito() {
  articulosCarrito = []; // Reseteamos el carrit
  document.getElementById('lista-carrito').setAttribute('hidden', null);
  document.getElementById('empty-cart').removeAttribute('hidden');
  vaciarCart.setAttribute('hidden', null);
  comprarCart.setAttribute('hidden', null);
  limpiarHtml(); //eliminamos html
}

//Lo agregamos a cargarEventos()
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSelec = e.target.parentElement.parentElement;
    // console.log(cursoSelec);
    leerDatos(cursoSelec);
    vaciarCart.removeAttribute('hidden');
    comprarCart.removeAttribute('hidden');
    document.getElementById('empty-cart').setAttribute('hidden', null);
    document.getElementById('lista-carrito').removeAttribute('hidden');
  }
}

//Eliminar datos del curso

function eliminarCurso(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    console.log(articulosCarrito);
    if (articulosCarrito.length === 0) {
      document.getElementById('lista-carrito').setAttribute('hidden', null);
      document.getElementById('empty-cart').removeAttribute('hidden');
      vaciarCart.setAttribute('hidden', null);
      comprarCart.setAttribute('hidden', null);
    }

    carritoHtml(); //iteramos sobre el carrito para que cambie su html
  }
}

//leer el contenido del html y le dimos click y extrae info del curso

function leerDatos(curso) {
  // console.log(curso);

  //creamos un objetos con el contenido del curso actual

  const infoCurso = {
    //EN lugar de usar document usamos curso que estamos usando
    //para leer datos
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h3').textContent,
    precio: curso.querySelector('.producto__precio').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  console.log(infoCurso);

  //Revisar si un elemento ya existe
  //itera en los articulos del carrito agregado y revisa si los id de curso e infocurso
  const exist = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (exist) {
    //Actualizamos la cantidad

    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregamos elementos al arreglo del carrito
    //Utilizamos el spread del carrito vacio para ir copiando
    //los articulos sisguientes
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //   console.log(articulosCarrito);

  //llamamos carrito html
  carritoHtml();
}

//muestra el carrito en el html

function carritoHtml() {
  //Limpiar el html
  limpiarHtml();
  //iteramos arreglos con forEach para cada curso
  articulosCarrito.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src='${/*curso.*/ imagen}' width ='100'  >
    </td>
    <td>
      ${/*curso.*/ titulo}
    </td>
    <td class='text-center'>
      ${/*curso.*/ precio}
    </td>
    <td class='text-center'>
     ${/*curso.*/ cantidad}
    </td>
    <td>
    <a href=# class='borrar-curso' data-id= '${/*curso.*/ id}'> X </a>  
    
    </td>
    `;

    //agrega html del carrito al tbody

    contenedorCarrito.appendChild(row);
  });
}

//eliminar los cursos del tbody
function limpiarHtml() {
  //forma lenta
  // contenedorCarrito.innerHTML = "";

  //mientras haya un padre en contenedor carrio.. se elimina el primer hijo
  //de contenedor carrito
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

//Agregar carrito a las ventas
comprarCart.addEventListener('click', function () {
  comprarCarrito();
});
async function comprarCarrito() {
  const articulos = articulosCarrito.map(articulo => {
    let fecha = new Date().toISOString().substring(0, 10);
    console.log(fecha);
    articulo.precio = `$${+articulo.precio.split('$')[1]*+articulo.cantidad}`;
    let newArticulo = { idProducto: +articulo.id, fecha, ...articulo };
    delete newArticulo.id;
    delete newArticulo.titulo;
    delete newArticulo.imagen;
    return newArticulo;
  });
  console.log(articulos);

  articulos.forEach(async articulo => {
    await fetchApi.create('/api/sales', articulo);
  });

  vaciarCarrito();
}
