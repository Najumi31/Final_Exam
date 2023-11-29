import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reports = ({ transactions }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filter transactions based on the selected category
  const filteredTransactions = selectedCategory
    ? transactions.filter((transaction) => transaction.category === selectedCategory)
    : transactions;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * (a.quantity - b.quantity);
  });

  const totalTransactionPrice = transactions.reduce((total, transaction) => {
    return total + transaction.quantity * transaction.price;
  }, 0);

  return (
    <div className="container mt-4">
      <h2>Transaction Report</h2>

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
          {Array.from(new Set(transactions.map((transaction) => transaction.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p>No transactions to report</p>
      ) : (
        <div>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Overall Price</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.quantity}</td>
                  <td>₱{transaction.price}</td>
                  <td>₱{transaction.quantity * transaction.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <p>Total Transaction Price: ₱{totalTransactionPrice}</p>
            <button className="btn btn-primary" onClick={toggleSortOrder}>
              Sort by Quantity {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;




