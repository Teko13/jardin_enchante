"use client"
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import Image from 'next/image';
import { favoriteIcon, pinkFavorite } from './(assets)'
import Link from 'next/link'
import useFlower from './(flower_manager)/useFlower'
import { useRouter } from 'next/navigation'
import { useCart } from './(context)/cartContext'
import { useAuthorization } from './(authorization)/useAuthorization'
import { customFetch } from './customeFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Flower({flower}) {
  const { flowerLikes, isLiked, handleLike } = useFlower(flower);
  return (
    <div className={`${styles.border} p-3 rounded-lg relative bg-light-white shadow-custom w-full`}>
        <span className="absolute inline-block p-2 bg-red font-black text-white text-[1.4rem] top-0 left-0">
            {flower.price/100} €
        </span>
        <button onClick={() => handleLike()} className="absolute cursor-pointer inline-flex gap-2 top-2 right-2 ">
           <Image src={(isLiked && pinkFavorite) || favoriteIcon} width={20} height={20} alt='icone favorie' /> ({flowerLikes.length})
        </button>
        <div className="flex w-full flex-col items-center gap-4">
            <div className="flex overflow-hidden rounded-lg h-[35rem] bg-red">
                <img src={flower.image_url} alt='image du fleure' />
            </div>
            <div className='text-[1.8rem] font-black'>
                {flower.name}
            </div>
            <Link href={flower.slug} className={`${styles.btnPrimary} w-full`}>Voir les détails</Link>
        </div>
    </div>
  )
}

export function FlowerDetail({ flower }) {
  const router = useRouter();
  const { flowerLikes, isLiked, handleLike } = useFlower(flower);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddFlower = () => {
    addItem(flower.id, quantity);
    toast.success("Votre article a bien été ajouté");
  }

  return (
    <div className="flex flex-col lg:w-[30%] w-[80%] md:w-[40%] my-[8rem]">
      <div className="flex flex-col gap-5 items-center">
        <h1 className=' text-[3rem] font-black'>{flower.name}</h1>
        <div className={`${styles.border} rounded-[1rem] overflow-hidden flex flex-col gap-[2rem] items-center p-7`}>
          <div className=' relative p-3 w-full'>
            <button onClick={() => handleLike()} className="absolute cursor-pointer inline-flex gap-2 top-2 left-2 ">
              <Image src={(isLiked && pinkFavorite) || favoriteIcon} width={20} height={20} alt='icone favorie' /> ({flowerLikes.length})
            </button>
            <button onClick={() => router.back()} className='absolute cursor-pointer inline-flex gap-2 -top-4 text-[1.8rem] right-2'>
              X
            </button>
          </div>
          <div className="w-[55%]">
            <img src={flower.image_url} alt="image de la fleur" />
          </div>
          <h2 className='text-[2rem]'>
            {flower.price / 100} €
          </h2>
          <p className='text-center'>
            {flower.description}
          </p>
          <div className="flex flex-col gap-3 my-2 items-start w-full">
            <label htmlFor="qty">Quantité</label>
            <input onChange={(e) => setQuantity(e.target.value)} type="number" id="qty" defaultValue="1" min="1" max="100" className={`${styles.border} inline-block w-full p-3 text-[1.2] rounded-lg`} />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <button onClick={() => handleAddFlower()} className={`${styles.btnPrimary} inline-block w-full`}>Ajouter au panier</button>
            <Link href="/cart" className={`${styles.btnSecondary} inline-block w-full`}>Acheter</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FlowerAdminView({flower}) {
  const { flowerLikes, isLiked, handleLike } = useFlower(flower);
  const auth = useAuthorization();
  const url = `${window.location.origin}/api/admin/flower/${flower.id}`; 
  const {custom} = customFetch();
  const handleDelete = () => {
    custom(url, {
        method: "DELETE",
        headers: auth
    }).then(() => {window.location.reload()})
  }
  return (
    <div className={`${styles.border} p-3 rounded-lg relative bg-light-white shadow-custom w-full`}>
        <span className="absolute inline-block p-2 bg-red font-black text-white text-[1.4rem] top-0 left-0">
            {flower.price/100} €
        </span>
        <button onClick={() => handleLike()} className="absolute cursor-pointer inline-flex gap-2 top-2 right-2 ">
           <Image src={(isLiked && pinkFavorite) || favoriteIcon} width={20} height={20} alt='icone favorie' /> ({flowerLikes.length})
        </button>
        <div className="flex w-full flex-col items-center gap-4">
            <div className="flex overflow-hidden rounded-lg h-[35rem] bg-red">
                <img src={flower.image_url} alt='image du fleure' />
            </div>
            <div className='text-[1.8rem] font-black'>
                {flower.name}
            </div>
            <Link href={`${window.location.origin}/admin/flower/update/${flower.id}`} className={`${styles.btnPrimary} w-full`}>Modifier</Link>
            <button onClick={() => handleDelete()} className={`${styles.btnWarning} w-full`}>Supprimer</button>
        </div>
    </div>
  )
}