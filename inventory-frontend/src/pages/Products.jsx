import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getProducts, saveProduct, deleteProduct } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const clearForm = () => {
    setSelectedProduct(null);
    setProductName("");
    setCategory("");
    setPrice("");
    setDescription("");
  };

  const save = async (event) => {
    event.preventDefault();

    if (!productName) {
      alert("Product name is required");
      return;
    }

    try {
      await saveProduct({
        productId: selectedProduct?.productId,
        productName,
        category: category || "General",
        price: parseFloat(price) || 0,
        description: description || "",
      });

      clearForm();
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const edit = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName || "");
    setCategory(product.category || "");
    setPrice(product.price?.toString() || "");
    setDescription(product.description || "");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Navbar title="Products" />

        <div className="card mb-4">
          <div className="card-body">
            <h5>{selectedProduct ? "Update Product" : "Add Product"}</h5>
            <form onSubmit={save} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  className="form-control"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {selectedProduct ? "Update" : "Add"}
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
            <h5>Product List</h5>
            <div className="table-responsive">
              <table className="table table-hover mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productId}</td>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => edit(product)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(product.productId)}>
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

export default Products;
