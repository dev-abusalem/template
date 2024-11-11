import { CustomerCredentials } from "@/app/types/customer.types";
import RestClient from "../RestClient";

// create a spacific customer
export const createCustomer = async (
  credentials: CustomerCredentials
): Promise<String> => {
  const response = await RestClient.post(
    "customer/createCustomer",
    credentials
  );
  return response;
};
// get all spacific customer
export const getCustomers = async (): Promise<CustomerCredentials[]> => {
  const response = await RestClient.get("customer/getCustomers");
  return response;
};
// get a spacific customer
export const getACustomer = async (
  id: string
): Promise<CustomerCredentials> => {
  const response = await RestClient.get("customer/getACustomer", { id });
  return response;
};
// update a spacific customer
export const updateACustomer = async (
  data: CustomerCredentials,
  id: string
): Promise<String> => {
  const response = await RestClient.put("customer/updateACustomer", id, data);
  return response;
};
// delete a spacific product
export const deleteCustomer = async (id: string): Promise<String> => {
  const response = await RestClient.delete("customer/deleteCustomer", id);
  return response;
};
