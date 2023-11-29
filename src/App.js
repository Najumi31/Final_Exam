import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './Pages/product';
import Home from './Pages/home';
import NavbarComponent from './Pages/navbar';
import Stock from './Pages/stock';
import Transactions from './Pages/transactions';
import Reports from './Pages/reports';
import CategoryManagement from './Pages/category';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialProducts = [
    { id: '1', name: 'Hamburger', price: 50, stock: 300, category: 'Consumables' },
    { id: '2', name: 'Laptop', price: 2000, stock: 10, category: 'TechWares' },
    { id: '3', name: 'White T-Shirt', price: 120, stock: 40, category: 'Clothes' }
    // Add more products as needed
  ];

  const initialCategories = ['Consumables', 'Clothes', 'TechWares'];

  const [products, setProducts] = useState(initialProducts);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(initialCategories);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  const updateStock = (productsToUpdate) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const updatedProduct = productsToUpdate.find((p) => p.id === product.id);
        return updatedProduct ? { ...product, stock: updatedProduct.stock } : product;
      })
    );
  };

  const completeTransaction = (newTransactions) => {
    setTransactions((prevTransactions) => [...prevTransactions, ...newTransactions]);
  };

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (category) => {
    // Check if any product is using the category
    const isCategoryUsed = products.some((product) => product.category === category);

    if (isCategoryUsed) {
      alert(`Cannot delete category "${category}" as it is associated with one or more products.`);
      return;
    }

    // If not used, proceed with deletion
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path="/product"
            element={
              <div>
                <Product
                  products={products}
                  categories={categories}
                  addProduct={addProduct}
                  deleteProduct={deleteProduct}
                  updateProduct={updateProduct}
                  updateStock={updateStock}
                />
              </div>
            }
          />
          <Route path="/stock" element={<Stock products={products} updateStock={updateStock} />} />
          <Route
            path="/transactions"
            element={<Transactions products={products} updateStock={updateStock} completeTransaction={completeTransaction} />}
          />
          <Route path="/reports" element={<Reports transactions={transactions} />} />
          <Route
            path="/category"
            element={<CategoryManagement categories={categories} addCategory={addCategory} deleteCategory={deleteCategory} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



