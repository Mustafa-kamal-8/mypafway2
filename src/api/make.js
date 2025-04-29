import Api from "@/src/services/Api"

export async function getMake({ search }) {
    const response = await Api.get("/make", {
        search: search,
    })

console.log("response is",response)
    return response
}
