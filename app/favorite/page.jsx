"use client"
import React from 'react';
import {Flower} from '../Flower';
import { useUser } from '../(context)/userContext';

export default function Page() {
    const {likes} = useUser();
    console.log(likes);
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full lg:h-[50vh] h-[30vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          FAVORIS
        </h1>
      </div>

      <div className="flex justify-center my-[2rem] w-full">
        <div className="flex flex-col gap-10 w-[70%] items-center">
          <h1 className="font-black text-center text-[3rem]">
            Mes Favoris
          </h1>
          <div className="grid gap-10 w-full lg:grid-cols-3 grid-cols-1">
            {likes.map((flower, index) => {
              return <Flower key={index} flower={flower} />
}) || "..."}
          </div>
          <div className="flex w-full my-5 items-center justify-center">
          </div>
        </div>
      </div>
    </div>
  );
}
