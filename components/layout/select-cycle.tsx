"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCycles } from "@/hooks/queries/use-cycles";

function SelectCycle() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data: cycles, isLoading, error } = useCycles();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar ciclos</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mb-6"
        >
          {value
            ? cycles?.data.find((cycle) => cycle.id === value)?.gapi_name
            : "Ciclo"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar ciclo..." />
          <CommandList>
            <CommandEmpty>No se encontraron ciclos</CommandEmpty>
            <CommandGroup>
              {cycles?.data.map((cycle) => (
                <CommandItem
                  key={cycle.id}
                  value={cycle.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    localStorage.setItem("selectedCycleId", currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === cycle.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {cycle.gapi_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelectCycle;
