import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  data: {
    _id: string;
    email: string;
    role: string;
    access: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export const getToken = () => {
  const token = Cookies.get("accessToken");
  if (!token) return null;
  try {
    const decode = jwtDecode<CustomJwtPayload>(token);
    if (decode) {
      return token;
    } else {
      Cookies.remove("accessToken");
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getTokenUser = () => {
  const token = Cookies.get("accessToken");
  if (!token) return null;

  try {
    const decode = jwtDecode<CustomJwtPayload>(token);
    if (!decode || !decode.data) {
      Cookies.remove("accessToken");
      return null;
    }

    return decode.data;
  } catch (error) {
    Cookies.remove("accessToken");
    return null;
  }
};
