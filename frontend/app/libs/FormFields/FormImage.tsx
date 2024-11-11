"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CldImage } from "next-cloudinary";
import axios from "axios";

interface FormImageProps {
  form: any;
  name: string;
  label?: string;
}

const FormImage = ({ form, name, label }: FormImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Image preview
  const [uploading, setUploading] = useState(false); // Upload status
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Final image URL

  // Handle file change (preview image and upload)
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show image preview
    setPreviewUrl(URL.createObjectURL(file));

    // Upload image to Cloudinary via API
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(response.data.url); // Set Cloudinary image URL
      form.setValue(name, response.data.url); // Update form field with URL
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              <label className="text-gray-800 text-sm block mb-2">
                {label}
              </label>
            </FormLabel>
          )}

          <FormControl>
            <>
              <div className="relative flex items-center mt-4">
                <input
                  {...field}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  className="w-full rounded-md py-2.5 font-semibold px-4 border border-gray-300 text-sm outline-primary"
                  onChange={handleImageChange}
                />
              </div>
              {previewUrl && (
                <div className="mt-4">
                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    className="h-16  object-cover p-1 border-invms600 border"
                  />
                </div>
              )}
              {uploading && (
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              )}
              {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Uploaded Image URL:</p>
                  <CldImage
                    src={imageUrl}
                    alt="Uploaded Image"
                    width="100"
                    height="100"
                  />
                </div>
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormImage;
