import API from "./api";

export const getProducts = () => API.get("/products");
export const saveProduct = (data) => API.post("/products", data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
