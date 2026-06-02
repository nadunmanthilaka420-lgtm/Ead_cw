import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getProducts, saveProduct, deleteProduct } from "../services/productService";
import { getSuppliers } from "../services/supplierService";

function Products() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [prodRes, suppRes] = await Promise.all([getProducts(), getSuppliers()]);
      setProducts(prodRes.data || []);
      setSuppliers(suppRes.data || []);
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
    setSelectedProduct(null);
    setProductName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setSupplierId("");
  };

  const save = async (event) => {
    event.preventDefault();

    if (!productName) {
      alert("Product name is required");
      return;
    }

    const payload = {
      productId: selectedProduct?.productId,
      productName,
      category: category || "General",
      price: parseFloat(price) || 0,
      description: description || "",
      supplier: supplierId ? { supplierId: parseInt(supplierId, 10) } : null,
    };

    try {
      await saveProduct(payload);
      clearForm();
      loadData();
    } catch (error) {
      console.error(error);
      alert("Error saving product. Please check your data.");
    }
  };

  const edit = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName || "");
    setCategory(product.category || "");
    setPrice(product.price?.toString() || "");
    setDescription(product.description || "");
    setSupplierId(product.supplier?.supplierId?.toString() || "");
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Could not delete product. It might be referenced in stocks or orders.");
    }
  };

  return (
    <div className="d-flex" style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Navbar title="Products Catalog" />

        {/* Form Card */}
        <div className="glass-card p-4 mb-4">
          <h5 className="mb-4 text-white fw-bold">
            {selectedProduct ? "⚙️ Modify Product Entry" : "➕ Register New Product"}
          </h5>
          <form onSubmit={save} className="row g-3">
            <div className="col-md-6 col-lg-4">
              <label className="form-label-custom">Product Name</label>
              <input
                className="form-control-custom"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="E.g., Tesla Model 3 Battery Pack"
                required
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <label className="form-label-custom">Category</label>
              <input
                className="form-control-custom"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="E.g., Batteries, Electronics"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <label className="form-label-custom">Unit Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-control-custom"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <label className="form-label-custom">Assigned Supplier</label>
              <select
                className="form-select-custom"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
              >
                <option value="">No Supplier Assigned</option>
                {suppliers.map((sup) => (
                  <option key={sup.supplierId} value={sup.supplierId}>
                    {sup.supplierName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 col-lg-8">
              <label className="form-label-custom">Product Description</label>
              <input
                className="form-control-custom"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add brief details about the product specification..."
              />
            </div>
            <div className="col-12 d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-success-custom px-4 py-2 rounded-3">
                {selectedProduct ? "Apply Changes" : "Create Product"}
              </button>
              <button type="button" className="btn btn-secondary-custom px-4 py-2 rounded-3" onClick={clearForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Data Table */}
        <div className="glass-card p-4">
          <h5 className="mb-4 text-white fw-bold">📦 Product Inventory Catalog</h5>
          {loading ? (
            <div className="text-center text-muted-custom py-4">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-muted-custom py-4">No products found. Use the form above to add some.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-custom table-hover-custom m-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Supplier</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId}>
                      <td>#{product.productId}</td>
                      <td className="fw-semibold text-white">{product.productName}</td>
                      <td>
                        <span className="badge bg-secondary text-light px-2 py-1 rounded small">
                          {product.category || "General"}
                        </span>
                      </td>
                      <td className="fw-medium">${product.price?.toFixed(2)}</td>
                      <td className="text-muted-custom">
                        {product.supplier?.supplierName || "—"}
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-primary-custom me-2 px-2.5 py-1.5 rounded" onClick={() => edit(product)}>
                          ✏️ Edit
                        </button>
                        <button className="btn btn-sm btn-danger-custom px-2.5 py-1.5 rounded" onClick={() => remove(product.productId)}>
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

export default Products;

