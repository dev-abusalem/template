import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

interface FormDateInput {
  form: any;
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  value?: string | number | Date;
  disabled?: boolean;
  defaultValue?: string | number | Date;
  require?: boolean;
}

const FormDate = ({
  form,
  name,
  label,
  value,
  disabled,
  defaultValue,
  require,
}: FormDateInput) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );

  useEffect(() => {
    // Initialize the date from form's current value if provided
    if (value) {
      setDate(new Date(value as string | number));
    }
  }, [value]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <label className="text-gray-800 text-sm block mb-0.5">
              {label}
              {require && <sup className="text-red-700">*</sup>}
            </label>
          </FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  disabled={disabled}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    field.onChange(selectedDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDate;
