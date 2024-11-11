"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { user_role } from "@/app/constant/user_role";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "@/app/globals/Buttons/AllButtons";
import ItemSelect from "@/app/libs/FormFields/FormSelect/ItemSelect";

const AssignRoleMain = () => {
  const formSchema = z.object({
    user: z.string({ message: "You must select an user" }),
    role: z.string({ message: "You must select a role" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="mt-2 mb-6 px-4">
      <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
        <h2 className="text-xl text-gray-800 font-bold">Assign Role</h2>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-8">
              {/* Username (using ItemSelect) */}
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Users
                    </FormLabel>
                    <FormControl>
                      <ItemSelect
                        data={user_role}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Role (using Select) */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Roles
                    </FormLabel>
                    <FormControl>
                      <ItemSelect
                        data={user_role}
                        value={field.value} // Pass form value
                        onChange={field.onChange} // Handle form change
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton types="submit">Assign Role</SubmitButton>
          </Form>
        </form>
      </div>
    </div>
  );
};

export default AssignRoleMain;
