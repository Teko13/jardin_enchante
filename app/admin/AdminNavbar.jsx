"use client"
import React from 'react'
import { useUser } from '../(context)/userContext'
import Link from 'next/link';

export default function AdminNavbar() {
  const {user} = useUser();
  return (
    <>
        {
            (user && user.role === "admin") && (
                <div className="bg-black w-full p-2">
                    <ul className='flex items-center justify-center gap-[3rem] text-white'>
                        <li>
                            <Link href="/admin/flower/create">Créer un produit</Link>
                        </li>
                        <li>
                            <Link href="/admin/flower">Tout les produit</Link>
                        </li>
                    </ul>
                </div>
            )
        }
    </>
  )
}
