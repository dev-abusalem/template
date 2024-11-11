export interface ProductCredentials {
  _id?: string;
  barcode: string;
  serialNumber: string;
  name: string;
  category: string;
  model?: string;
  unit: string;
  regularPrice?: number;
  salePrice: number;
  vatPercentage: number;
  supplier: string;
  details?: string;
  image?: File;
}
export interface ResponseProductType {
  _id: string;
  barcode: string;
  serialNumber: string;
  name: string;
  category: ProductCategory;
  model?: string;
  unit: ProductUnit;
  regularPrice?: number;
  salePrice: number;
  vatPercentage: number;
  supplier: string;
  details?: string;
  image?: File;
}
export interface ProductUnit {
  _id?: string;
  name: string;
  status: string;
}
export interface ProductCategory {
  _id?: string;
  name: string;
  status: string;
}
