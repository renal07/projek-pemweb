import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Beli from './pages/Beli';
import Admin from './pages/Admin';
import Product from './pages/Product';
import Editor from './pages/Editor';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/beli" element={<Beli />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product" element={<Product />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
