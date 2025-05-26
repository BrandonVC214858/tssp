import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Cliente Axios apuntando a /prod
export const apiVehiculos = axios.create({
  baseURL: "https://lrjxs6izo0.execute-api.us-west-2.amazonaws.com/prod",
  headers: { "Content-Type": "application/json" },
});

export const useCreateVehiculo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vehiculo) => apiVehiculos.post("/revalidacion", vehiculo).then(r => r.data),
    onSuccess: () => qc.invalidateQueries(["vehiculos"]),
  });
};
