import React from 'react'
import { shopIcon } from '../(assets)'
import Image from 'next/image'

function Cart() {
  return (
    <button className='relative w-[3rem]'>
        <div className="w-full">
            <Image src={shopIcon} />
        </div>
        <div className="rounded-full p-1 bg-pink absolute top-[-50%] right-[-50%] text-white ">O</div>
    </button>
  )
}

export default Cart