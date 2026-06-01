import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getOrders, saveOrder, updateOrder, deleteOrder } from "../services/orderService";
import { getProducts } from "../services/productService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [totalAmount, setTotalAmount] = useState(0);
  const [productId, setProductId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadData = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([getOrders(), getProducts()]);
      setOrders(orderRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const clearForm = () => {
    setSelectedOrder(null);
    setOrderDate("");
    setStatus("Pending");
    setTotalAmount(0);
    setProductId("");
  };

  const save = async (event) => {
    event.preventDefault();

    if (!productId) {
      alert("Select a product for the order");
      return;
    }

    const data = {
      orderDate: orderDate || new Date().toISOString().split("T")[0],
      status,
      totalAmount: parseFloat(totalAmount) || 0,
      product: { productId: parseInt(productId, 10) },
    };

    try {
      if (selectedOrder) {
        await updateOrder(selectedOrder.orderId, {
          ...selectedOrder,
          ...data,
        });
      } else {
        await saveOrder(data);
      }

      clearForm();
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const edit = (order) => {
    setSelectedOrder(order);
    setOrderDate(order.orderDate || "");
    setStatus(order.status || "Pending");
    setTotalAmount(order.totalAmount || 0);
    setProductId(order.product?.productId || "");
  };

  const changeStatus = async (order, newStatus) => {
    await updateOrder(order.orderId, { ...order, status: newStatus });
    loadData();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteOrder(id);
    loadData();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Navbar title="Orders" />
        <div className="card mb-4">
          <div className="card-body">
            <h5>{selectedOrder ? "Update Order" : "Create Order"}</h5>
            <form onSubmit={save} className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Order Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Total Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Product</label>
                <select className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)}>
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.productId} value={product.productId}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 d-flex gap-2">
                <button className="btn btn-success" type="submit">
                  {selectedOrder ? "Update" : "Save"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5>Order List</h5>
            <div className="table-responsive">
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Product</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.status}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.product?.productName}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => edit(order)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => changeStatus(order, "Approved")}>Approve</button>
                        <button className="btn btn-sm btn-outline-success me-2" onClick={() => changeStatus(order, "Delivered")}>Deliver</button>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(order.orderId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
