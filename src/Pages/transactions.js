import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transactions = ({ products, updateStock, completeTransaction: completeTransactionProp }) => {
  const [transactions, setTransactions] = useState([]);
  const [quantityInputs, setQuantityInputs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  const addToTransaction = (productId, quantity) => {
    const existingProduct = transactions.find((item) => item.id === productId);

    if (existingProduct) {
      alert('Product is already in the transaction!');
      return;
    }

    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd && productToAdd.stock >= parseInt(quantity, 10) && parseInt(quantity, 10) > 0) {
      const updatedTransaction = [...transactions, { ...productToAdd, quantity: parseInt(quantity, 10) }];
      setTransactions(updatedTransaction);

      // Clear the quantity input for the added product
      setQuantityInputs((prevInputs) => ({ ...prevInputs, [productId]: '' }));
    } else {
      alert('Invalid product or insufficient stock!');
    }
  };

  const removeFromTransaction = (productId) => {
    const updatedTransaction = transactions.filter((item) => item.id !== productId);
    setTransactions(updatedTransaction);
  };

  const handleCompleteTransaction = () => {
    if (transactions.length === 0) {
      alert('There is no currently selected items. Add to proceed.');
      return;
    }

    const isStockAvailable = transactions.every((item) => {
      const productToAdd = products.find((product) => product.id === item.id);
      return productToAdd.stock - item.quantity >= 0;
    });

    if (!isStockAvailable) {
      alert('Insufficient stock for one or more items in the transaction!');
      return;
    }

    // Update the stock and create the new transaction array
    const updatedProducts = products.map((product) => {
      const transactionItem = transactions.find((item) => item.id === product.id);

      if (transactionItem) {
        return {
          ...product,
          stock: product.stock - transactionItem.quantity,
        };
      }

      return product;
    });

    updateStock(updatedProducts);

    completeTransactionProp(transactions);
    setTransactions([]);
  };

  const getCurrentStock = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    return selectedProduct ? selectedProduct.stock : 0;
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Transaction Management</h2>
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

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Quantity</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱{product.price}</td>
              <td>{getCurrentStock(product.id)}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={quantityInputs[product.id] || ''}
                  onChange={(e) =>
                    setQuantityInputs((prevInputs) => ({ ...prevInputs, [product.id]: e.target.value }))
                  }
                  placeholder="Quantity"
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => addToTransaction(product.id, quantityInputs[product.id])}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">Cart Items</h3>
      {transactions.length === 0 ? (
        <p>There is no currently selected items. Add to proceed.</p>
      ) : (
        <ul className="list-group">
          {transactions.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.name} - Quantity: {item.quantity} - Total: ₱{item.quantity * item.price}
              <button className="btn btn-danger ms-2" onClick={() => removeFromTransaction(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Conditionally render the Complete Transaction button */}
      {transactions.length > 0 && (
        <button className="btn btn-success mt-3" onClick={handleCompleteTransaction}>
          Complete Transaction
        </button>
      )}
    </div>
  );
};

export default Transactions;
















