import React, { useState } from "react";
import {
  postJmas,
  postPredial,
  postRevalidacion,
  generarBarcodeJmas,
  generarBarcodePredial,
  generarBarcodeRevalidacion,
} from "../services/api";

const registerMap = {
  jmas: postJmas,
  predial: postPredial,
  revalidacion: postRevalidacion,
};

const barcodeMap = {
  jmas: generarBarcodeJmas,
  predial: generarBarcodePredial,
  revalidacion: generarBarcodeRevalidacion,
};

export default function BarcodeGenerator() {
  const [servicio, setServicio] = useState("jmas");
  const [folio, setFolio] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [numeroMedidor, setNumeroMedidor] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");

  const generar = async () => {
    setError("");
    setImg(null);

    if (!folio || !cuenta || (servicio === "jmas" && !numeroMedidor)) {
      setError("Folio, Cuenta y Número de medidor (para JMAS) son obligatorios");
      return;
    }

    const body = {
      Folio: folio,
      Cuenta: cuenta,
      ...(servicio === "jmas" && { numero_medidor: numeroMedidor }),
    };

    try {
      // 1) Registrar el servicio
      const registro = await registerMap[servicio](body);
      const idRegistro = registro.id || folio;

      // 2) Generar el código de barras
      const { barcode_base64 } = await barcodeMap[servicio](idRegistro);

      // 3) Mostrar la imagen
      setImg(`data:image/png;base64,${barcode_base64}`);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Generar Código de Barras</h2>
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        {/* Servicio */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Servicio</label>
          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            className="border rounded px-3 py-2 w-40"
          >
            <option value="jmas">JMAS</option>
            <option value="predial">Predial</option>
            <option value="revalidacion">Revalidación</option>
          </select>
        </div>

        {/* Folio */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Folio</label>
          <input
            type="text"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            placeholder="Ingresa folio"
            className="border rounded px-3 py-2 w-40"
          />
        </div>

        {/* Cuenta */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Cuenta</label>
          <input
            type="text"
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
            placeholder="Ingresa cuenta"
            className="border rounded px-3 py-2 w-40"
          />
        </div>

        {/* Número de medidor – sólo para JMAS */}
        {servicio === "jmas" && (
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Núm. Medidor</label>
            <input
              type="text"
              value={numeroMedidor}
              onChange={(e) => setNumeroMedidor(e.target.value)}
              placeholder="Ingresa medidor"
              className="border rounded px-3 py-2 w-40"
            />
          </div>
        )}

        {/* Botón Generar */}
        <button
          onClick={generar}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded"
        >
          Generar
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {img && (
        <div className="mt-6 text-center">
          <img
            src={img}
            alt="Código de barras"
            className="inline-block border"
          />
        </div>
      )}
    </div>
  );
}