import { teachersService } from "@/lib/api/services/teachers.service";
import { useQuery } from "@tanstack/react-query";
import { useSelectedCycle } from "../use-selected-cycle";

export const useTeachers = () => {
  const { selectedCycleId } = useSelectedCycle();
  return useQuery({
    queryKey: ["teachers", selectedCycleId],
    queryFn: () => {
      if (!selectedCycleId) {
        throw new Error("No hay ciclo seleccionado");
      }
      return teachersService.getAllByCycleId(selectedCycleId);
    },
    enabled: !!selectedCycleId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos en caché
  });
};
