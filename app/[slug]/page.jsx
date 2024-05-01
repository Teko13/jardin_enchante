import React from 'react'
import { getFlower } from '../(flower_manager)/flower_getter'
import { FlowerDetail } from '../Flower';

export default async function page({params}) {
  const flower = await getFlower(params.slug);
  return (
    <div className='flex flex-col w-full items-center min-h-[100vh] justify-center'>
        <FlowerDetail flower={flower} />
    </div>
  )
}
