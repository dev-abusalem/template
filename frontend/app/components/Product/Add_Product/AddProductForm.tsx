"use client";
import React, { useState } from "react";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { productFormSchema } from "../../../types/schema/product.schema";
import FormInput from "@/app/libs/FormFields/FormInput";
import { SubmitButton, UploadButton } from "@/app/globals/Buttons/AllButtons";
import FormSelect from "@/app/libs/FormFields/FormSelect";
import FormTextarea from "@/app/libs/FormFields/FormTextarea";
import {
  useCreateProduct,
  useGetProductCategories,
  useGetProductUnits,
} from "@/app/services/hooks/useProduct";
import { productInputs, slNum } from "./product_inputs";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import ShortUniqueId from "short-unique-id";
import { productVat } from "@/app/constant/app";
import Image from "next/image";
const AddProductForm = () => {
  const sortId = new ShortUniqueId({ length: 10 });

  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const { data: units } = useGetProductUnits();
  const { data: categories } = useGetProductCategories();
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      barcode: "",
      serialNumber: slNum,
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

  // 2. Define a submit handler.
  const { mutate: createProduct, isPending } = useCreateProduct();
  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    console.log(sortId);
    createProduct(values, {
      onSuccess: (data) => {
        console.log(data);
        Success({ message: "Product created successfully!" });
        setTimeout(() => {
          window?.location?.reload();
        }, 2000);
      },
      onError: (error) => {
        console.log(error);
        const err = "Error";
        Failed({
          message: err || "Product registration failed !",
        });
      },
    });
  };

  return (
    <div>
      <div className="mt-2 mb-6 px-4">
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold">
            Prodcut Information
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 grid sm:grid-cols-2 gap-6 justify-start items-center"
            >
              {productInputs.map((input, index) => (
                <FormInput
                  key={index}
                  form={form}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  value={input.value}
                  disabled={input.disabled}
                />
              ))}
              <FormSelect
                form={form}
                name="vatPercentage"
                label="Product VAT %"
                data={productVat || []}
              />
              <FormSelect
                form={form}
                name="category"
                label="Category"
                data={categories || []}
              />
              <FormSelect
                form={form}
                name="unit"
                label="Unit"
                data={units || []}
              />

              <FormSelect
                form={form}
                name="supplier"
                label="Supplier"
                data={[]}
              />
              <FormTextarea
                form={form}
                name="details"
                label="Note"
                placeholder="Enter your note"
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
                {uploadImage ? (
                  <Image
                    src={uploadImage}
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
                  Create Product
                </SubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
