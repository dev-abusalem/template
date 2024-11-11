import Login from '@/app/components/Login/Login'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Login - INVMS",
  description: "Investment Management Software",
};


const page = () => {
  return (
    <>
        <Login />
    </>
  )
}

export default page