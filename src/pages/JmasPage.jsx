import React, { useState } from "react";
import { postJmas } from "../services/api";


export default function JmasPage() {
  const [form, setForm] = useState({ contrato: "", monto: 0 });
  const [status, setStatus] = useState({ sending: false, error: null, ok: false });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, error: null, ok: false });

    try {
      const respuesta = await postJmas(form);
      console.log("respuesta", respuesta);         // úsala como quieras
      setStatus({ sending: false, error: null, ok: true });
    } catch (err) {
      setStatus({ sending: false, error: err.message, ok: false });
    }
  };

  return (
    <section>
      <h2>Pago JMAS</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Número de contrato:
          <input
            type="text"
            name="contrato"
            value={form.contrato}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Monto a pagar:
          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            step="0.01"
            required
          />
        </label>

        <button type="submit" disabled={status.sending}>
          {status.sending ? "Enviando…" : "Pagar"}
        </button>
      </form>

      {status.ok && <p className="ok">Pago registrado correctamente.</p>}
      {status.error && <p className="error">Error: {status.error}</p>}
    </section>
  );
}
