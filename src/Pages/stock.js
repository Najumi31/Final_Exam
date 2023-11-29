import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stock = ({ products, updateStock }) => {
  const [productId, setProductId] = useState('');
  const [newStock, setNewStock] = useState('');

  // Function to find the current stock of the selected product
  const getCurrentStock = () => {
    const selectedProduct = products.find((product) => product.id === productId);
    return selectedProduct ? selectedProduct.stock : 0;
  };

  const handleUpdateStock = () => {
    if (productId && newStock) {
      const currentStock = getCurrentStock();
      const totalStock = currentStock + parseFloat(newStock);
      updateStock(productId, totalStock);
      setProductId('');
      setNewStock('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stock Management</h2>
      <div className="mb-3">
        <label htmlFor="productId" className="form-label">
          Product:
        </label>
        <select
          id="productId"
          className="form-select"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {/* Display current stock */}
        <p className="mt-2">Current Stock: {getCurrentStock()}</p>

        <label htmlFor="newStock" className="form-label">
          Add Stock:
        </label>
        <input
          type="number"
          id="newStock"
          className="form-control"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Add Stock"
        />

        <button className="btn btn-primary mt-3" onClick={handleUpdateStock}>
          Add Stock
        </button>
      </div>
    </div>
  );
};

export default Stock;



