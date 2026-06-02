import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getStocks, saveStock, updateStock, deleteStock } from "../services/stockService";
import { getProducts } from "../services/productService";

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [minimumLevel, setMinimumLevel] = useState(0);
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [stockRes, productRes] = await Promise.all([getStocks(), getProducts()]);
      setStocks(stockRes.data || []);
      setProducts(productRes.data || []);
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
    setSelectedStock(null);
    setProductId("");
    setQuantityAvailable(0);
    setMinimumLevel(0);
    setWarehouseLocation("");
  };

  const save = async (event) => {
    event.preventDefault();

    if (!productId) {
      alert("Select a product for stock entry");
      return;
    }

    const data = {
      stockId: selectedStock?.stockId,
      quantityAvailable: parseInt(quantityAvailable, 10),
      minimumLevel: parseInt(minimumLevel, 10),
      warehouseLocation,
      product: { productId: parseInt(productId, 10) },
    };

    try {
      if (selectedStock) {
        await updateStock(selectedStock.stockId, data);
      } else {
        await saveStock(data);
      }
      clearForm();
      loadData();
    } catch (error) {
      console.error(error);
      alert("Error saving stock entry.");
    }
  };

  const edit = (stock) => {
    setSelectedStock(stock);
    setProductId(stock.product?.productId ?? "");
    setQuantityAvailable(stock.quantityAvailable ?? 0);
    setMinimumLevel(stock.minimumLevel ?? 0);
    setWarehouseLocation(stock.warehouseLocation || "");
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this stock entry?")) return;
    try {
      await deleteStock(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Error deleting stock entry.");
    }
  };

  return (
    <div className="d-flex" style={{ background: "var(--bg-gradient)", minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Navbar title="Inventory Stock Levels" />

        {/* Form Card */}
        <div className="glass-card p-4 mb-4">
          <h5 className="mb-4 text-white fw-bold">
            {selectedStock ? "⚙️ Edit Stock Entry" : "➕ Register Stock Balance"}
          </h5>
          <form onSubmit={save} className="row g-3">
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Select Product</label>
              <select 
                className="form-select-custom" 
                value={productId} 
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                <option value="">Choose item...</option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Quantity Available</label>
              <input
                type="number"
                min="0"
                className="form-control-custom"
                value={quantityAvailable}
                onChange={(e) => setQuantityAvailable(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Minimum Level Alert threshold</label>
              <input
                type="number"
                min="0"
                className="form-control-custom"
                value={minimumLevel}
                onChange={(e) => setMinimumLevel(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <label className="form-label-custom">Warehouse Zone/Location</label>
              <input
                className="form-control-custom"
                value={warehouseLocation}
                onChange={(e) => setWarehouseLocation(e.target.value)}
                placeholder="E.g., Aisle 4, Shelf B"
              />
            </div>
            <div className="col-12 d-flex gap-2 mt-4">
              <button className="btn btn-success-custom px-4 py-2 rounded-3" type="submit">
                {selectedStock ? "Apply Balance" : "Record Balance"}
              </button>
              <button type="button" className="btn btn-secondary-custom px-4 py-2 rounded-3" onClick={clearForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Data Table */}
        <div className="glass-card p-4">
          <h5 className="mb-4 text-white fw-bold">📈 Stock Quantities & Warnings</h5>
          {loading ? (
            <div className="text-center text-muted-custom py-4">Loading stock logs...</div>
          ) : stocks.length === 0 ? (
            <div className="text-center text-muted-custom py-4">No stock logs found. Set up stock for a product above.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-custom table-hover-custom m-0">
                <thead>
                  <tr>
                    <th>Stock ID</th>
                    <th>Product Item</th>
                    <th>Qty Available</th>
                    <th>Safety Threshold</th>
                    <th>Storage Location</th>
                    <th>Safety Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => {
                    const isLow = stock.quantityAvailable <= stock.minimumLevel;
                    return (
                      <tr key={stock.stockId}>
                        <td>#{stock.stockId}</td>
                        <td className="fw-semibold text-white">{stock.product?.productName || "Unknown Product"}</td>
                        <td className={`fw-bold ${isLow ? "text-danger" : "text-success"}`}>
                          {stock.quantityAvailable} units
                        </td>
                        <td>{stock.minimumLevel} units</td>
                        <td>
                          <span className="badge bg-dark border border-secondary text-secondary px-2 py-1 rounded small">
                            {stock.warehouseLocation || "Unassigned"}
                          </span>
                        </td>
                        <td>
                          <span className={`alert-pill ${isLow ? "danger" : "success"}`}>
                            {isLow ? "⚠️ Low Stock" : "✅ Stock OK"}
                          </span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-primary-custom me-2 px-2.5 py-1.5 rounded" onClick={() => edit(stock)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-sm btn-danger-custom px-2.5 py-1.5 rounded" onClick={() => remove(stock.stockId)}>
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stocks;

