"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const Announcebar = () => {

   const [hideAnnouncebar , setHideAnnouncebar] = useState<boolean>(true)

  return (
    <div className={`relative transition-all ease-in-out duration-200 ${hideAnnouncebar ? "h-[45px] visible":"h-0 invisible opacity-0"} flex justify-start items-center shadow px-3 border-invms700 border rounded bg-invms100 text-invms700`}>
      <p className='pr-5'>Welcome Back <strong>Admin</strong> User</p>
      <IoMdClose onClick={()=>setHideAnnouncebar(false)} className={` ${hideAnnouncebar ?"":"invisible"} absolute right-3 text-invms700 cursor-pointer w-5 h-5`} />
    </div>
  )
}

export default Announcebar