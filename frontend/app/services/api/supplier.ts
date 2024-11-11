import RestClient from "../RestClient";
import { SupplierCredentials } from "@/app/types/supplier.types";

// create a spacific supplier
export const createSupplier = async (
  credentials: SupplierCredentials
): Promise<String> => {
  const response = await RestClient.post(
    "supplier/createSupplier",
    credentials
  );
  return response;
};
// get all spacific supplier
export const getSuppliers = async (): Promise<SupplierCredentials[]> => {
  const response = await RestClient.get("supplier/getSuppliers");
  return response;
};
// get a spacific supplier
export const getASupplier = async (
  id: string
): Promise<SupplierCredentials> => {
  const response = await RestClient.get("supplier/getASupplier", { id });
  return response;
};
// update a spacific supplier
export const updateASupplier = async (
  data: SupplierCredentials,
  id: string
): Promise<String> => {
  const response = await RestClient.put("supplier/updateASupplier", id, data);
  return response;
};
// delete a spacific supplier
export const deleteSupplier = async (id: string): Promise<String> => {
  const response = await RestClient.delete("supplier/deleteSupplier", id);
  return response;
};
