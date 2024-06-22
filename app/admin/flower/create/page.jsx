import React, from 'react';
import Form from '../Form';

export default async function Page() {
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full lg:h-[50vh] h-[30vh] p-5 bg-black items-center justify-center">
        <h1 className='text-white lg:text-[4rem] text-center text-[2rem] font-black'>
          CREER UN NOUVEAU PRODUIT
        </h1>
      </div>

      <div className="flex justify-center my-[2rem] w-full">
        <div className="flex flex-col gap-10 w-full items-center">
          <h1 className="font-black text-[3rem]">
            Créer une fleur 
          </h1>
            <Form />
        </div>
      </div>
    </div>
  );
}
