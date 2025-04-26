import Api from "@/src/services/Api"

export async function uploadCartData(body) {
    console.log("here??")
    const response = await Api.post("/cart", {
        body,
    })
    console.log(response)
    return response
}


export async function getCartData({ search }) {
    const response = await Api.get("/cart", {
        search: search,
         joins:"product:products"
    })

console.log("response is",response)
    return response
}