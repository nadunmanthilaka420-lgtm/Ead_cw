import API from "./api";

export const getStocks = () => API.get("/stocks");
export const saveStock = (data) => API.post("/stocks", data);
export const updateStock = (id, data) => API.put(`/stocks/${id}`, data);
export const deleteStock = (id) => API.delete(`/stocks/${id}`);
