"use client";
import { useParams } from "next/navigation";
import React from "react";
import EditProductForm from "./EditProductForm";

const EditProductMain = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  return (
    <>
      <EditProductForm productId={productId} />
    </>
  );
};

export default EditProductMain;
