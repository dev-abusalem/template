"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRegister } from "@/app/services/hooks/useAuth";
import Image from "next/image";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// all schemas
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "You must need to use vaild email",
  }),
  password: z.string().min(4, {
    message: "Password more then 4 characters.",
  }),
});

const RegisterMain = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const {
    mutate: registerUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useRegister();
  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    registerUser(values, {
      onSuccess: (data) => {
        Success({ message: "Account created successfully!" });
        setTimeout(() => {
          window?.location?.replace("/login");
        }, 2000);
      },
      onError: (error) => {
        console.log(error);
        Failed({ message: "Registration failed. Please try again." });
      },
    });
  };

  return (
    <section className=" bg-invms50 dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md p-6 rounded-xl bg-white shadow-md"
          >
            <Image
              className="w-auto mx-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
              width={40}
              height={40}
            />
            <h1 className="mt-3 text-2xl text-center font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
              REGISTER
            </h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center mt-8">
                      <User className="w-6 absolute h-6 mx-3 text-gray-300 dark:text-gray-500" />
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-invms300 focus:ring-invms300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Enter your name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center mt-8">
                      <Mail className="w-6 absolute h-6 mx-3 text-gray-300 dark:text-gray-500" />
                      <input
                        {...field}
                        type="email"
                        className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-invms300 focus:ring-invms300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Enter your email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center mt-8">
                      <Lock className="w-6 absolute h-6 mx-3 text-gray-300 dark:text-gray-500" />
                      <input
                        {...field}
                        type={showPass ? "text" : "password"}
                        className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-invms300 focus:ring-invms300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Enter your password"
                      />
                      {showPass ? (
                        <FaRegEye
                          onClick={() => setShowPass(false)}
                          className="absolute top-1/3 right-5 hover:text-gray-700 text-gray-500 transition-all duration-150 text-xl cursor-pointer"
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => setShowPass(true)}
                          className="absolute top-1/3 right-5 hover:text-gray-700 text-gray-500 transition-all duration-150 text-xl cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-invms500 rounded-lg hover:bg-primary focus:outline-none focus:ring focus:ring-invms300 focus:ring-opacity-50"
              >
                {loading ? "Loading...." : "Sign up"}
              </button>

              <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                or sign in with
              </p>

              <div className="grid grid-cols-2 gap-5">
                <button className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <FcGoogle className="w-6 h-6 mx-2" />
                  <span className="mx-2">Google</span>
                </button>
                <button className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <FaFacebook className="w-6 h-6 mx-2 text-blue-600" />
                  <span className="mx-2">Facebook</span>
                </button>
              </div>

              <div className="mt-6 text-center ">
                <Link
                  href="/login"
                  className="text-sm text-invms800 hover:underline dark:text-invms600"
                >
                  Don’t have an account yet? Sign in
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RegisterMain;
