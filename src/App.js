import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './Pages/navbar';
import Home from './Pages/home';
import Product from './Pages/product';

function App() {
 return (
   <div className="App">
     <Router>
       <Navbar />
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/product' element={<Product />} />
       </Routes>
     </Router>
   </div>
 );
}

export default App;
