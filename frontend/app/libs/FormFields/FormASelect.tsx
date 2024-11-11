import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface FormASelectProps {
  form: any;
  name: string;
  label: string;
  value?: string | number;
  disabled?: boolean;
  defaultSelect?: any;
  require?: boolean;
  isLable?: boolean;
  data: any[];
}
const FormASelect = ({
  form,
  name,
  label,
  data,
  value,
  disabled,
  require,
  defaultSelect,
  isLable = true,
}: FormASelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isLable && (
            <FormLabel>
              <label className="text-gray-800 text-sm block mb-0.5">
                {label}
                {require && <sup className="text-red-700">*</sup>}
              </label>
            </FormLabel>
          )}
          <FormControl>
            <Select
              disabled={disabled}
              defaultValue={defaultSelect}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select ${label ? label : name ? name : ""}`}
                />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormASelect;
