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
