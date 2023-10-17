const uri = 'https://perfect-pig-fashion.cyclic.app';

export const axiosCommon = {
    getAll:async(axios,url)=>{
        return await axios.get(uri+url,{
            headers:{
                "Content-Type":"application/json"
            }
        });
    }
}