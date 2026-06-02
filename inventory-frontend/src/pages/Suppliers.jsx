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
  const [loading, setLoading] = useState(true);

  const loadSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
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
      alert("Error saving supplier.");
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
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await deleteSupplier(id);
      loadSuppliers();
    } catch (error) {
      console.error(error);
      alert("Could not delete supplier. They might be referenced in products catalog.");
    }
  };

  return (
    <div className="d-flex" style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Navbar title="Suppliers Directory" />

        {/* Form Card */}
        <div className="glass-card p-4 mb-4">
          <h5 className="mb-4 text-white fw-bold">
            {selectedSupplier ? " Edit Supplier Details" : " Onboard New Supplier"}
          </h5>
          <form onSubmit={save} className="row g-3">
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Supplier Name</label>
              <input
                className="form-control-custom"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="E.g., Global Logistics Corp"
                required
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Phone Number</label>
              <input
                className="form-control-custom"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Email Address</label>
              <input
                type="email"
                className="form-control-custom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vendor@company.com"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Warehouse Address</label>
              <input
                className="form-control-custom"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="E.g., Berlin, Germany"
              />
            </div>
            <div className="col-12 d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-success-custom px-4 py-2 rounded-3">
                {selectedSupplier ? "Update Supplier" : "Register Supplier"}
              </button>
              <button type="button" className="btn btn-secondary-custom px-4 py-2 rounded-3" onClick={clearForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Data Table */}
        <div className="glass-card p-4">
          <h5 className="mb-4 text-white fw-bold"> Registered Supply Partners</h5>
          {loading ? (
            <div className="text-center text-muted-custom py-4">Loading suppliers list...</div>
          ) : suppliers.length === 0 ? (
            <div className="text-center text-muted-custom py-4">No suppliers registered yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-custom table-hover-custom m-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Supplier Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.supplierId}>
                      <td>#{supplier.supplierId}</td>
                      <td className="fw-semibold text-white">{supplier.supplierName}</td>
                      <td>{supplier.phone || "—"}</td>
                      <td>{supplier.email || "—"}</td>
                      <td className="text-muted-custom">{supplier.address || "—"}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-primary-custom me-2 px-2.5 py-1.5 rounded" onClick={() => edit(supplier)}>
                           Edit
                        </button>
                        <button className="btn btn-sm btn-danger-custom px-2.5 py-1.5 rounded" onClick={() => remove(supplier.supplierId)}>
                           Delete
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

export default Suppliers;

