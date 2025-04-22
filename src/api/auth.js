import Api from "@/src/services/Api"
// export const registerUser = async (data: any) => {
//     console.log("Submitted Data:", data);

//   };

export async function registerUser(body) {
    console.log("here??")
    const response = await Api.post("/users", {
        body,
    })
    console.log(response)
    return response
}

export async function getUser({ search }) {
    const response = await Api.get("/users", {
        search: search,
    })

    return response
}

export async function loginUser({body}){
    console.log("body signin", body);
    const response = await Api.post("/auth-users",{
        body:{
            email: body.email,
            password: body.password,       
        },
        fields:"id,name,phone,role,image"     
    })
    return response;
}
