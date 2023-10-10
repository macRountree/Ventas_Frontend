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

    let aEnlace = document.createElement('a');
    aEnlace.setAttribute('href', '');

    divProductoContainer.appendChild(aEnlace);

    divProducto.appendChild(divProductoContainer);

    divProductosGrid.appendChild(divProducto);
}

/**
 
<div class="producto">
    <img
    src="./assets/img/cover_01.webp"
    alt="cover_01 webp"
    class="producto__imagen"
    />
    <div class="producto__container">
        <h3 class="producto__nombre">Marvel's Spiderman</h3>
        <div class="producto__plataformas"></div>
        <p class="producto__descripcion">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Assumenda cum labore, sit earum ipsa repellendus? Aperiam, iste
            cumque ad expedita officiis ea, eius veniam harum odio ex pariatur
            deleniti distinctio?
        </p>
        <div class="producto__flex">
            <p class="puntaje">4.7/5</p>
            <img src="./assets/img/estrellas.webp" alt="estrellas_producto" />
        </div>
        <p class="producto__precio">$29.99</p>
        <a href=""></a>
    </div>
</div>


 */