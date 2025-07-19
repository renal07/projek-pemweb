import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Beli() {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="container my-5 text-center">
        <h2 className="text-danger mb-4">Halaman Beli</h2>
        <p className="fs-5 text-muted">
          Silakan kunjungi kedai kami untuk melakukan pembelian langsung.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Beli;
