import { gamesArray } from "./games.js";

// Código especifico para Catalogo

//============= Variables

gamesArray.forEach(game => {
    inyect(game);
});

// ===============Funciones

function inyect(game) {
    let divProductosGrid = document.getElementById('productos__grid');
    let divProducto = document.createElement('div');
    divProducto.className += 'producto';

    let imgProduct = document.createElement('img');
    imgProduct.className += 'producto__imagen';
    imgProduct.setAttribute('src', `./assets/img/${game.src}`);
    imgProduct.setAttribute('alt', 'cover_01 webp');

    divProducto.appendChild(imgProduct);

    let divProductoContainer = document.createElement('div');
    divProductoContainer.className += 'producto__container';

    let h3ProductoName = document.createElement('h3');
    h3ProductoName.className += 'producto__nombre';
    h3ProductoName.innerText = game.name;

    divProductoContainer.appendChild(h3ProductoName);

    let divProductoPlataformas = document.createElement('div');
    divProductoPlataformas.className += 'producto__plataformas';

    let pProductoDisponible = document.createElement('p');
    pProductoDisponible.className += 'producto__disponible';
    pProductoDisponible.innerHTML='Disponible en';

    divProductoPlataformas.appendChild(pProductoDisponible);

    let divProductoPlataforma = document.createElement('div');
    divProductoPlataforma.className+='producto__plataforma';

    const gamePlatform = Object.values(game.plataforma);

    gamePlatform.forEach(source => {
        let imgPlataforma = document.createElement('img');
        imgPlataforma.className+='producto__logo';
        imgPlataforma.setAttribute('src',source);
        imgPlataforma.setAttribute('alt',`logo PS`);
    
        divProductoPlataforma.appendChild(imgPlataforma);
    });

    divProductoPlataformas.appendChild(divProductoPlataforma);

    divProductoContainer.appendChild(divProductoPlataformas);

    let pProductoDescripcion = document.createElement('p');
    pProductoDescripcion.className += 'producto__descripcion';
    pProductoDescripcion.innerHTML = game.descripcion;

    divProductoContainer.appendChild(pProductoDescripcion);

    let divProductoFlex = document.createElement('div');
    divProductoFlex.className += 'producto__flex';

    let pPuntaje = document.createElement('p');
    pPuntaje.className += 'puntaje';
    pPuntaje.innerHTML = '4.7/5';

    divProductoFlex.appendChild(pPuntaje);

    let imgEstrellas = document.createElement('img');
    imgEstrellas.setAttribute('src', './assets/img/estrellas.webp');
    imgEstrellas.setAttribute('alt', 'estrellas_producto');

    divProductoFlex.appendChild(imgEstrellas);

    divProductoContainer.appendChild(divProductoFlex);

    let pPrecio = document.createElement('p');
    pPrecio.className += 'producto__precio';
    pPrecio.innerHTML = `$${game.precio}`;

    divProductoContainer.appendChild(pPrecio);

    let aAñadirVenta = document.createElement('a');
    aAñadirVenta.className+='producto__btn';
    aAñadirVenta.setAttribute('href', '');
    aAñadirVenta.innerHTML = 'Añadir a Venta';

    divProductoContainer.appendChild(aAñadirVenta);

    divProducto.appendChild(divProductoContainer);

    divProductosGrid.appendChild(divProducto);
}

/**
 



 */