// Load
import { fetchApi } from './common/fetch.js';
const endpointSales = '/api/sales/';
const endpointGames = '/api/catalogs';

const tbody = document.querySelector('#data-table-body');
const result = await fetchApi.getAll('/api/sales/');
const data = await getNames(result);
console.log(data);

message(result);
// buttons
const applyFilter = document.getElementById('apply-filters');
applyFilter.addEventListener('click', async e => {
  e.preventDefault();
  const date = document.getElementById('date-filter').value;

  if (date !== '') {
    let dateFilter = `fecha=${date}`;
    let result = await fetchApi.getAll(`${endpointSales}?${dateFilter}`);
    let data = await getNames(result);
    inyectProduct(data);
  }
});

tbody.addEventListener('click', eliminarVenta);

// funciones
function message(array) {
  if (array.length !== 0) {
    const divMessage = document.querySelector('#message');
    divMessage.setAttribute('hidden', null);
  }
}
async function getNames(sales) {
  let newSalesArray = [];
  newSalesArray = await Promise.all(
    sales.map(async sale => {
      let game = await fetchApi.getById(`${endpointGames}/${sale.idProducto}`);
      //console.log(sale,game);
      delete sale.idProducto;
      return { name: game.name, image: game.src, ...sale };
    })
  );
  return newSalesArray;
}

async function eliminarVenta(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains('borrar-venta')) {
    const ventaId = e.target.getAttribute('data-id');

    console.log(ventaId);
    await fetchApi.delete(`${endpointSales}${ventaId}`);
    const newSales = await fetchApi.getAll(endpointSales);
    const newData = await getNames(newSales);
    inyectProduct(newData);
    //iteramos sobre el carrito para que cambie su html
  }
}

//console.log(await getNames(result));
// inyeccion

function inyectProduct(productos) {
  tbody.innerHTML = '';
  productos.forEach(producto => {
    const row = document.createElement('tr');
    const { id, name, cantidad, fecha, precio, image } = producto;
    console.log(
      ` Venta: ${id} ${name} ${precio} ${cantidad} ${fecha} ${image}`
    );

    //img
    const imgTd = document.createElement('td');
    let imgTabla = document.createElement('img');
    imgTabla.setAttribute('src', `../../assets/img/${image}`);
    imgTabla.setAttribute('alt', 'cover_01 webp');
    imgTd.appendChild(imgTabla);
    row.appendChild(imgTd);

    //No.venta
    const idTd = document.createElement('td');
    const idTable = document.createElement('p');
    idTable.classList.add('sales__p');
    idTable.innerText = id;
    idTd.appendChild(idTable);
    row.appendChild(idTd);

    // videojuego
    const titleTd = document.createElement('td');
    const titleTable = document.createElement('p');
    titleTable.innerText = name;

    titleTd.appendChild(titleTable);
    row.appendChild(titleTd);
    //cantidad

    const cantTd = document.createElement('td');
    const cantTable = document.createElement('p');
    cantTable.innerText = cantidad;
    cantTd.appendChild(cantTable);
    row.appendChild(cantTd);
    //precio
    const precioTd = document.createElement('td');
    const precioTab = document.createElement('p');
    precioTab.innerText = precio;
    precioTd.appendChild(precioTab);
    row.appendChild(precioTd);

    //fecha
    const fechaTd = document.createElement('td');
    const fechaTable = document.createElement('p');
    fechaTable.innerText = fecha;
    fechaTd.appendChild(fechaTable);
    row.appendChild(fechaTd);

    // boton eliminar venta
    const borrarVentaTd = document.createElement('td');
    const borrarVentaTable = document.createElement('button');
    borrarVentaTable.setAttribute('data-id', id);
    borrarVentaTable.innerText = 'Eliminar';
    borrarVentaTable.classList += 'borrar-venta';

    borrarVentaTd.appendChild(borrarVentaTable);
    row.appendChild(borrarVentaTd);

    // inyect to tbody

    tbody.appendChild(row);
  });
}

inyectProduct(data);
