import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="container my-5 text-center">
        <h2 className="text-danger mb-4">Kontak Kami</h2>
        <p className="fs-5 text-muted">
          Jika Anda memiliki pertanyaan atau ingin melakukan pemesanan, hubungi kami melalui informasi berikut:
        </p>
        <div className="mt-4">
          <p className="fs-5 text-dark mb-2">
            <strong>Email:</strong> itadakimasukedairamen@gmail.com
          </p>
          <p className="fs-5 text-dark mb-2">
            <strong>Telepon:</strong> (+62)82-5987-654-321
          </p>
          <p className="fs-5 text-dark">
            <strong>Alamat:</strong> Desa Bantaragung, Kecamatan Sindangwangi, Kabupaten Majalengka
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
