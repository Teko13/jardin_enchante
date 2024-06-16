"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../(context)/userContext';
import { styles } from '../style';

export default function Page() {
    const {user} = useUser();
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          {user?.first_name || "..."}
        </h1>
      </div>
      <div className="flex flex-col gap-5 w-[50%]">
        <div className="flex flex-col gap-3">
            <h2 className='text-white bg-black font-black mb-4 text-[2rem] p-4 w-full flex justify-center '>
                Mon Profil
            </h2>
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-4">
                    <div className='flex gap-[3rem] items-center'>
                        <span>Nom: </span>
                        <span>{user?.last_name || "..."}</span>
                    </div>
                    <div className='flex gap-[3rem] items-center'>
                        <span>Prénom: </span>
                        <span>{user?.last_name || "..."}</span>
                    </div>
                    <div className='flex gap-[3rem] items-center'>
                        <span>Email: </span>
                        <span>{user?.email || "..."}</span>
                    </div>
                </div>
                <div className="flex  items-center gap-3">
                    <Link href="/" className={`${styles.btnSecondary}`}>E</Link>
                    <Link href="/" className={`${styles.btnWarning}`}>D</Link>
                </div>
            </div>
        </div>
      </div>
</div>
  );
}
