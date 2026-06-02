import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container text-white p-4 d-flex flex-column" style={{ minWidth: 240, minHeight: "100vh" }}>
      <div className="mb-5 mt-2">
        <h4 className="sidebar-title m-0 fw-bold">NOBLE TESLA</h4>
        <span className="text-muted-custom small tracking-wide">WAREHOUSE V1.0</span>
      </div>
      <div className="nav flex-column gap-1 flex-grow-1">
        <NavLink className="sidebar-nav-link text-decoration-none" to="/dashboard">
          <span className="nav-icon">📊</span> Dashboard
        </NavLink>
        <NavLink className="sidebar-nav-link text-decoration-none" to="/products">
          <span className="nav-icon">📦</span> Products
        </NavLink>
        <NavLink className="sidebar-nav-link text-decoration-none" to="/suppliers">
          <span className="nav-icon">🤝</span> Suppliers
        </NavLink>
        <NavLink className="sidebar-nav-link text-decoration-none" to="/stocks">
          <span className="nav-icon">📈</span> Stocks
        </NavLink>
        <NavLink className="sidebar-nav-link text-decoration-none" to="/orders">
          <span className="nav-icon">🛒</span> Orders
        </NavLink>
      </div>
      <div className="pt-4 border-top border-secondary-subtle text-muted-custom small">
        © 2026 Noble Tesla Inc.
      </div>
    </div>
  );
}

export default Sidebar;

