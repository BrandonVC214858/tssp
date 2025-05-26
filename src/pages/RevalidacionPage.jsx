import React, { useState, useEffect } from "react";
import { getRevalidacionData, postRevalidacion } from "../services/api";

export default function RevalidacionPage() {
  const [vehiculo, setVehiculo] = useState({
    placa: "", propietario: "", modelo: "", marca: "", linea: "", serie: "", tipo: "auto",
  });
  const [msg, setMsg] = useState("");
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    loadRegistros();
  }, []);

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
      setVehiculo({ placa:"",propietario:"",modelo:"",marca:"",linea:"",serie:"",tipo:"auto" });
      loadRegistros();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <section className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Revalidación Vehicular</h2>

      <form onSubmit={handleSubmit} className="grid gap-2 md:grid-cols-3">
        {["placa","propietario","modelo","marca","linea","serie"].map(c => (
          <input
            key={c}
            required
            name={c}
            value={vehiculo[c]}
            onChange={e => setVehiculo({ ...vehiculo, [c]: e.target.value })}
            placeholder={c.charAt(0).toUpperCase() + c.slice(1)}
            className="border p-2 rounded"
          />
        ))}
        <select
          value={vehiculo.tipo}
          onChange={e => setVehiculo({ ...vehiculo, tipo: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="auto">Auto</option>
          <option value="moto">Moto</option>
          <option value="camion">Camión</option>
        </select>

        <button className="col-span-full bg-blue-600 text-white py-2 rounded">
          Registrar
        </button>
      </form>

      {msg && <p>{msg}</p>}

      <h3 className="text-lg font-bold">Solicitudes Registradas</h3>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th>Placa</th><th>Propietario</th><th>Estatus</th><th>Adeudo</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r, i) => (
            <tr key={i} className="border-t text-center">
              <td>{r.placa}</td>
              <td>{r.propietario}</td>
              <td>{r.estatus}</td>
              <td>${r.adeudo_total?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
