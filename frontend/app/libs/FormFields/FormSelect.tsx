import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import ItemSelect from "./FormSelect/ItemSelect";
interface FormInputProps {
  form: any;
  name: string;
  label: string;
  data: any[];
  defaultSelect?: any;
  require?: boolean;
  isLable?: boolean;
}
const FormSelect = ({
  form,
  name,
  label,
  data,
  defaultSelect,
  require,
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
              <label className="text-gray-800 text-sm block mb-0.5">
                {label}
                {require && <sup className="text-red-700">*</sup>}
              </label>
            </FormLabel>
          )}

          <FormControl>
            <ItemSelect
              data={data}
              value={field.value}
              onChange={field.onChange}
              title={label || name}
              defaultSelect={defaultSelect}
              require={require}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
