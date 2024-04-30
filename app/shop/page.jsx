import React from 'react';
import { getFlowers } from '../(flower_manager)/flower_getter';
import Flower from '../Flower';
import Link from 'next/link';
import { styles } from '../style';

export default async function Page() {
    const flowers = await getFlowers();
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          BOUTIQUE
        </h1>
      </div>

      <div className="flex justify-center my-[2rem]">
        <div className="flex flex-col gap-10 w-[70%] items-center">
          <h1 className="font-black text-[3rem]">
            Tout nos produits
          </h1>
          <div className="grid gap-10 w-full grid-cols-3">
            {flowers.map((flower, index) => (
              <Flower key={index} flower={flower} />
            ))}
          </div>
          <div className="flex w-full my-5 items-center justify-center">
            <Link href="/shop" className={`${styles.btnSecondary}`}>
              Voir Tout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
