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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton, SubmitButton } from "@/app/globals/Buttons/AllButtons";

const Add_User_Form = () => {
  const formSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters." }),
    role: z.string(),
    address: z.string().optional(),
    note: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: user_role[0],
      address: "",
      note: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () =>
  //     fetch('https://api.github.com/repos/TanStack/query').then((res) =>
  //       res.json(),
  //     ),
  // })
  return (
    <div className="mt-2 mb-6 px-4">
      <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
        <h2 className="text-xl text-gray-800 font-bold">User Information</h2>

        {/* Move onSubmit here */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-8">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <input
                        placeholder="Enter Name"
                        className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <input
                        type="tel"
                        placeholder="Enter your phone no."
                        className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      User Role
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full  rounded-md py-2.5 h-[45px] px-4 border border-gray-300 text-sm">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {user_role.map((role, index) => (
                            <SelectItem
                              key={index}
                              value={role}
                              className="capitalize"
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Address
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary"
                        placeholder="Enter customer full address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Note */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 text-sm mb-2">
                      Note
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-primary"
                        placeholder="Enter if you have any note"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton>Add User</SubmitButton>
          </Form>
        </form>
      </div>
    </div>
  );
};

export default Add_User_Form;
