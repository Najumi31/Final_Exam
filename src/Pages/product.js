// Product.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ products, categories, addProduct, updateProduct, deleteProduct }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price !== '' && newProduct.stock !== '' && newProduct.category) {
      const newProductWithId = { ...newProduct, id: Date.now().toString() };
      addProduct(newProductWithId);
      setNewProduct({ name: '', price: '', stock: '', category: '' });
    }
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    if (editingProduct && editingProduct.name && editingProduct.price !== '' && editingProduct.stock !== '' && editingProduct.category) {
      updateProduct({ ...editingProduct });
      setEditingProduct(null);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="container text-center p-3 mb-2 bg-dark bg-gradient text-white rounded">
            Product Management
          </h1>
      <br/>
      <div className="row">
        {/* Left Column - Product Inputs and Edit Form */}
        <div className="col-md-6">
          {/* Add Product Form */}
          <div className="mb-4">
            <label htmlFor="productName" className="form-label">Product Name:</label>
            <input
              type="text"
              id="productName"
              className="form-control"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product Name"
              required
            />

            <label htmlFor="productPrice" className="form-label mt-2">Price:</label>
            <input
              type="number"
              id="productPrice"
              className="form-control"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || '' })}
              placeholder="Product Price"
              required
            />

            <label htmlFor="productStock" className="form-label mt-2">Stock:</label>
            <input
              type="number"
              id="productStock"
              className="form-control"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseFloat(e.target.value) || '' })}
              placeholder="Product Stock"
              required
            />

            <label htmlFor="productCategory" className="form-label mt-2">Category:</label>
            <select
              id="productCategory"
              className="form-select"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button onClick={handleAddProduct} className="btn btn-primary mt-3">Add Product</button>
          </div>

          {/* Edit Product Form */}
          {editingProduct && (
            <div className="mb-4">
              <label htmlFor="editProductName" className="form-label">Product Name:</label>
              <input
                type="text"
                id="editProductName"
                className="form-control"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                placeholder="Product Name"
                required
              />

              <label htmlFor="editProductPrice" className="form-label mt-2">Price:</label>
              <input
                type="number"
                id="editProductPrice"
                className="form-control"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || '' })}
                placeholder="Product Price"
                required
              />

              <label htmlFor="editProductStock" className="form-label mt-2">Stock:</label>
              <input
                type="number"
                id="editProductStock"
                className="form-control"
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseFloat(e.target.value) || '' })}
                placeholder="Product Stock"
                required
              />

              <label htmlFor="editProductCategory" className="form-label mt-2">Category:</label>
              <select
                id="editProductCategory"
                className="form-select"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <br/>
              <button onClick={handleUpdateProduct} className="btn btn-success me-2">Update Product</button>
              <button onClick={() => setEditingProduct(null)} className="btn btn-secondary">Cancel</button>
            </div>
          )}
        </div>

        <div className="col-md-6">
          {/* Product List */}
          <h2>Products</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li key={product.id} className="list-group-item">
                <div className="mb-2">
                  <strong>Product ID:</strong> {product.id} <br />
                  <strong>Name:</strong> {product.name} -<strong> Price:</strong> ₱{product.price} -
                  <strong> Stock:</strong> {product.stock} -<strong> Category:</strong> {product.category}
                </div>
                <button onClick={() => startEditing(product)} className="btn btn-warning me-2">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;

