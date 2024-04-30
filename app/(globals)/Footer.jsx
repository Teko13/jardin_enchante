import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='w-full'>
        <div className='w-full grid grid-cols-3 items-center p-5 bg-black text-white'>
        <div className="flex flex-col gap-4 items-center">
            <h3 className='text-[2rem] font-bold'>Lien rapide</h3>
            <ul className='flex flex-col gap-3'>
                <li>
                    <Link href="/">Accueil</Link>
                </li>
                <li>
                    <Link href="/shop">Boutique</Link>
                </li>
                <li>
                    <Link href="/about">A propos</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </div>

        <div className="flex flex-col gap-4 items-center">
            <h3 className='text-[2rem] font-bold'>Contact</h3>
            <ul className='flex flex-col gap-3'>
                <li>
                    <a href="mailto:tekofabricefolly@gmail.com">le-jardin-enchante.contact@gmail.com</a>
                </li>
                <li>
                    <a href="tel:+33745178805">+33745178805</a>
                </li>
            </ul>
        </div>

        <div className="flex flex-col gap-4 items-center">
            <h3 className='text-[2rem] font-bold'>Contact</h3>
            <ul className='flex flex-col gap-3'>
                <li>
                    <a href="https://twitter.com">Twitter</a>
                </li>
                <li>
                    <a href="https://tiktok.com">Tiktok</a>
                </li>
            </ul>
        </div>
    </div>
    <div className='w-full bg-[#000000] flex items-center justify-center text-white text-[1.3rem]'>Powered by @Teko_Fabrice</div>
    </footer>
  )
}

export default Footer