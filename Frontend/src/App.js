import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import AddProduct from './components/AddProduct/AddProduct';

function App() {

    return (
        <Router>
            <>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add-product" element={<AddProduct />} />
                </Routes>
            </>
            <Footer />
        </Router>
    )
} 

export default App;