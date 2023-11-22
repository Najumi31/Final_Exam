import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Pages/home';
import Product from './Pages/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './Pages/navbar';

function App() {
 return (
   <div className="App">
     <Router>
       <NavbarComponent />
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/product' element={<Product />} />
       </Routes>
     </Router>
   </div>
 );
}

export default App;
