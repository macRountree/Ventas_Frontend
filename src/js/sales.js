// Load
import { fetchApi } from "./common/fetch.js";

const result = await fetchApi.getAll('/api/sales/');
console.log(result);
const endpointSales = '/api/sales/';
const endpointGames = '/api/catalogs'
getNames(result);
// buttons
const applyFilter = document.getElementById('apply-filters');
applyFilter.addEventListener('click',async e => {
    e.preventDefault();
    const date = document.getElementById('date-filter').value;
    let endpoint = '/api/sales/'
    
    if (date!=='') {
        let dateFilter=`fecha=${date}`;
        let data = await fetchApi.getAll(`${endpointSales}?${dateFilter}`);
        console.log(data);
    }
});

// funciones

function getNames(sales){
    let newSalesArray = [];
    newSalesArray = sales.map(sale => {
        let game = fetchApi.getById(`${endpointGames}/${sale.idProducto}`);
        console.log(sale,game);
        delete sale.idProducto;
        return {name:game.name,...sale};
    });
    console.log(newSalesArray);
}


// inyeccion