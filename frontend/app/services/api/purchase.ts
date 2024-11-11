import { PurchaseMainTypes } from "@/app/types/purchase.types";
import RestClient from "../RestClient";

// create a spacific customer
export const createPurchase = async (
  credentials: PurchaseMainTypes
): Promise<String> => {
  const response = await RestClient.post(
    "purchase/createPurchase",
    credentials
  );
  return response;
};
// get all purchase
export const getPurchases = async (): Promise<PurchaseMainTypes[]> => {
  const response = await RestClient.get("purchase/getPurchases");
  return response;
};
// update a spacific purchase
export const updatePurchase = async (
  data: PurchaseMainTypes,
  id: string
): Promise<String> => {
  const response = await RestClient.put("purchase/updatePurchase", id, data);
  return response;
};

// delete a spacific purchase
export const deletePurchase = async (id: string): Promise<String> => {
  const response = await RestClient.delete("purchase/deletePurchase", id);
  return response;
};
export const getPurchase = async (id: string): Promise<PurchaseMainTypes> => {
  const response = await RestClient.get(`purchase/getPurchase/${id}`);
  return response;
};
