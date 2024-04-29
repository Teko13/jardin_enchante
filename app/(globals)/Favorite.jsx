import React from 'react'
import { favoriteIcon } from '../(assets)'
import Image from 'next/image'
function Favorite() {
  return (
    <button className='relative w-[3rem]'>
        <div className="w-full">
            <Image src={favoriteIcon} />
        </div>
        <div className="rounded-full p-1 bg-pink absolute top-[-50%] right-[-50%] text-white ">O</div>
    </button>
  )
}

export default Favorite