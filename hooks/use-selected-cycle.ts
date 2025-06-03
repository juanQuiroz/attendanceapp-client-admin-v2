"use client";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useSelectedCycle = () => {
  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedCycleId = localStorage.getItem("selectedCycleId");
    setSelectedCycleId(storedCycleId);
  }, []);

  const updateSelectedCycle = (cycleId: string) => {
    localStorage.setItem("selectedCycleId", cycleId);
    setSelectedCycleId(cycleId);

    // Invalida todas las queries cuando cambia el ciclo
    queryClient.invalidateQueries({
      predicate: (query) => {
        // Invalida queries que tengan cycleId en su key
        return (
          Array.isArray(query.queryKey) &&
          query.queryKey.includes(selectedCycleId)
        );
      },
    });
  };

  return {
    selectedCycleId,
    updateSelectedCycle,
    hasSelectedCycle: !!selectedCycleId,
  };
};
