import React from 'react';
import UpdateForm from '../../UpdateForm';
import { getFlowersById } from '@/app/(flower_manager)/flower_getter';
export default async function Page({params}) {
  const [flower] = await getFlowersById([Number(params.id)]);
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          MODIFIER UN PRODUIT
        </h1>
      </div>

      <div className="flex justify-center my-[2rem] w-full">
        <div className="flex flex-col gap-10 w-full items-center">
          <h1 className="font-black text-[3rem]">
            Créer une fleur 
          </h1>
            <UpdateForm flower={flower} />
        </div>
      </div>
    </div>
  );
}
