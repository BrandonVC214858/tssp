import React, { useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';
import { postJson } from '../services/api';

const SERVICIOS = {
  jmas:   { label: 'JMAS Agua',          path: '/jmas' },
  gasnn:  { label: 'Gas Natural',        path: '/gasnn' },
  revalidacion: { label: 'Revalidación', path: '/revalidacion' },
  predial: { label: 'Impuesto Predial',  path: '/predial' }
};

export default function PagosServicios() {
  const [service, setService]     = useState('jmas');
  const [idCliente, setIdCliente] = useState('');
  const [barcodeB64, setBarcode]  = useState('');
  const [scanning, setScanning]   = useState(false);
  const [msg, setMsg]             = useState({ tipo: null, texto: '' });

  const generarCodigo = async () => {
    if (!idCliente) return setMsg({ tipo: 'error', texto: 'Ingrese número/ID' });
    try {
      const { barcode_base64 } = await postJson(
        `/barcode${SERVICIOS[service].path}`,
        { id: idCliente }
      );
      setBarcode(barcode_base64);
      setMsg({ tipo: 'ok', texto: 'Código generado' });
    } catch (e) {
      setMsg({ tipo: 'error', texto: e.message });
    }
  };

  const registrarPago = async (codigo) => {
    try {
      await postJson(`/pago${SERVICIOS[service].path}`, { codigo });
      setMsg({ tipo: 'ok', texto: `Pago registrado (${codigo})` });
      setBarcode('');
      setScanning(false);
    } catch (e) {
      setMsg({ tipo: 'error', texto: e.message });
    }
  };

  const handleDetected = (result) => {
    if (result?.text) registrarPago(result.text);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Pagos de Servicios</h1>

      <select value={service} onChange={(e)=>setService(e.target.value)}
              className="w-full border rounded p-2">
        {Object.entries(SERVICIOS).map(([val,{label}]) =>
          <option key={val} value={val}>{label}</option>)}
      </select>

      <input value={idCliente} onChange={e=>setIdCliente(e.target.value)}
             placeholder="Número de cliente / clave"
             className="w-full border rounded p-2"/>

      <button onClick={generarCodigo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
        Generar código
      </button>

      {barcodeB64 && (
        <div className="text-center space-y-4">
          <img src={barcodeB64} alt="Código de barras" className="inline-block"/>
          <button onClick={()=>setScanning(true)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded">
            Escanear y pagar
          </button>
        </div>
      )}

      {scanning && (
        <BarcodeScanner
        onUpdate={(err, res) => !err && res && handleDetected(res)}
        width={350}
        height={250}
        className="mx-auto"
        />      
      )}
      {msg.tipo && (
        <div
          className={`p-3 rounded ${
            msg.tipo === 'ok'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {msg.texto}
        </div>
      )}
    </div>
  );
}
