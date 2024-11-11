import ProductListMain from '@/app/components/Product/Product_List/ProductListMain'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Product List - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return (
    <>
        <ProductListMain />
    </>
  )
}

export default page