const uri = 'https://perfect-pig-fashion.cyclic.app';

export const fetchApi = {
    getAll:async(url)=>{
        return await fetch(uri+url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(data => data.data).catch(error => console.log(error));
    },
    createMany:async(url,products)=>{
        return await fetch(uri+url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({arrays:products})
        }).then(res=>res.json()).catch(error => console.log(error));
    },
    delete: async(url,id)=>{
        return await fetch(uri+url,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).catch(error => console.log(error));
    }
}