"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeSelectorProps {
  onSubmit: (data: any) => void;
  className?: string;
  submitButtonText?: string;
}

function FormDateRange({
  onSubmit,
  className = "",
  submitButtonText = "Search",
}: DateRangeSelectorProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const onSubmitHandler = (data: any) => {
    if (data.startDate && data.endDate) {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={cn("  flex justify-start items-center gap-x-2", className)}
    >
      <Controller
        name="startDate"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Start Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value || new Date()}
                onSelect={(date) => {
                  field.onChange(date);
                  setStartDate(date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <Controller
        name="endDate"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[240px]  justify-start  text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>End Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value || new Date()}
                onSelect={(date) => {
                  field.onChange(date);
                  setEndDate(date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <Button
        type="submit"
        className="bg-green-100 hover:bg-green-200 border border-green-200 text-green-800"
        disabled={!startDate || !endDate}
      >
        {submitButtonText}
      </Button>
    </form>
  );
}
export default FormDateRange;
