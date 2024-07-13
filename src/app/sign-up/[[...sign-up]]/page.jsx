import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function Page (){
  return (
    <div className="w-full flex justify-center items-center">
    <SignUp
      appearance={{
        elements:{
          formButtonPrimary:"bg-[#282F30]"
        }
      }}
    />
  </div>
  )
}
