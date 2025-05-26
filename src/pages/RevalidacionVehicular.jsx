import React, { useState, useEffect } from "react";
import { getRevalidacionData, postRevalidacion } from "../services/api";
import "./forms.css";

export default function RevalidacionPage() {
  const [vehiculo, setVehiculo] = useState({
    placa: "",
    propietario: "",
    modelo: "",
    marca: "",
    linea: "",
    serie: "",
    tipo: "auto",
  });
  const [msg, setMsg] = useState("");
  const [registros, setRegistros] = useState([]);

  // Carga inicial de registros
  useEffect(() => { loadRegistros(); }, []);

  const loadRegistros = async () => {
    try {
      const data = await getRevalidacionData();
      setRegistros(data);
    } catch (err) {
      console.error("Error al cargar registros Revalidación:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Enviando…");
    try {
      await postRevalidacion(vehiculo);
      setMsg("✓ Solicitud registrada");
      setVehiculo({ placa: "", propietario: "", modelo: "", marca: "", linea: "", serie: "", tipo: "auto" });
      loadRegistros();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div className="jmas-page-wrapper">
      {/* Navbar decorado */}
      <nav className="navbar-forms">
        <div className="navbar-left">
          <img src="/assets/logo-tss.png" alt="Logo" className="nav-logo" />
          <a href="/predial" className="nav-item">Predial</a>
          <a href="/jmas" className="nav-item">JMAS</a>
          <a href="/revalidacion" className="nav-item active">Revalidación</a>
          <a href="/gasnn" className="nav-item">Gas Natural</a>
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
      <h1 className="jmas-title">Revalidación Vehicular</h1>

      <div className="jmas-content-wrapper">
        {/* Sección de formulario */}
        <section className="jmas-form-section">
          <form onSubmit={handleSubmit} className="jmas-form-layout">
            {Object.entries(vehiculo).map(([key, value]) =>
              key !== 'tipo' ? (
                <div key={key} className="form-field-group">
                  <label htmlFor={key} className="form-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type={key === 'serie' || key === 'modelo' ? 'text' : key === 'marca' || key === 'linea' || key === 'propietario' || key === 'placa' ? 'text' : 'text'}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={e => setVehiculo({ ...vehiculo, [key]: e.target.value })}
                    className="jmas-input"
                    required
                  />
                </div>
              ) : null
            )}

            <div className="form-field-group">
              <label htmlFor="tipo" className="form-label">Tipo</label>
              <select
                id="tipo"
                value={vehiculo.tipo}
                onChange={e => setVehiculo({ ...vehiculo, tipo: e.target.value })}
                className="jmas-input jmas-select"
              >
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
                <option value="camion">Camión</option>
              </select>
            </div>

            <button
              type="submit"
              className="jmas-submit-button"
            >
              Registrar
            </button>
          </form>

          {msg && <p className="jmas-service-detail" style={{ marginTop: '1rem' }}>{msg}</p>}
        </section>

        {/* Sección de registros */}
        <section className="jmas-services-section">
          <h2 className="jmas-subtitle">Solicitudes Registradas</h2>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>Placa</th><th>Propietario</th><th>Estatus</th><th>Adeudo</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, i) => (
                <tr key={i} className="jmas-service-item border-t text-center">
                  <td>{r.placa}</td>
                  <td>{r.propietario}</td>
                  <td>{r.estatus}</td>
                  <td>${r.adeudo_total?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer-yellow" />
    </div>
  );
}