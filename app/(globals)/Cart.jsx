"use client"
import React, { useState } from 'react'
import { shopIcon } from '../(assets)'
import Image from 'next/image'
import { useCart } from '../(context)/cartContext'
import Link from 'next/link'

function Cart() {
   const {items} = useCart();
  return (
    <Link href="/cart" className=' inline-block relative w-[2rem]'>
        <div className="w-full">
            <Image src={shopIcon} />
        </div>
        <div className="rounded-full p-1 bg-pink absolute top-[-50%] right-[-50%] text-white ">{items.length}</div>
    </Link>
  )
}

export default Cart