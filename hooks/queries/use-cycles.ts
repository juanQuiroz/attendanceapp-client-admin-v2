import { useQuery } from "@tanstack/react-query";
import { cyclesService } from "@/lib/api/services/cycles.service";

export const useCycles = () => {
  return useQuery({
    queryKey: ["cycles"],
    queryFn: () => cyclesService.getAll(),
  });
};
