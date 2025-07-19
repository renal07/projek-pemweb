import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-md"
      style={{
        backgroundColor: '#c0392b',
        padding: '10px 40px',
        borderRadius: '30px',
        margin: '20px auto',
        maxWidth: '1200px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center px-0">
        {/* Logo */}
        <div className="text-white fw-bold" style={{ fontSize: '22px' }}>
          🍜 iTadaKimaSu!
        </div>

        {/* Menu */}
        <ul className="navbar-nav d-flex flex-row gap-3 align-items-center mb-0">
          <li className="nav-item">
            <Link to="/home" className="nav-link text-white fw-medium">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/beli" className="nav-link text-white fw-medium">Beli</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-white fw-medium">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link text-white fw-medium">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="btn btn-outline-light btn-sm">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
