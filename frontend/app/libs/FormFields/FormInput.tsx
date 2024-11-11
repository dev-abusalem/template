import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

interface FormInputProps {
  form: any;
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  defaultValue?: string | number;
  require?: boolean;
  isLable?: boolean;
  setChangeValue?: any;
}

const FormInput = ({
  form,
  name,
  type,
  label,
  placeholder,
  value,
  disabled,
  defaultValue,
  require,
  setChangeValue,
  isLable = true,
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isLable === false ? (
            <></>
          ) : (
            <FormLabel>
              <label className="text-gray-800 text-sm block mb-2">
                {label}
                {require && <sup className="text-red-700">*</sup>}
              </label>
            </FormLabel>
          )}

          <FormControl>
            <div className="relative flex items-center mt-4">
              <input
                {...field}
                value={value}
                defaultValue={defaultValue}
                required={require || false}
                disabled={disabled}
                type={type || "text"}
                placeholder={placeholder}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setChangeValue && setChangeValue(inputValue);
                  field.onChange(
                    type === "number" ? parseFloat(inputValue) : inputValue
                  );
                }}
                className={`${
                  disabled ? "cursor-not-allowed bg-slate-100" : ""
                } w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary`}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
