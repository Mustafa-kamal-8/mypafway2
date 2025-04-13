import Api from "@/src/services/Api"
// export const registerUser = async (data: any) => {
//     console.log("Submitted Data:", data);

//   };

export async function registerUser(body: any) {
    console.log("here??")
    const response = await Api.post("/users", {
        body,
    })
    console.log(response)
    return response
}

export async function getUser({ search }: { search: any }) {
    const response = await Api.get("/users", {
        search: search,
    })

    return response
}
