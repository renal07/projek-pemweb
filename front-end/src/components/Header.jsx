import React from 'react';

function Header() {
  return (
    <header className="bg-warning-subtle border-bottom border-3 border-danger shadow-sm text-center py-4">
      <h1 className="text-danger fw-bold display-5 m-0" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        🍜 iTadaKimaSu!
      </h1>
      <p className="text-danger-emphasis fs-5 mt-2">
        Rasa Jepang Asli, Harga Bersahabat
      </p>
    </header>
  );
}

export default Header;
