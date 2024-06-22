"use client"
import React from 'react'
import CartTable from './CartTable';

export default function page() {
  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="flex w-full lg:h-[50vh] h-[30vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          VOTRE PANIER
        </h1>
      </div>

      <div className="lg:w-[50%] w-[90%] flex justify-center mb-[3rem]">
        <CartTable />
      </div>
    </div>
  );
}
