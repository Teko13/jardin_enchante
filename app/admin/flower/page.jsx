import React from 'react';
import { getFlowers } from '@/app/(flower_manager)/flower_getter';
import { FlowerAdminView } from '@/app/Flower';

export default async function Page() {
    const flowers = await getFlowers();
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          TOUT LES FLEURS PUBLIÉS 
        </h1>
      </div>

      <div className="flex justify-center my-[2rem] w-[70%]">
        <div className="flex flex-col gap-10 w-full items-center">
          <h1 className="font-black text-[3rem]">
            Tout les fleurs
          </h1>
          <div className="grid gap-10 w-full grid-cols-3">
            {flowers.map((flower, index) => (
              <FlowerAdminView key={index} flower={flower} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
