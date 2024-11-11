"use client";
import React, { useState, useEffect } from "react";
import LeftSidebarMain from "./globals/LeftSidebar/LeftSidebarMain";
import AuthHeader from "./layouts/AuthHeader";
import useNProgress from "./globals/N_Progress/useNProgress";
import NProgressStyles from "./globals/N_Progress/NProgressStyles";
import { getTokenUser } from "./config/token";
import Loading from "./globals/Loading/Loading";
import Cookies from "js-cookie";
import Providers from "./query/Providers";
import { UserAuth } from "./types/auth.types";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReduxProvider from "./ReduxProvider";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState<UserAuth | null>(null);

  // Use NProgress to show loading indicator for page transitions
  useNProgress();

  useEffect(() => {
    try {
      const user = getTokenUser();
      if (user) {
        setIsAuth({
          _id: user._id,
          email: user.email,
          access: user.access,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
      } else {
        Cookies.remove("accessToken");
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Token is not valid", error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider>
          <NProgressStyles />
          {isAuth ? (
            <main className="relative">
              <section className="flex justify-start items-start">
                <div className="hidden lg:block">
                  <LeftSidebarMain />
                </div>
                <div className="lg:ml-[250px] w-full">
                  <AuthHeader />
                  <div className="lg:px-5 px-3 py-3 min-h-screen h-full">
                    {children}
                  </div>
                </div>
              </section>
            </main>
          ) : (
            <>{children}</>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </ReduxProvider>
      </QueryClientProvider>
    </Providers>
  );
};

export default LayoutWrapper;
