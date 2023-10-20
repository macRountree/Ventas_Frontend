// Load
import { fetchApi } from './common/fetch.js';
const endpointSales = '/api/sales/';
const endpointGames = '/api/catalogs';

const result = await fetchApi.getAll('/api/sales/');
const data = await getNames(result);
console.log(data);
//getNames(result);
// buttons
const applyFilter = document.getElementById('apply-filters');
applyFilter.addEventListener('click', async e => {
  e.preventDefault();
  const date = document.getElementById('date-filter').value;

  if (date !== '') {
    let dateFilter = `fecha=${date}`;
    let result = await fetchApi.getAll(`${endpointSales}?${dateFilter}`);
    let data = await getNames(result);
    console.log(data);
  }
});

// funciones

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
//console.log(await getNames(result));
// inyeccion

async function inyectProduct(productos) {
  const tbody = document.querySelector('#data-table-body');

  productos.forEach(producto => {
    const { id, name, cantidad, fecha, precio, image } = producto;
    console.log(
      ` Venta: ${id} ${name} ${precio} ${cantidad} ${fecha} ${image}`
    );

    //img
    let imgTabla = document.createElement('img');
    imgTabla.setAttribute('src', `../../assets/img/${image}`);
    imgTabla.setAttribute('alt', 'cover_01 webp');
    tbody.appendChild(imgTabla);

    //No.venta
    const idTable = document.createElement('td');
    idTable.innerText = id;
    tbody.appendChild(idTable);

    const titleTable = document.createElement('td');
    titleTable.innerText = name;

    tbody.appendChild(titleTable);
    //cantidad

    const cantTable = document.createElement('td');
    cantTable.innerText = cantidad;
    tbody.appendChild(cantTable);
    //precio
    const precioTab = document.createElement('td');
    precioTab.innerText = precio;
    tbody.appendChild(precioTab);

    //fecha
    const fechaTable = document.createElement('td');
    fechaTable.innerText = fecha;
    fechaTable.appendChild(tbody);
  });
}

inyectProduct(data);
