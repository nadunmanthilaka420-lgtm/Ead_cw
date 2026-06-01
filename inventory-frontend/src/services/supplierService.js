import API from "./api";

export const getSuppliers = () => API.get("/suppliers");
export const saveSupplier = (data) => API.post("/suppliers", data);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}`);
