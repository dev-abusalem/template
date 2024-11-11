import AddProductMain from '@/app/components/Product/Add_Product/AddProductMain'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Add Product - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return (
   <>
    <AddProductMain />
   </>
  )
}

export default page