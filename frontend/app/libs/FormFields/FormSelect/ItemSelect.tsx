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

interface SelectProps {
  data: any[];
  value: string;
  onChange: (value: string) => void;
  title?: string;
  defaultSelect?: any;
  require?: boolean;
}

function ItemSelect({
  data,
  value,
  onChange,
  title,
  defaultSelect,
  require,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);

  // Use defaultSelect if provided and value is empty
  const selectedValue = value || defaultSelect;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValue
            ? data.find((item) => item._id === selectedValue)?.name
            : `Select ${title ? title : "item"}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput placeholder={`Search ${title ? title : "item"}...`} />
          <CommandList>
            <CommandEmpty>{`No ${
              title ? title : "item"
            } found...`}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item._id}
                  value={item.name}
                  onSelect={() => {
                    onChange(item._id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === item._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ItemSelect;
