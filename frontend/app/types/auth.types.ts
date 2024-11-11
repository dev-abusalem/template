export interface AuthProps {
  email: string;
  password: string;
}
export interface LoginCredentials {
  name?: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface GetMeCredentials {
  id: string;
}
export interface UserAuth {
  _id: string;
  email: string;
  access: string[];
  createdAt: string;
  updatedAt: string;
}
