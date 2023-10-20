import { fetchApi } from './common/fetch.js';
// Código especifico para Catalogo
// https://stackoverflow.com/questions/70566856/cors-the-access-control-allow-origin-header-has-a-value-http-localhost300

async function getGames() {
  const data = await fetchApi.getAll('/api/catalogs');
  // console.log(data);
  return data;
}

let gamesArray = await getGames();

//============= Variables
// gamesArray.forEach((game) => {
//   inyect(game);
// });

const filter = document.getElementById('filtro__select');
let filterValue = '';

filter.addEventListener('change', () => {
  filterValue = filter.value;
  filterApp(filterValue);
});

if (localStorage.getItem('filtrado')) {
  const arreglo = JSON.parse(localStorage.getItem('filtrado'));
  arreglo.forEach(game => {
    inyect(game);
  });
} else {
  filterApp();
}

// ===============Funciones

function filterApp(filter) {
  let arregloFiltrado = [];
  if (filter) {
    // console.log(filter);
    let counter = 0;
    gamesArray.forEach(game => {
      const platforms = Object.keys(game.plataforma);
      if (platforms.includes(filter)) {
        // console.log(platforms);
        arregloFiltrado.push(game);
        if (counter === 0) {
          document.getElementsByName('productos__grid')[0].innerHTML = '';
        }
        inyect(game);
        counter++;
      }
    });
    localStorage.setItem('filtrado', JSON.stringify(arregloFiltrado));
  } else {
    gamesArray.forEach(game => {
      inyect(game);
    });
  }
}

function inyect(game) {
  const { src, name, plataforma, precio, descripcion, id } = game;
  let divProductosGrid = document.getElementsByName('productos__grid')[0];
  // console.log(divProductosGrid);
  let divProducto = document.createElement('div');
  divProducto.className += 'producto';

  let imgProduct = document.createElement('img');
  imgProduct.className += 'producto__imagen';
  imgProduct.setAttribute('src', `../../assets/img/${src}`);
  imgProduct.setAttribute('alt', 'cover_01 webp');

  divProducto.appendChild(imgProduct);

  let divProductoContainer = document.createElement('div');
  divProductoContainer.className += 'producto__container';

  let h3ProductoName = document.createElement('h3');
  h3ProductoName.className += 'producto__nombre';
  h3ProductoName.innerText = name;

  divProductoContainer.appendChild(h3ProductoName);

  let divProductoPlataformas = document.createElement('div');
  divProductoPlataformas.className += 'producto__plataformas';

  let pProductoDisponible = document.createElement('p');
  pProductoDisponible.className += 'producto__disponible';
  pProductoDisponible.innerHTML = 'Disponible en';

  divProductoPlataformas.appendChild(pProductoDisponible);

  let divProductoPlataforma = document.createElement('div');
  divProductoPlataforma.className += 'producto__plataforma';

  const gamePlatform = Object.values(plataforma);

  gamePlatform.forEach(source => {
    let imgPlataforma = document.createElement('img');
    imgPlataforma.className += 'producto__logo';
    imgPlataforma.setAttribute('src', source);
    imgPlataforma.setAttribute('alt', `logo PS`);

    divProductoPlataforma.appendChild(imgPlataforma);
  });

  divProductoPlataformas.appendChild(divProductoPlataforma);

  divProductoContainer.appendChild(divProductoPlataformas);

  let pProductoDescripcion = document.createElement('p');
  pProductoDescripcion.className += 'producto__descripcion';
  pProductoDescripcion.innerHTML = descripcion;

  divProductoContainer.appendChild(pProductoDescripcion);

  let divProductoFlex = document.createElement('div');
  divProductoFlex.className += 'producto__flex';

  let pPuntaje = document.createElement('p');
  pPuntaje.className += 'puntaje';
  pPuntaje.innerHTML = '4.7/5';

  divProductoFlex.appendChild(pPuntaje);

  let imgEstrellas = document.createElement('img');
  imgEstrellas.setAttribute('src', '../../assets/img/estrellas.webp');
  imgEstrellas.setAttribute('alt', 'estrellas_producto');

  divProductoFlex.appendChild(imgEstrellas);

  divProductoContainer.appendChild(divProductoFlex);

  let pPrecio = document.createElement('p');
  pPrecio.className += 'producto__precio';
  pPrecio.innerHTML = `$${precio}`;

  divProductoContainer.appendChild(pPrecio);

  let aAñadirVenta = document.createElement('a');
  aAñadirVenta.className += 'producto__btn agregar-carrito ';
  aAñadirVenta.setAttribute('href', '');
  aAñadirVenta.setAttribute('data-id', `${id}`);
  aAñadirVenta.innerHTML = 'Añadir a Carrito';

  divProductoContainer.appendChild(aAñadirVenta);

  divProducto.appendChild(divProductoContainer);

  divProductosGrid.appendChild(divProducto);
}

/**
 



 */
