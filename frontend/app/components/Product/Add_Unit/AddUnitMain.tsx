"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormInput from "@/app/libs/FormFields/FormInput";
import { SubmitButton } from "@/app/globals/Buttons/AllButtons";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import { useCreateProductUnit } from "@/app/services/hooks/useProduct";

const FormSchema = z.object({
  status: z.enum(["Active", "Inactive"], {
    required_error: "You need to select a status",
  }),
  name: z.string({ message: "Please write a unit name" }),
});

export function AddUnitMain() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // 2. Define a submit handler.
  const { mutate: createProductUnit, isPending } = useCreateProductUnit();
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    createProductUnit(values, {
      onSuccess: (data: any) => {
        console.log(data);
        const msg = data?.message;
        Success({ message: msg || "Product unit created successfully!" });
        setTimeout(() => {
          window?.location?.reload();
        }, 2000);
      },
      onError: (error: any) => {
        console.log(error);
        const err = error?.response?.data?.message;
        Failed({
          message: err || "Product unit registration failed !",
        });
      },
    });
  };

  return (
    <div>
      <div className="mt-2 mb-6 px-4">
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold">
            Prodcut Unit Information
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  form={form}
                  placeholder="Type product unite name"
                  name="name"
                  label="Unit Name"
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Unit Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Active" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Active
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Inactive" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Inactive
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <SubmitButton disabled={isPending ? true : false}>
                Create Unit
              </SubmitButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default AddUnitMain;
