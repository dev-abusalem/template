"use client";
import React from "react";
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
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/app/services/hooks/useAuth";
import Image from "next/image";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
// all schemas
const formSchema = z.object({
  email: z.string().email({
    message: "You must need to use vaild email",
  }),
  password: z.string().min(4, {
    message: "Password more then 4 characters.",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const { mutate: loginUser, isPending } = useLogin();
  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    loginUser(values, {
      onSuccess: (data) => {
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("refreshToken", data.refreshToken);
        Success({ message: data.message || "Login successfull !" });
        setTimeout(() => {
          window?.location?.replace("/");
        }, 3000);
      },
      onError: (error) => {
        console.log(error);
        Failed({ message: "Login failed. Please try again." });
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
              LOGIN
            </h1>

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
                        type="password"
                        className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-invms300 focus:ring-invms300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Enter your password"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={isPending && true}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-invms500 rounded-lg hover:bg-primary focus:outline-none focus:ring focus:ring-invms300 focus:ring-opacity-50"
              >
                {isPending ? "Loading...." : "Sign in"}
              </button>

              <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                or sign in with
              </p>

              <div className="grid grid-cols-2 gap-5">
                <button
                  type="button"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "http://localhost:3000/",
                      error: "http://localhost:3000",
                    })
                  }
                  className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
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
                  href="/register"
                  className="text-sm text-invms800 hover:underline dark:text-invms600"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
