"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import Cart from './Cart';
import Favorite from './Favorite';
import Auth from './Auth';
import AdminNavbar from '../admin/AdminNavbar';

function Header() {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [])
  
  return (
    <nav className='w-full z-[99] fixed top-0 left-0 right-0'>
      {windowWidth > 768 ? <LgHeader /> : <MobilHeader />}
      <AdminNavbar />
    </nav>
  );
}

const LgHeader = () => {
  return (
    <div className='bg-white grid grid-cols-[30%_50%_25%] p-3 items-center w-full'>
      <div className="w-full flex items-center pl-2">
        <h1 className='text-[2rem] font-black'>
          Le Jardin Enchanté
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
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="w-full flex items-center gap-[2rem] justify-end">
        <Cart />
        <Favorite />
        <div className="flex items-center">
          <Auth />
        </div>
      </div>
    </div>
  );
}

const MobilHeader = () => {
  const [menu, toggleMenu] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between w-full bg-white">
        <h1 className='text-[2rem] font-black'>
          Le Jardin Enchanté
        </h1>
        <button onClick={() => toggleMenu(!menu)}> 
          {menu ? "X" : <CiMenuBurger />}
        </button>
      </div>
      {menu && (
        <ul className='flex flex-col bg-black items-center'>
          <li className='text-white hover:text-pink p-[1rem]'>
            <Link href="/">Accueil</Link>
          </li>
          <li className='text-white hover:text-pink p-[1rem]'>
            <Link href="/shop">Boutique</Link>
          </li>
          <li className='text-white hover:text-pink p-[1rem]'>
            <Link href="/contact">Contact</Link>
          </li>
          <li className='text-white hover:text-pink p-[1rem]'>
            <Auth />
          </li>
        </ul>
      )}
      <div className='bottom-0 grid grid-cols-2 w-full fixed bg-white border-black border-solid border-[3px]'>
        <div className="flex justify-center py-[1rem] w-full">
          <Cart />
        </div>
        <div className="flex justify-center py-[1rem] w-full">
          <Favorite />
        </div>
      </div>
    </>
  );
}

export default Header;
