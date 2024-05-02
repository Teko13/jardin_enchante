"use client"
import React, { useEffect, useState } from 'react'
import { favoriteIcon } from '../(assets)'
import Image from 'next/image'
import { useUser } from '../(context)/userContext'
import { useAuthorization } from '../(authorization)/useAuthorization';
import Link from 'next/link'
function Favorite() {
    const {user, handleUserLikes, likes, setLikes} = useUser();
    const auth = useAuthorization();
    const getUserLikes = () => {
        const url = 'http://localhost:3000/api/favorite';
        const headers = auth;
        fetch(url, {
            next: {
                revalidate: 0
            },
            headers
        }).then(res => res.json())
        .then((res) => {
            setLikes(res);
        })
    }
    useEffect(() => {
      getUserLikes();
    }, [handleUserLikes, user])
    
  return (
    <Link href="/cart" className=' inline-block relative w-[3rem]'>
        <div className="w-full">
            <Image src={favoriteIcon} />
        </div>
        <div className="rounded-full p-1 bg-pink absolute top-[-50%] right-[-50%] text-white ">{likes.length}</div>
    </Link>
  )
}

export default Favorite