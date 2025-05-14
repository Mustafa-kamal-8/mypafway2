import Api from "@/src/services/Api"

export async function uploadCategories(body) {
    console.log("here??")
    const response = await Api.post("/categories", {
        body,
    })
    console.log(response)
    return response
}


export async function getCategories({ search }) {
    const response = await Api.get("/categories", {
        search: search,
    })

console.log("response is",response)
    return response
}

export async function getCategoriesP({ search,page }) {
    const response = await Api.get("/categories", {
        search: search,
        page:page
    })

console.log("response is",response)
    return response
}


export async function uploadSubCategories(body) {
    console.log("here??")
    const response = await Api.post("/categories", {
        body,
    })
    console.log(response)
    return response
}

export async function getSubCategories({ search }) {
    const response = await Api.get("/categories", {
        search: search,
    })

console.log("response is",response)
    return response
}