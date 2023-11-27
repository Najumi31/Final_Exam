import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './Pages/product';
import Home from './Pages/home';
import NavbarComponent from './Pages/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialProducts = [
    { id: '1', name: 'Apple', price: 20, stock: 40, category: 'Consumables' },
    // Add more products as needed
  ];

  const initialCategories = ['Consumables', 'Clothes', 'Homewares', ];

  const [products, setProducts] = React.useState(initialProducts);

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
                  categories={initialCategories}
                  addProduct={addProduct}
                  deleteProduct={deleteProduct}
                  updateProduct={updateProduct}
                />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
