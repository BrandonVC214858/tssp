// src/pages/GasNaturalPage.jsx
import React, { useState, useEffect } from "react";
import { getGasnn, postGasnn } from "../services/api";
import "./forms.css";

export default function GasNaturalPage() {
  const [form, setForm]         = useState({ numero_cliente: "" });
  const [msg, setMsg]           = useState("");
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    try {
      const data = await getGasnn();
      setRegistros(data);
    } catch (err) {
      console.error("Error al cargar registros Gas Natural:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Enviando…");
    try {
      const res = await postGasnn(form);
      setMsg(`✓ ${res.message || "Registro exitoso"}`);
      setForm({ numero_cliente: "" });
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
          <img src="/logo.png" alt="Logo" className="nav-logo" />
          <a href="/predial"      className="nav-item">Predial</a>
          <a href="/jmas"         className="nav-item">JMAS</a>
          <a href="/revalidacion" className="nav-item">Revalidación</a>
          <a href="/gasnn"        className="nav-item active">Gas Natural</a>
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
      <h1 className="jmas-title">Gas Natural</h1>

      <div className="jmas-content-wrapper">
        {/* Formulario */}
        <section className="jmas-form-section">
          <form onSubmit={handleSubmit} className="jmas-form-layout">
            <div className="form-field-group">
              <label htmlFor="numero_cliente" className="form-label">
                Número de cliente
              </label>
              <input
                id="numero_cliente"
                name="numero_cliente"
                type="text"
                placeholder="Ingrese número de cliente"
                value={form.numero_cliente}
                onChange={e => setForm({ numero_cliente: e.target.value })}
                className="jmas-input"
                required
              />
            </div>

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

        {/* Resultados */}
        <section className="jmas-services-section">
          <h2 className="jmas-subtitle">Servicios Registrados</h2>
          <div className="jmas-services-list">
            {registros.map((r, i) => (
              <div key={i} className="jmas-service-item">
                <div className="jmas-service-account">
                  Cliente: {r.numero_cliente}
                </div>
                <div className="jmas-service-detail">
                  Estatus: {r.estatus}
                </div>
                {typeof r.total_pagar !== "undefined" && (
                  <div className="jmas-service-detail">
                    Total a pagar: ${r.total_pagar.toFixed(2)}
                  </div>
                )}
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
