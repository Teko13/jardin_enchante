"use client"
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import Image from 'next/image'
import { favoriteIcon, pinkFavorite } from './(assets)'
import { useUser } from './(context)/userContext'
import { useAuthorization } from './(authorization)/useAuthorization'

function Flower({flower}) {
  const [likes, setLike] = useState(flower.like.length);
  const [isLiked, setIsLiked] = useState(false);
  const [flowerLikes, setFlowerLikes] = useState(flower.like);
  const {user, handleUserLikes, setHandleUserLikes} = useUser();
  const auth = useAuthorization();
  // check if login user like this flower
  const checkLike = () => {
    if(!user) {
        return false;
    }
    const check = flowerLikes.some((likeItem) => (
        likeItem.userId === user.id
    ));
    return check;
  }
  const handleLike = async () => {
    const url = "http://localhost:3000/api/favorite/" + flower.id;
    const newLikes = await fetch(url, {
        next: {
            revalidate: 0
        },
        headers: auth
    });
    const json = await newLikes.json();
    setLike(json.length);
    setFlowerLikes(json);
    setHandleUserLikes(!handleUserLikes);
  }
  useEffect(() => {
    if(checkLike()) {
        setIsLiked(true);
    } else {
        setIsLiked(false);
    }
  }, [flowerLikes, user])
  
  return (
    <div className={`${styles.border} p-3 rounded-lg relative bg-light-white shadow-custom w-full`}>
        <span className="absolute inline-block p-2 bg-red font-black text-white text-[1.4rem] top-0 left-0">
            {flower.price/100} €
        </span>
        <button onClick={() => handleLike()} className="absolute cursor-pointer inline-flex gap-2 top-2 right-2 ">
           <Image src={(isLiked && pinkFavorite) || favoriteIcon} width={20} height={20} alt='icone favorie' /> ({likes})
        </button>
        <div className="flex w-full flex-col items-center gap-4">
            <div className="flex items-center w-full overflow-hidden rounded-lg">
                <img src={flower.image_url} alt='image du fleure' />
            </div>
            <div className='text-[1.8rem] font-black'>
                {flower.name}
            </div>
            <button className={`${styles.btnPrimary} w-full`}>Voir les détails</button>
        </div>
    </div>
  )
}

export default Flower