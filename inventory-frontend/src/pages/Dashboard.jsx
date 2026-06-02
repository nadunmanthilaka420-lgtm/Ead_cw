import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { getProducts } from "../services/productService";
import { getSuppliers } from "../services/supplierService";
import { getOrders } from "../services/orderService";
import { getStocks } from "../services/stockService";

function Dashboard() {
  const [totals, setTotals] = useState({ products: 0, suppliers: 0, orders: 0, lowStockCount: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productRes, supplierRes, orderRes, stockRes] = await Promise.all([
          getProducts(),
          getSuppliers(),
          getOrders(),
          getStocks(),
        ]);

        const stocksList = stockRes.data || [];
        const lowStock = stocksList.filter(
          (item) => item.quantityAvailable <= item.minimumLevel
        );

        setTotals({
          products: productRes.data.length,
          suppliers: supplierRes.data.length,
          orders: orderRes.data.length,
          lowStockCount: lowStock.length,
        });

        // Get last 5 orders
        const sortedOrders = [...orderRes.data]
          .sort((a, b) => b.orderId - a.orderId)
          .slice(0, 5);
        setRecentOrders(sortedOrders);

        // Get low stock items details
        setLowStockItems(lowStock.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="d-flex" style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Navbar title="Dashboard" />

        {loading ? (
          <div className="text-center text-muted-custom py-5">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p>Loading analytics data...</p>
          </div>
        ) : (
          <>
            {/* Top Cards */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-sm-6 col-md-3">
                <DashboardCard title="Total Products" value={totals.products} variant="primary" />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <DashboardCard title="Total Suppliers" value={totals.suppliers} variant="success" />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <DashboardCard title="Total Orders" value={totals.orders} variant="warning" />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <DashboardCard title="Low Stock Items" value={totals.lowStockCount} variant="danger" />
              </div>
            </div>

            {/* Dashboard Widgets */}
            <div className="row g-4">
              {/* Low Stock Watchlist */}
              <div className="col-12 col-lg-6">
                <div className="glass-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="m-0 fw-bold text-white">⚠️ Low Stock Watchlist</h5>
                    <span className="badge bg-danger-custom text-danger px-2.5 py-1.5 rounded-pill small">Action Required</span>
                  </div>
                  {lowStockItems.length === 0 ? (
                    <div className="text-center text-muted-custom py-4">
                      All items are above minimum stock levels!
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {lowStockItems.map((item) => {
                        const percent = Math.min(100, Math.max(0, (item.quantityAvailable / (item.minimumLevel || 1)) * 100));
                        return (
                          <div key={item.stockId} className="list-widget-item">
                            <div className="d-flex justify-content-between mb-1">
                              <span className="fw-semibold text-white">{item.product?.productName}</span>
                              <span className="small text-danger">
                                {item.quantityAvailable} / {item.minimumLevel} units
                              </span>
                            </div>
                            <div className="progress" style={{ height: 6, background: "rgba(255,255,255,0.08)" }}>
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: `${percent}%` }}
                                aria-valuenow={percent}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="text-muted-custom small" style={{ fontSize: "0.75rem" }}>
                              Location: {item.warehouseLocation || "Not specified"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="col-12 col-lg-6">
                <div className="glass-card p-4 h-100">
                  <h5 className="mb-3 fw-bold text-white"> Recent Operations</h5>
                  {recentOrders.length === 0 ? (
                    <div className="text-center text-muted-custom py-4">
                      No recent orders recorded.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-custom table-hover-custom m-0">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.orderId}>
                              <td>#{order.orderId}</td>
                              <td>{order.product?.productName}</td>
                              <td>
                                <span className={`status-badge ${order.status?.toLowerCase() || "pending"}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="fw-bold">${order.totalAmount?.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

