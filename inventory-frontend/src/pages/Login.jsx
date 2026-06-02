import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isRegister) {
        await register({ name, email, password, role });
        setSuccessMsg("Registration successful! Please login.");
        setIsRegister(false);
        // Clear password only
        setPassword("");
      } else {
        const response = await login({ email, password });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role || "ADMIN");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(isRegister ? "Registration failed. Email might already be taken." : "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card p-4 rounded-4 shadow-lg text-white">
        <div className="text-center mb-4">
          <h2 className="fw-bold tracking-tight">NOBLE TESLA</h2>
          <p className="text-muted-custom small">Smart Warehouse & Inventory Management</p>
        </div>

        {/* Tabs */}
        <div className="d-flex justify-content-center gap-3 mb-4 tabs-container">
          <button
            type="button"
            className={`btn-tab ${!isRegister ? "active" : ""}`}
            onClick={() => {
              setIsRegister(false);
              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`btn-tab ${isRegister ? "active" : ""}`}
            onClick={() => {
              setIsRegister(true);
              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="alert alert-danger-custom py-2 px-3 rounded-3 mb-3 small text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success-custom py-2 px-3 rounded-3 mb-3 small text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="mb-3">
                <label className="form-label-custom">Full Name</label>
                <input
                  type="text"
                  className="form-control-custom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label-custom">Role</label>
                <select
                  className="form-select-custom"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="ADMIN">Administrator</option>
                  <option value="MANAGER">Warehouse Manager</option>
                  <option value="STAFF">Inventory Staff</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label-custom">Email Address</label>
            <input
              type="email"
              className="form-control-custom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="noble_tesla@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label-custom">Password</label>
            <input
              type="password"
              className="form-control-custom"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primary-custom w-100 py-2.5 rounded-3 fw-semibold">
            {isRegister ? "Create Account" : "Access System"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

