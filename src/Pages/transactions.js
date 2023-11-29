import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transactions = ({ products, updateStock, completeTransaction: completeTransactionProp }) => {
  const [transactions, setTransactions] = useState([]);
  const [quantityInputs, setQuantityInputs] = useState({});

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
    transactions.forEach((item) => {
      const productToAdd = products.find((product) => product.id === item.id);
      const updatedStock = productToAdd.stock - item.quantity;
      updateStock(item.id, updatedStock);
    });

    completeTransactionProp(transactions);
    setTransactions([]);
  };

  const getCurrentStock = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    return selectedProduct ? selectedProduct.stock : 0;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Transaction Management</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Quantity</th>
            <th>Add to Transaction</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
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
      <ul className="list-group">
        {transactions.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.name} - Quantity: {item.quantity} - Total: ${item.quantity * item.price}
            <button className="btn btn-danger ms-2" onClick={() => removeFromTransaction(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button className="btn btn-success mt-3" onClick={handleCompleteTransaction}>
        Complete Transaction
      </button>
    </div>
  );
};

export default Transactions;







