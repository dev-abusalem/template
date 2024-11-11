"use client";
import React, { useEffect } from "react";
import {
  useCreateCustomer,
  useGetACustomer,
  useUpdateACustomer,
} from "@/app/services/hooks/useCustomer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import { SubmitButton, UploadButton } from "@/app/globals/Buttons/AllButtons";
import { customerFormSchema } from "../../../types/schema/customer.schema";
import Loading from "@/app/globals/Loading/Loading";
import {
  useGetProduct,
  useGetProductCategories,
  useGetProductUnits,
  useUpdateProduct,
} from "@/app/services/hooks/useProduct";
import { productFormSchema } from "@/app/types/schema/product.schema";
import FormTextarea from "@/app/libs/FormFields/FormTextarea";
import FormSelect from "@/app/libs/FormFields/FormSelect";
import FormInput from "@/app/libs/FormFields/FormInput";
import { productInputs } from "./product_inputs";
import { productVat } from "@/app/constant/app";
import { useGetSuppliers } from "@/app/services/hooks/useSupplier";
import FormImage from "@/app/libs/FormFields/FormImage";
import Image from "next/image";

interface EditProductId {
  productId: string;
}

const EditProductForm = ({ productId }: EditProductId) => {
  const [uploadImage, setUploadImage] = React.useState<string>("");
  const { data, isLoading } = useGetProduct(productId);
  const { data: units } = useGetProductUnits();
  const { data: categories } = useGetProductCategories();
  const { data: supplier } = useGetSuppliers();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      barcode: "",
      serialNumber: "",
      name: "",
      category: "",
      model: "",
      unit: "",
      regularPrice: 0,
      salePrice: 0,
      vatPercentage: 0,
      supplier: "",
      details: "",
      image: "",
    },
  });

  // Use reset to populate the form when data is fetched
  useEffect(() => {
    if (data) {
      form.reset({
        barcode: data.barcode || "",
        serialNumber: data.serialNumber || "",
        name: data.name || "",
        category: data.category || "",
        model: data.model || "",
        unit: data.unit || "",
        regularPrice: data.regularPrice || 0,
        salePrice: data.salePrice || 0,
        vatPercentage: data.vatPercentage || 0,
        supplier: data.supplier || "",
        details: data.details || "",
        image: data.image || "",
      });
    }
  }, [data, form]);

  // Submit handler
  const { mutate: updateAProduct, isPending } = useUpdateProduct();

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    updateAProduct(
      { data: values, id: productId },
      {
        onSuccess: () => {
          Success({ message: "Product updated successfully!" });
          setTimeout(() => {
            window?.location?.reload();
          }, 2000);
        },
        onError: (error) => {
          console.log(error);
          Failed({
            message: "Product update failed!",
          });
        },
      }
    );
  };

  return (
    <div>
      <div className="mt-2 mb-6 px-4">
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold">
            Update Information
          </h2>
          {isLoading ? (
            <Loading />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 grid sm:grid-cols-2 gap-6"
              >
                <FormInput
                  form={form}
                  name="serialNumber"
                  label="Serial Number (SL)"
                  placeholder="Enter your barcode"
                  disabled={true}
                  value={data?.serialNumber}
                />
                <FormInput
                  form={form}
                  name="barcode"
                  label="Barcode/QR-code"
                  placeholder="Enter your barcode"
                  defaultValue={data?.barcode}
                />
                <FormInput
                  form={form}
                  name="name"
                  label="Product Name"
                  placeholder="Enter product name"
                  defaultValue={data?.name}
                />
                <FormInput
                  form={form}
                  name="model"
                  label="Product Model"
                  placeholder="Enter product model"
                  defaultValue={data?.model}
                />
                <FormInput
                  form={form}
                  name="regularPrice"
                  label="Regular Price"
                  placeholder="Enter product regular price"
                  defaultValue={data?.regularPrice}
                  type="number"
                />
                <FormInput
                  form={form}
                  name="salePrice"
                  label="Sale Price"
                  placeholder="Enter product sale price"
                  defaultValue={data?.salePrice}
                  type="number"
                />
                <FormSelect
                  form={form}
                  name="vatPercentage"
                  label="Product VAT %"
                  data={productVat || []}
                  defaultSelect={data?.vatPercentage}
                />
                <FormSelect
                  form={form}
                  name="category"
                  label="Category"
                  data={categories || []}
                  defaultSelect={data?.category}
                />
                <FormSelect
                  form={form}
                  name="unit"
                  label="Unit"
                  data={units || []}
                  defaultSelect={data?.unit}
                />

                <FormSelect
                  form={form}
                  name="supplier"
                  label="Supplier"
                  data={supplier || []}
                  defaultSelect={data?.supplier}
                />
                <FormTextarea
                  form={form}
                  name="details"
                  label="Details"
                  placeholder="Enter your note"
                  defaultValue={data?.details}
                />
                <div className="flex justify-between items-start gap-3">
                  <div className="col-span-1 flex flex-col justify-between items-start gap-y-3">
                    <FormLabel>Product Image</FormLabel>
                    <UploadButton
                      className=" uploadthing_image_custom_design"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].appUrl);
                        setUploadImage(res[0].appUrl);
                        Success({ message: "Image uploaded successfully!" });
                      }}
                      onUploadError={(error: Error) => {
                        Failed({ message: `ERROR! ${error.message}` });
                      }}
                    />
                  </div>
                  {data?.image || uploadImage ? (
                    <Image
                      src={(data?.image as any) || uploadImage}
                      width={100}
                      height={100}
                      alt="Product Image"
                      className="w-[100px] h-[100px] object-cover"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <SubmitButton disabled={isPending ? true : false}>
                    Update Product Info
                  </SubmitButton>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
