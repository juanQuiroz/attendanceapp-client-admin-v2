import { useQuery } from "@tanstack/react-query";
import { useSelectedCycle } from "../use-selected-cycle";
import { attendanceTeachersService } from "@/lib/api/services/attendance.service";

export const useAttendanceTeachers = () => {
  const { selectedCycleId } = useSelectedCycle();
  return useQuery({
    queryKey: ["attendanceTeachers", selectedCycleId],
    queryFn: () => {
      if (!selectedCycleId) {
        throw new Error("No hay ciclo seleccionado");
      }
      return attendanceTeachersService.getAllAttendancesByCycleGroupedByTeachers(
        selectedCycleId
      );
    },
    enabled: !!selectedCycleId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos en caché
  });
};
