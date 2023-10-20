const uri = 'https://6531a6f94d4c2e3f333d330f.mockapi.io';

export const fetchApi = {
    getAll:async(url)=>{
        return await fetch(uri+url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(data => data).catch(error => console.log(error));
    },
    getById:async(url)=>{
        return await fetch(uri+url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(data => data).catch(error => console.log(error));
    },
    create:async(url,products)=>{
        return await fetch(uri+url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(products)
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