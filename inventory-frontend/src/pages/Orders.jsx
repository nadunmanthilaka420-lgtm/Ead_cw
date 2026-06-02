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
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([getOrders(), getProducts()]);
      setOrders(orderRes.data || []);
      setProducts(productRes.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  // Automatically default price when product is selected
  const handleProductChange = (id) => {
    setProductId(id);
    if (!id) return;
    const selectedProd = products.find((p) => p.productId === parseInt(id, 10));
    if (selectedProd) {
      setTotalAmount(selectedProd.price || 0);
    }
  };

  const save = async (event) => {
    event.preventDefault();

    if (!productId) {
      alert("Select a product for the order");
      return;
    }

    const data = {
      orderId: selectedOrder?.orderId,
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
      alert("Error saving order. Check your input values.");
    }
  };

  const edit = (order) => {
    setSelectedOrder(order);
    setOrderDate(order.orderDate || "");
    setStatus(order.status || "Pending");
    setTotalAmount(order.totalAmount || 0);
    setProductId(order.product?.productId?.toString() || "");
  };

  const changeStatus = async (order, newStatus) => {
    try {
      await updateOrder(order.orderId, { ...order, status: newStatus });
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Error deleting order.");
    }
  };

  return (
    <div className="d-flex" style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Navbar title="Order Transactions" />

        {/* Form Card */}
        <div className="glass-card p-4 mb-4">
          <h5 className="mb-4 text-white fw-bold">
            {selectedOrder ? "⚙️ Edit Order Details" : "➕ Initiate New Order"}
          </h5>
          <form onSubmit={save} className="row g-3">
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Order Date</label>
              <input
                type="date"
                className="form-control-custom"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Current Status</label>
              <select className="form-select-custom" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Pending</option>
                <option>Approved</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Selected Product Item</label>
              <select className="form-select-custom" value={productId} onChange={(e) => handleProductChange(e.target.value)}>
                <option value="">Choose item...</option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName} (${product.price?.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Total Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control-custom"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
              />
            </div>
            <div className="col-12 d-flex gap-2 mt-4">
              <button className="btn btn-success-custom px-4 py-2 rounded-3" type="submit">
                {selectedOrder ? "Apply Update" : "Confirm Order"}
              </button>
              <button type="button" className="btn btn-secondary-custom px-4 py-2 rounded-3" onClick={clearForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Data Table */}
        <div className="glass-card p-4">
          <h5 className="mb-4 text-white fw-bold">🛒 Sales & Purchase Orders</h5>
          {loading ? (
            <div className="text-center text-muted-custom py-4">Loading order invoices...</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-muted-custom py-4">No order invoices recorded. Create one above.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-custom table-hover-custom m-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Product Description</th>
                    <th>Total Value</th>
                    <th>Safety Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>#{order.orderId}</td>
                      <td>{order.orderDate}</td>
                      <td className="fw-semibold text-white">{order.product?.productName || "Unknown Product"}</td>
                      <td className="fw-bold text-teal">${order.totalAmount?.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${order.status?.toLowerCase() || "pending"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-primary-custom me-2 px-2.5 py-1.5 rounded" onClick={() => edit(order)}>
                          ✏️ Edit
                        </button>
                        {order.status !== "Approved" && order.status !== "Delivered" && (
                          <button className="btn btn-sm btn-outline-warning me-2 px-2.5 py-1.5 rounded small" onClick={() => changeStatus(order, "Approved")}>
                            👍 Approve
                          </button>
                        )}
                        {order.status !== "Delivered" && (
                          <button className="btn btn-sm btn-outline-success me-2 px-2.5 py-1.5 rounded small" onClick={() => changeStatus(order, "Delivered")}>
                            🚚 Deliver
                          </button>
                        )}
                        <button className="btn btn-sm btn-danger-custom px-2.5 py-1.5 rounded" onClick={() => remove(order.orderId)}>
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;

