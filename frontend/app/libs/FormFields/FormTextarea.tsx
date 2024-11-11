import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
interface FormInputProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  defaultValue?: string | number;
  row?: number;
}
const FormTextarea = ({
  form,
  name,
  label,
  placeholder,
  value,
  disabled,
  defaultValue,
  row,
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <label className="text-gray-800 text-sm block mb-2">{label}</label>
          </FormLabel>
          <FormControl>
            <div className="relative flex items-center mt-4">
              <textarea
                {...field}
                value={value}
                rows={row ? row : 3}
                defaultValue={defaultValue}
                disabled={disabled}
                placeholder={placeholder}
                className={`${
                  disabled && "cursor-not-allowed bg-slate-100"
                } w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary`}
              ></textarea>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
