import React, { useState } from "react";
import { postRevalidacion } from "../services/api";

export default function RevalidacionPage() {
  const [vehiculo, setVehiculo] = useState({
    placa: "", propietario: "", modelo: 2020,
    marca: "", linea: "", serie: "", tipo: "auto",
  });
  const [msg, setMsg] = useState("");

  const send = async (e) => {
    e.preventDefault();
    setMsg("Enviando…");
    try {
      await postRevalidacion(vehiculo);
      setMsg("✓ Solicitud registrada");
      setVehiculo({ placa:"",propietario:"",modelo:2020,marca:"",linea:"",serie:"",tipo:"auto" });
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <section className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Revalidación Vehicular</h2>

      <form onSubmit={send} className="grid gap-2 md:grid-cols-3">
        {["placa","propietario","modelo","marca","linea","serie"].map(campo=>(
          <input key={campo} required
            value={vehiculo[campo]}
            placeholder={campo}
            onChange={e=>setVehiculo({...vehiculo,[campo]:e.target.value})}
            className="border p-2 rounded" />
        ))}
        <select value={vehiculo.tipo}
          onChange={e=>setVehiculo({...vehiculo,tipo:e.target.value})}
          className="border p-2 rounded">
          <option value="auto">Auto</option>
          <option value="moto">Moto</option>
          <option value="camion">Camión</option>
        </select>
        <button className="col-span-full bg-blue-600 text-white py-2 rounded">Registrar</button>
      </form>

      {msg && <p>{msg}</p>}
    </section>
  );
}
