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

  const loadData = async () => {
    try {
      const [stockRes, productRes] = await Promise.all([getStocks(), getProducts()]);
      setStocks(stockRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.error(error);
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
    if (!window.confirm("Delete this stock record?")) return;
    await deleteStock(id);
    loadData();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Navbar title="Stocks" />
        <div className="card mb-4">
          <div className="card-body">
            <h5>{selectedStock ? "Update Stock" : "Add Stock"}</h5>
            <form onSubmit={save} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product</label>
                <select className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)}>
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.productId} value={product.productId}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Quantity Available</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantityAvailable}
                  onChange={(e) => setQuantityAvailable(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Minimum Level</label>
                <input
                  type="number"
                  className="form-control"
                  value={minimumLevel}
                  onChange={(e) => setMinimumLevel(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Warehouse Location</label>
                <input
                  className="form-control"
                  value={warehouseLocation}
                  onChange={(e) => setWarehouseLocation(e.target.value)}
                />
              </div>
              <div className="col-12 d-flex gap-2">
                <button className="btn btn-success" type="submit">
                  {selectedStock ? "Update" : "Add"}
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
            <h5>Stock Records</h5>
            <div className="table-responsive">
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Minimum Level</th>
                    <th>Location</th>
                    <th>Alert</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.stockId}>
                      <td>{stock.stockId}</td>
                      <td>{stock.product?.productName}</td>
                      <td>{stock.quantityAvailable}</td>
                      <td>{stock.minimumLevel}</td>
                      <td>{stock.warehouseLocation}</td>
                      <td>
                        {stock.quantityAvailable <= stock.minimumLevel ? (
                          <span className="text-danger">⚠ Low Stock</span>
                        ) : (
                          <span className="text-success">OK</span>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => edit(stock)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(stock.stockId)}>
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

export default Stocks;
