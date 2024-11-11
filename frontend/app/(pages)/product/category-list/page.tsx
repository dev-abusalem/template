import CategoryListMain from '@/app/components/Product/Category_List/CategoryListMain'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Product Category List - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return (
    <>
      <CategoryListMain />
    </>
  )
}

export default page