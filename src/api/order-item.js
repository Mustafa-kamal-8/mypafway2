import Api from "@/src/services/Api";

export async function uploadOrderItems(body) {
  console.log("here??");
  const response = await Api.post("/order-items", {
    body,
  });
  console.log(response);
  return response;
}

export async function uploadConfirmationUser({ search }) {
  const response = await Api.get("/order-items", {
    search: search,
    joins: "userId:users, productId:products, orderId:orders",
  });

  console.log("response is", response);
  return response;
}
