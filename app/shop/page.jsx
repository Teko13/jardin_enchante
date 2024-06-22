import React from 'react';
import { getFlowers } from '../(flower_manager)/flower_getter';
import {Flower} from '../Flower';
import Link from 'next/link';
import { styles } from '../style';

export default async function Page() {
    const flowers = await getFlowers();
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full lg:h-[50vh] h-[30vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          BOUTIQUE
        </h1>
      </div>

      <div className="flex justify-center my-[2rem] w-[70%]">
        <div className="flex flex-col gap-10 w-full items-center">
          <h1 className="font-black text-[3rem]">
            Tout nos produits
          </h1>
          <div className="grid gap-10 w-full lg:grid-cols-3 grid-cols-1 md:grid-cols-2">
            {flowers.map((flower, index) => (
              <Flower key={index} flower={flower} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
