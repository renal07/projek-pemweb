import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (form.email.trim() === '' || form.password.trim() === '') {
      alert("Mohon isi email dan password.");
      return;
    }

    fetch("http://kedai-ramen.test/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));

          // Role admin
          if (data.user.role === "admin") {
            alert("Login berhasil! Anda adalah admin.");
          } else {
            alert("Login berhasil!");
          }

          navigate("/home");
        } else {
          alert(data.message || "Akun tidak ditemukan. Silakan daftar akun baru.");
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        alert("Terjadi kesalahan saat login.");
      });
  };

  const handleDaftar = () => {
    navigate("/register");
  };

  const handleKembali = () => {
    navigate("/home");
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '80px' }}>
      <div className="border p-4 rounded shadow-sm bg-light text-center">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control mb-4"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-danger w-100 mb-3">Login</button>
        </form>

        <div className="d-flex justify-content-between">
          <button onClick={handleDaftar} className="btn btn-outline-primary">Buat Akun Baru</button>
          <button onClick={handleKembali} className="btn btn-outline-secondary">Kembali</button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
