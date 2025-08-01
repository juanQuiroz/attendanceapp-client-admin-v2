import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedCycle } from "../use-selected-cycle";
import { attendanceTeachersService } from "@/lib/api/services/attendance.service";
import { AttendanceTimes } from "@/types/attendance";
import { toast } from "sonner";

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

export const useUpdateAttendanceTeacher = () => {
  const { selectedCycleId } = useSelectedCycle();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      attendanceId,
      attendanceTimes,
    }: {
      attendanceId: string;
      attendanceTimes: AttendanceTimes;
    }) => {
      return await attendanceTeachersService.updateTimeAttendance(
        attendanceId,
        attendanceTimes
      );
    },
    onSuccess: () => {
      console.log("ONMUTATION SUCCESS");
      queryClient.invalidateQueries({ queryKey: ["attendanceTeachers"] });
      toast.success("¡Asistencia actualizada exitosamente!", {
        richColors: true,
        position: "top-center",
      });
    },
    onError: (error) => {
      console.error("Error updating attendance:", error);
    },
  });
};
