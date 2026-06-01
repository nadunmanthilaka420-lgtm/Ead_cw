import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getSuppliers, saveSupplier, deleteSupplier } from "../services/supplierService";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const loadSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();
  }, []);

  const clearForm = () => {
    setSelectedSupplier(null);
    setSupplierName("");
    setPhone("");
    setAddress("");
    setEmail("");
  };

  const save = async (event) => {
    event.preventDefault();

    if (!supplierName) {
      alert("Supplier name is required");
      return;
    }

    try {
      await saveSupplier({
        supplierId: selectedSupplier?.supplierId,
        supplierName,
        phone,
        address,
        email,
      });

      clearForm();
      loadSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  const edit = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierName(supplier.supplierName || "");
    setPhone(supplier.phone || "");
    setAddress(supplier.address || "");
    setEmail(supplier.email || "");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;
    await deleteSupplier(id);
    loadSuppliers();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Navbar title="Suppliers" />
        <div className="card mb-4">
          <div className="card-body">
            <h5>{selectedSupplier ? "Update Supplier" : "Add Supplier"}</h5>
            <form onSubmit={save} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Supplier Name</label>
                <input
                  className="form-control"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {selectedSupplier ? "Update" : "Add"}
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
            <h5>Supplier List</h5>
            <div className="table-responsive">
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.supplierId}>
                      <td>{supplier.supplierId}</td>
                      <td>{supplier.supplierName}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.email}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => edit(supplier)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(supplier.supplierId)}>
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

export default Suppliers;
