import UnitListMain from '@/app/components/Product/Unit_List/UnitListMain'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Product Unit List - INVMS",
  description: "Investment Management Software",
};

const page = () => {
  return (
    <>
      <UnitListMain />
    </>
  )
}

export default page