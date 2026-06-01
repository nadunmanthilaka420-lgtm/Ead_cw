import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { getProducts } from "../services/productService";
import { getSuppliers } from "../services/supplierService";
import { getOrders } from "../services/orderService";
import { getStocks } from "../services/stockService";

function Dashboard() {
  const [totals, setTotals] = useState({ products: 0, suppliers: 0, orders: 0, lowStock: 0 });

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [productRes, supplierRes, orderRes, stockRes] = await Promise.all([
          getProducts(),
          getSuppliers(),
          getOrders(),
          getStocks(),
        ]);

        const lowStock = stockRes.data.filter(
          (item) => item.quantityAvailable <= item.minimumLevel
        ).length;

        setTotals({
          products: productRes.data.length,
          suppliers: supplierRes.data.length,
          orders: orderRes.data.length,
          lowStock,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadCounts();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Navbar title="Dashboard" />
        <div className="row gy-4">
          <div className="col-md-3">
            <DashboardCard title="Total Products" value={totals.products} variant="primary" />
          </div>
          <div className="col-md-3">
            <DashboardCard title="Total Suppliers" value={totals.suppliers} variant="success" />
          </div>
          <div className="col-md-3">
            <DashboardCard title="Total Orders" value={totals.orders} variant="warning" />
          </div>
          <div className="col-md-3">
            <DashboardCard title="Low Stock Items" value={totals.lowStock} variant="danger" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
