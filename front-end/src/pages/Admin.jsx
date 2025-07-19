import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Admin() {
  return (
    <div>
      <Header />
      <main className="product-main text-center">
        <h2 className="my-4">Admin Panel</h2>
        <div className="admin-buttons d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/editor" className="btn btn-primary">Kelola Akun</Link>
          <Link to="/product" className="btn btn-warning">Kelola Produk</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Admin;
