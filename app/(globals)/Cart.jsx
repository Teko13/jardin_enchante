"use client"
import React, { useState } from 'react'
import { shopIcon } from '../(assets)'
import Image from 'next/image'
import { useCart } from '../(context)/cartContext'

function Cart() {
   const {items} = useCart();
  return (
    <button className='relative w-[3rem]'>
        <div className="w-full">
            <Image src={shopIcon} />
        </div>
        <div className="rounded-full p-1 bg-pink absolute top-[-50%] right-[-50%] text-white ">{items.length}</div>
    </button>
  )
}

export default Cart