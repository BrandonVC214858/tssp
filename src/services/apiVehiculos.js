// File: src/services/apiVehiculos.js

import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://k48v40lcjc.execute-api.us-west-2.amazonaws.com/prod/barcode/revalidacion";

/**
 * Registra una revalidación vehicular.
 * @param {{ placa: string, monto: number }} data 
 * @returns {Promise<any>}
 */
export async function postRevalidacion(data) {
  const resp = await axios.post(`${API_BASE}/revalidacion`, data);
  return resp.data;
}
