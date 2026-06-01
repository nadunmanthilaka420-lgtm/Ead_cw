import API from "./api";

export const getOrders = () => API.get("/orders");
export const saveOrder = (data) => API.post("/orders", data);
export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
