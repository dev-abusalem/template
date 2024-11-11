import AddCategoryMain from '@/app/components/Product/Add_Category/AddCategoryMain'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Add Product Category - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return (
    <>
      <AddCategoryMain />
    </>
  )
}

export default page