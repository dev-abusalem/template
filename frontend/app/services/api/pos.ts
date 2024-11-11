import { PosSaleProps } from "@/app/types/pos-sale.types";
import RestClient from "../RestClient";

// create a spacific pos sale
export const createPOSSale = async (
  credentials: PosSaleProps
): Promise<String> => {
  const response = await RestClient.post("pos/createPOSSale", credentials);
  return response;
};
