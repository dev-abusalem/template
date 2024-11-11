// hooks/useProduct.ts

import {
  ProductCategory,
  ProductCredentials,
  ProductUnit,
} from "@/app/types/product.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  createProductCategory,
  createProductUnit,
  deleteProduct,
  deleteProductCategory,
  deleteProductUnit,
  getProduct,
  getProductCategories,
  getProductCategory,
  getProducts,
  getProductUnits,
  updateProduct,
  updateProductCategory,
  updateProductUnit,
} from "../api/product";

// hook for create a new product
export const useCreateProduct = () => {
  return useMutation<String, Error, ProductCredentials>({
    mutationFn: (product) => createProduct(product),
  });
};
// hook for update a get all products
export const useGetProducts = () => {
  return useQuery<ProductCredentials[], Error>({
    queryKey: ["invms_products"],
    queryFn: getProducts,
  });
};
// hook for update a spacific product
export const useUpdateProduct = () => {
  return useMutation<String, Error, { data: ProductCredentials; id: string }>({
    mutationFn: ({ data, id }) => updateProduct(data, id),
  });
};
// hook for delete a spacific product
export const useDeleteProduct = () => {
  return useMutation<String, Error, string>({
    mutationFn: (id) => deleteProduct(id),
  });
};
export const useGetProduct = (id: string) => {
  return useQuery<ProductCredentials, Error>({
    queryKey: ["product", id],
    queryFn: ({ queryKey }) => {
      const [, productId] = queryKey;
      return getProduct(productId as string);
    },
  });
};
///////////////////////////////////// Product Unit /////////////////////////////////////
// hook for create a new product
export const useCreateProductCategory = () => {
  return useMutation<String, Error, ProductCategory>({
    mutationFn: (data) => createProductCategory(data),
  });
};
// hook for update a get all products
export const useGetProductCategories = () => {
  return useQuery<ProductCategory[], Error>({
    queryKey: ["invms_product_categories"],
    queryFn: getProductCategories,
  });
};
// hook for delete a spacific product
export const useDeleteProductCategory = () => {
  return useMutation<String, Error, string>({
    mutationFn: (id) => deleteProductCategory(id),
  });
};
// hook for update a spacific product
export const useUpdateProductCategory = () => {
  return useMutation<String, Error, { data: ProductCategory; id: string }>({
    mutationFn: ({ data, id }) => updateProductCategory(data, id),
  });
};
export const useGetProductCategory = (id: string) => {
  return useQuery<ProductCategory, Error>({
    queryKey: ["product_category", id],
    queryFn: ({ queryKey }) => {
      const [, categoryId] = queryKey;
      return getProductCategory(categoryId as string);
    },
  });
};

///////////////////////////////////// Product Unit /////////////////////////////////////
// hook for create a new product
export const useCreateProductUnit = () => {
  return useMutation<String, Error, ProductUnit>({
    mutationFn: (unit) => createProductUnit(unit),
  });
};
// hook for update a get all products
export const useGetProductUnits = () => {
  return useQuery<ProductUnit[], Error>({
    queryKey: ["invms_product_units"],
    queryFn: getProductUnits,
  });
};
// delete a spacific product
export const useDeleteProductUnit = () => {
  return useMutation<String, Error, string>({
    mutationFn: (id) => deleteProductUnit(id),
  });
};
// hook for update a spacific product
export const useUpdateProductUnit = () => {
  return useMutation<String, Error, { data: ProductUnit; id: string }>({
    mutationFn: ({ data, id }) => updateProductUnit(data, id),
  });
};
