const uri = 'https://perfect-pig-fashion.cyclic.app';

export const fetchApi = {
    getAll:async(url)=>{
        return await fetch(uri+url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(data => data.data).catch(error => console.log(error));
    }
}