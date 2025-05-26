import React, { useState, useEffect } from 'react';
import { postJson, getJson } from '../services/api';

export default function PredialService() {
  const [form, setForm]   = useState({ nombre:'', direccion:'' });
  const [data, setData]   = useState([]);
  const [loading,setLoad] = useState(false);
  const [err,setErr]      = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoad(true); setErr('');
    try {
      await postJson('/predial', form);
      await fetchAll();
    } catch (e) { setErr(e.message); }
    finally { setLoad(false); }
  };

  const fetchAll = async () => {
    try { setData(await getJson('/predial')); }
    catch { setErr('No se pudo cargar'); }
  };

  useEffect(()=>{ fetchAll(); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Impuesto Predial</h2>

      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <input required placeholder="Nombre"
               value={form.nombre}
               onChange={e=>setForm({...form,nombre:e.target.value})}
               className="border p-2 rounded"/>
        <input required placeholder="Dirección"
               value={form.direccion}
               onChange={e=>setForm({...form,direccion:e.target.value})}
               className="border p-2 rounded"/>
        <button type="submit" disabled={loading}
                className="col-span-full bg-blue-600 hover:bg-blue-700
                           text-white py-2 rounded">
          {loading?'Enviando…':'Registrar consulta'}
        </button>
      </form>

      {err && <p className="text-red-600">{err}</p>}

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th>Clave</th><th>Nombre</th><th>Estatus</th><th>Total a pagar</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r=>(
            <tr key={r.clave} className="text-center border-t">
              <td>{r.clave}</td>
              <td>{r.nombre}</td>
              <td>{r.estatus}</td>
              <td>${r.total_pagar.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
