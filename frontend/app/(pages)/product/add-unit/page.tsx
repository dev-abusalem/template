import AddUnitMain from '@/app/components/Product/Add_Unit/AddUnitMain'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Add Product Unit - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return (
   <>
    <AddUnitMain />
   </>
  )
}

export default page