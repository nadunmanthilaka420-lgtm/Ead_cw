import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>{title}</h2>
      <button className="btn btn-outline-secondary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
