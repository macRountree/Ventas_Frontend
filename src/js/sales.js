// Load

import { fetchApi } from "./common/fetch.js";

const result = await fetchApi.getAll('/api/sales/');
console.log(result);

//