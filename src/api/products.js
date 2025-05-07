import Api from "@/src/services/Api"



export async function uploadProducts(body) {
    console.log("Uploading this to backend:", body);
    const response = await Api.post("/products",{
        body
    }); 
    console.log(response);
    return response;
  }

 export async function getProducts({ search }) {
     const response = await Api.get("/products", {
         search: search,
     })
 
 console.log("response is",response)
     return response
 }
 
  