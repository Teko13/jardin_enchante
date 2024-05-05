"use client"
import React from 'react';
import {Flower} from '../Flower';
import { useUser } from '../(context)/userContext';

export default function Page() {
    const {user} = useUser();
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          FAVORIS
        </h1>
      </div>

      <div className="flex justify-center my-[2rem]">
        <div className="flex flex-col gap-10 w-[70%] items-center">
          <h1 className="font-black text-center text-[3rem]">
            Mes Favoris
          </h1>
          <div className="grid gap-10 w-full grid-cols-3">
            {user?.like.map((flower, index) => {
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
