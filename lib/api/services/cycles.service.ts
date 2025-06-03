import { CyclesApiResponse } from "@/types/cycle";
import { apiClient } from "../client";

export const cyclesService = {
  getAll: async () => {
    const response = await apiClient.get<CyclesApiResponse>("/cycles");
    return response.data;
  },
  //   getById: (id: string) => apiClient.get<Admin>(`/admins/${id}`),
  //   create: (data: CreateAdminData) => apiClient.post<Admin>("/admins", data),
  //   update: (id: string, data: UpdateAdminData) =>
  //     apiClient.put<Admin>(`/admins/${id}`, data),
  //   delete: (id: string) => apiClient.delete(`/admins/${id}`),
};
