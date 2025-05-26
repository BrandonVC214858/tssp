import React, { useState, useEffect } from "react";
import { getJmas, postJmas } from "../services/api";

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

  // Carga inicial de registros
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
    <section className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Servicio JMAS</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        {["Cuenta","direccion","giro","numero_medidor","nombres_apellidos"].map(name => (
          <input
            key={name}
            required
            name={name}
            value={form[name]}
            onChange={e => setForm({ ...form, [name]: e.target.value })}
            placeholder={name.charAt(0).toUpperCase() + name.slice(1).replace("_"," ")}
            className="border p-2 rounded w-full"
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Registrar
        </button>
      </form>

      {msg && <p>{msg}</p>}

      <h3 className="text-lg font-bold">Servicios Registrados</h3>
      <ul className="list-disc list-inside">
        {registros.map((r, i) => (
          <li key={i}>
            {r.nombres_apellidos} — Cuenta: {r.Cuenta} — Estatus: {r.status || r.estatus}
          </li>
        ))}
      </ul>
    </section>
);
}
