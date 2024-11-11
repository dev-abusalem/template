import {
  ProductCategory,
  ProductCredentials,
  ProductUnit,
} from "@/app/types/product.types";
import RestClient from "../RestClient";

// create a new product
export const createProduct = async (
  data: ProductCredentials
): Promise<String> => {
  const response = await RestClient.post("product/createProduct", data);
  return response;
};
// get all products
export const getProducts = async (): Promise<ProductCredentials[]> => {
  const response = await RestClient.get("product/getProducts");
  return response;
};
// update a spacific product
export const updateProduct = async (
  data: ProductCredentials,
  id: string
): Promise<String> => {
  const response = await RestClient.put("product/updateProduct", id, data);
  return response;
};

// delete a spacific product
export const deleteProduct = async (id: string): Promise<String> => {
  const response = await RestClient.delete("product/deleteProduct", id);
  return response;
};
export const getProduct = async (id: string): Promise<ProductCredentials> => {
  const response = await RestClient.get(`product/getProduct/${id}`);
  return response;
};
//////////////////////////////////////////// Product Category ////////////////////////////////////////////////////////////////////
// create a new product category
export const createProductCategory = async (
  data: ProductCategory
): Promise<String> => {
  const response = await RestClient.post("product/createProductCategory", data);
  return response;
};
// get all product categories
export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await RestClient.get("product/getProductCategories");
  return response;
};
// update a spacific product category
export const updateProductCategory = async (
  data: ProductCategory,
  id: string
): Promise<String> => {
  const response = await RestClient.put(
    "product/updateProductCategory",
    id,
    data
  );
  return response;
};
// delete a spacific product category
export const deleteProductCategory = async (id: string): Promise<String> => {
  const response = await RestClient.delete("product/deleteProductCategory", id);
  return response;
};
export const getProductCategory = async (
  id: string
): Promise<ProductCategory> => {
  const response = await RestClient.get(`product/getProductCategory/${id}`);
  return response;
};
//////////////////////////////////////////// Product Unit ////////////////////////////////////////////////////////////////////
// create a new product unit
export const createProductUnit = async (data: ProductUnit): Promise<String> => {
  const response = await RestClient.post("product/createProductUnit", data);
  return response;
};
// get all products
export const getProductUnits = async (): Promise<ProductUnit[]> => {
  const response = await RestClient.get("product/getProductUnits");
  return response;
};
// delete a spacific product
export const deleteProductUnit = async (id: string): Promise<String> => {
  const response = await RestClient.delete("product/deleteProductUnit", id);
  return response;
};
// update a spacific product
export const updateProductUnit = async (
  data: ProductUnit,
  id: string
): Promise<String> => {
  const response = await RestClient.put("product/updateProductUnit", id, data);
  return response;
};
