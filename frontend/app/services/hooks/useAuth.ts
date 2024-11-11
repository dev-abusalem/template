// src/hooks/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDashboard, getMe, login, register } from "../api/auth";
import Cookies from "js-cookie";
import {
  LoginResponse,
  LoginCredentials,
  GetMeCredentials,
  UserAuth,
} from "@/app/types/auth.types";
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  });
};

export const useRegister = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => register(credentials),
  });
};
export const useGetMe = () => {
  return useMutation<UserAuth, Error, GetMeCredentials>({
    mutationFn: (credentials: GetMeCredentials) => getMe(credentials),
  });
};

export const useGetDashboard = () => {
  return useQuery<any[], Error>({
    queryKey: ["invms_dashboard"],
    queryFn: getDashboard,
  });
};
