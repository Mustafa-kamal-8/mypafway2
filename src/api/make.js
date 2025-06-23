import Api from "@/src/services/Api";

export async function getMake({ search }) {
  const response = await Api.get("/brand", {
    search: search,
  });

  console.log("response is", response);
  return response;
}

export async function getModel({ search }) {
  const response = await Api.get("/brand", {
    search: search,
  });

  console.log("response is", response);
  return response;
}

export async function uploadMake(body) {
  console.log("here??");
  const response = await Api.post("/brand", {
    body,
  });
  console.log(response);
  return response;
}

export async function uploadModel(body) {
  console.log("here??");
  const response = await Api.post("/brand", {
    body,
  });
  console.log(response);
  return response;
}
