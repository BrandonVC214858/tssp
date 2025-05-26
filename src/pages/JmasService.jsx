// src/pages/JmasPage.jsx
import React, { useState, useEffect } from "react";
import { getJmas, postJmas } from "../services/api";
import "./forms.css";

export default function JmasPage() {
  const [form, setForm] = useState({
    Cuenta: "",
    direccion: "",
    giro: "",
    numero_medidor: "",
    nombres_apellidos: "",
  });
  const [msg, setMsg] = useState("");
  const [registros, setRegistros] = useState([]);

  const fields = [
    { name: "Cuenta",            label: "Cuenta" },
    { name: "direccion",         label: "Dirección" },
    { name: "giro",              label: "Giro" },
    { name: "numero_medidor",    label: "Número de medidor" },
    { name: "nombres_apellidos", label: "Nombre y apellidos" },
  ];

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    try {
      const data = await getJmas();
      setRegistros(data);
    } catch (err) {
      console.error("Error al cargar registros JMAS:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Enviando…");
    try {
      const res = await postJmas(form);
      setMsg(`✓ ${res.message || "Registro exitoso"}`);
      setForm({
        Cuenta: "",
        direccion: "",
        giro: "",
        numero_medidor: "",
        nombres_apellidos: "",
      });
      loadRegistros();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div className="jmas-page-wrapper">
      {/* Navbar homogénea */}
      <nav className="navbar-forms">
        <div className="navbar-left">
          <img src="/assets/logo-tss.png" alt="Logo" className="nav-logo" />
          <a href="/predial"      className="nav-item">Predial</a>
          <a href="/jmas"         className="nav-item active">JMAS</a>
          <a href="/revalidacion" className="nav-item">Revalidación</a>
          <a href="/gasnn"        className="nav-item">Gas Natural</a>
        </div>
        <div className="navbar-right">
          <div className="user-menu">
            <img src="/user.jpg" alt="Usuario" className="user-icon" />
            <div className="user-dropdown">
              <button className="user-btn">Perfil</button>
              <button className="user-btn">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Título principal */}
      <h1 className="jmas-title">Servicio JMAS</h1>

      <div className="jmas-content-wrapper">
        {/* Formulario */}
        <section className="jmas-form-section">
          <form onSubmit={handleSubmit} className="jmas-form-layout">
            {fields.map(({ name, label }) => (
              <div key={name} className="form-field-group">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={(e) =>
                    setForm({ ...form, [name]: e.target.value })
                  }
                  placeholder={label}
                  className="jmas-input"
                  required
                />
              </div>
            ))}

            <button type="submit" className="jmas-submit-button">
              Registrar
            </button>
          </form>

          {msg && (
            <p className="jmas-service-detail" style={{ marginTop: '1rem' }}>
              {msg}
            </p>
          )}
        </section>

        {/* Registros */}
        <section className="jmas-services-section">
          <h2 className="jmas-subtitle">Servicios Registrados</h2>
          <div className="jmas-services-list">
            {registros.map((r, i) => (
              <div key={i} className="jmas-service-item">
                <div className="jmas-service-account">
                  Cuenta: {r.Cuenta}
                </div>
                <div className="jmas-service-detail">
                  Nombre: {r.nombres_apellidos}
                </div>
                <div className="jmas-service-detail">
                  Estatus: {r.status || r.estatus}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer-yellow" />
    </div>
  );
}
