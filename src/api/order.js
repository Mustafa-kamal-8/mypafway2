import Api from "@/src/services/Api"


export async function uploadOrders(body) {
    console.log("here??")
    const response = await Api.post("/orders", {
        body,
    })
    console.log(response)
    return response
}