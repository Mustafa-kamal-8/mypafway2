import Api from "@/src/services/Api"


export async function contactSubmit(body) {
    console.log("here??")
    const response = await Api.post("/contacts", {
        body,
    })
    console.log(response)
    return response
}