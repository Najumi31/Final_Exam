import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stock = ({ products, updateStock }) => {
  const [stockUpdates, setStockUpdates] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleUpdateStock = (productId, newStock) => {
    setStockUpdates((prevUpdates) => ({ ...prevUpdates, [productId]: newStock }));
  };

  const applyStockUpdates = () => {
    const updatedProducts = products.map((product) => ({
      ...product,
      stock: product.stock + (stockUpdates[product.id] || 0),
    }));

    updateStock(updatedProducts);
    setStockUpdates({});
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stock Management</h2>

      {/* Category filter */}
      <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(products.map((product) => product.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Current Stock</th>
            <th>Add Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={stockUpdates[product.id] || ''}
                  onChange={(e) => handleUpdateStock(product.id, parseFloat(e.target.value))}
                  placeholder="Add Stock"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to apply stock updates */}
      <button className="btn btn-primary mt-3" onClick={applyStockUpdates}>
        Add Stock
      </button>
    </div>
  );
};

export default Stock;




