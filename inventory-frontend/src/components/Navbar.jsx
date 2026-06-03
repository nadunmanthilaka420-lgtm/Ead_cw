import { useNavigate } from "react-router-dom";

function Navbar({ title, role }) { // <-- Add 'role' to the props
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary-subtle">
        <div>
          <h2 className="fw-bold tracking-tight text-white m-0">{title}</h2>
          <span className="text-muted-custom small">Manage and audit your data</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-md-flex flex-column align-items-end">
            <span className="text-white fw-medium small">Active Operator</span>
            {/* Output the dynamic role here, with a fallback */}
            <span className="text-muted-custom small" style={{ fontSize: "0.75rem" }}>
            {role || "Guest"}
          </span>
          </div>
          <button className="btn btn-secondary-custom btn-sm px-3 py-2 rounded-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
  );
}

export default Navbar; 