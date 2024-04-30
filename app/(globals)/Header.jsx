import Link from 'next/link'
import React from 'react'
import { styles } from '../style'
import Cart from './Cart'
import Favorite from './Favorite'

function Header() {
  return (
    <nav className='bg-white z-[99] grid grid-cols-[25%_50%_25%] p-3 items-center w-full fixed top-O left-0 right-0'>
        <div className="w-full flex items-center pl-2">
            <h1 className='text-[2rem] font-black'>
                Logo
            </h1>
        </div>
        <div className="w-full flex items-center justify-center">
            <ul className='flex gap-[1rem] items-center'>
                <li className='text-black hover:text-pink'>
                    <Link href="/">Accueil</Link>
                </li>
                <li className='text-black hover:text-pink'>
                    <Link href="/shop">Boutique</Link>
                </li>
                <li className='text-black hover:text-pink'>
                    <Link href="#">A propos</Link>
                </li>
                <li className='text-black hover:text-pink'>
                    <Link href="#">Contact</Link>
                </li>
            </ul>
        </div>
        <div className="w-full flex items-center gap-[2rem] justify-end">
            <Cart />
            <Favorite />
            <div className="flex items-center">
                <div className="flex items-center gap-[1rem]">
                    <Link href="/login" className={`${styles.btnPrimary}`} >Connecter</Link>
                <Link href="/login" className={`${styles.btnSecondary}`} >Inscrir</Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header