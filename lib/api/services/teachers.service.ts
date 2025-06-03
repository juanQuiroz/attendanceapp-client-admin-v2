import { TeachersApiResponse } from "@/types/teacher";
import { apiClient } from "../client";

export const teachersService = {
  getAllByCycleId: async (cycleId: string) => {
    const response = await apiClient.get<TeachersApiResponse>(
      `teachers/cycle/${cycleId}`
    );
    return response.data;
  },
};
