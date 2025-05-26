import React, { useState, useEffect } from "react";
import { getPredialData, postPredial } from "../services/api";

export default function PredialPage() {
  const [form, setForm] = useState({ nombre: "", direccion: "" });
  const [msg, setMsg] = useState("");
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    try {
      const data = await getPredialData();
      setRegistros(data);
    } catch (err) {
      console.error("Error al cargar registros Predial:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Enviando…");
    try {
      const res = await postPredial(form);
      setMsg(`✓ ${res.message || "Registro exitoso"} — Clave: ${res.clave}`);
      setForm({ nombre: "", direccion: "" });
      loadRegistros();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <section className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Servicio Predial</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          required
          name="nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
          placeholder="Nombre"
          className="border p-2 rounded w-full"
        />
        <input
          required
          name="direccion"
          value={form.direccion}
          onChange={e => setForm({ ...form, direccion: e.target.value })}
          placeholder="Dirección"
          className="border p-2 rounded w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Registrar
        </button>
      </form>

      {msg && <p>{msg}</p>}

      <h3 className="text-lg font-bold">Registros Predial</h3>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th>Clave</th><th>Nombre</th><th>Dirección</th><th>Estatus</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r, i) => (
            <tr key={i} className="border-t text-center">
              <td>{r.clave}</td>
              <td>{r.nombre}</td>
              <td>{r.direccion}</td>
              <td>{r.estatus}</td>
              <td>${r.total_pagar?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
