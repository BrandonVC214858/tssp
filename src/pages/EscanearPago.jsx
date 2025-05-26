import React, { useState } from "react";
import { registrarPagoJmas, registrarPagoPredial, registrarPagoRevalidacion } from "../services/api";

const mapFn = {
  jmas: registrarPagoJmas,
  predial: registrarPagoPredial,
  revalidacion: registrarPagoRevalidacion,
};

export default function EscanearPago() {
  const [servicio, setServicio] = useState("jmas");
  const [codigo, setCodigo] = useState("");
  const [msg, setMsg] = useState("");

  const enviar = async () => {
    setMsg("Enviando…");
    try {
      await mapFn[servicio](codigo);
      setMsg("✓ Pago registrado");
      setCodigo("");
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Registrar Pago</h2>

      <select value={servicio} onChange={(e)=>setServicio(e.target.value)}
        className="border p-2 rounded">
        <option value="jmas">JMAS</option>
        <option value="predial">Predial</option>
        <option value="revalidacion">Revalidación</option>
      </select>

      <input value={codigo} onChange={e=>setCodigo(e.target.value)}
        placeholder="Código escaneado" className="border p-2 rounded block"/>

      <button onClick={enviar} className="bg-green-600 text-white px-4 py-2 rounded">
        Registrar Pago
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}
