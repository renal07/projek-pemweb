import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3" id="Kontak">
      <div className="container">
        <div className="row gy-4">
          {/* Kiri: Informasi Kontak */}
          <div className="col-md-6">
            <h5 className="mb-3">Hubungi Kami</h5>
            <p className="mb-2">
              <strong>Alamat:</strong><br />
              Desa Bantaragung, Kecamatan Sindangwangi, Kabupaten Majalengka
            </p>
            <p className="mb-2">
              <strong>Email:</strong><br />
              itadakimasukedairamen@mail.com
            </p>
            <p className="mb-0">
              <strong>Telepon:</strong><br />
              (+62) 82-5987-654-321
            </p>
          </div>

          {/* Kanan: Peta Lokasi */}
          <div className="col-md-6">
            <h5 className="mb-3">Lokasi Kami</h5>
            <div className="ratio ratio-4x3 rounded shadow-sm overflow-hidden border">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d108.37732752322962!3d-6.812475938782443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1721642838117!5m2!1sid!2sid"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="text-center pt-4 mt-5 border-top border-secondary">
          <p className="mb-0">&copy; 2024 <strong>iTadaKimaSu!</strong> - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
