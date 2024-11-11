import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });
export const slNum = uid.stamp(16).toUpperCase();
export const productInputs = [
  {
    name: "serialNumber",
    type: "text",
    label: "Serial Number (SL)",
    placeholder: "Enter your barcode",
    disabled: true,
    value: slNum,
  },
  {
    name: "barcode",
    type: "text",
    label: "Barcode/QR-code",
    placeholder: "Enter your barcode",
  },
  {
    name: "name",
    type: "text",
    label: "Product Name",
    placeholder: "Enter your product name",
  },
  {
    name: "model",
    type: "text",
    label: "Brand",
    placeholder: "Enter your brand name",
  },
  {
    name: "regularPrice",
    type: "number",
    label: "Regular Price",
    placeholder: "0.00",
  },
  {
    name: "salePrice",
    type: "number",
    label: "Sale Price",
    placeholder: "0.00",
  },
];
