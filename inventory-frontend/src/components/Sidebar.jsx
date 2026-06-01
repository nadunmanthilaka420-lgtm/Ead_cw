import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-4 vh-100" style={{ minWidth: 220 }}>
      <h4 className="mb-4">Inventory</h4>
      <div className="nav flex-column">
        <Link className="text-white mb-2" to="/dashboard">
          Dashboard
        </Link>
        <Link className="text-white mb-2" to="/products">
          Products
        </Link>
        <Link className="text-white mb-2" to="/suppliers">
          Suppliers
        </Link>
        <Link className="text-white mb-2" to="/stocks">
          Stocks
        </Link>
        <Link className="text-white" to="/orders">
          Orders
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
