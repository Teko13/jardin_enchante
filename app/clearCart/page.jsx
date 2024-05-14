"use client"
import React, { useEffect, useState } from 'react'
import { useCart } from '../(context)/cartContext'
import { useRouter } from 'next/navigation';
import { useUser } from '../(context)/userContext';
import { customFetch } from '../customeFetch';
import { useAuthorization } from '../(authorization)/useAuthorization';

export default function page() {
    const {user} = useUser();
    const {custom} = customFetch();
    const {setItems, items} = useCart();
    const auth = useAuthorization();
    const router = useRouter();
    let [isLoaded, setIsLoaded] = useState(false);
    const init = () => {
        console.log(isLoaded);
        if(!isLoaded) {
            setIsLoaded(true);
            try {
                const url = `${window.location.origin}/api/order`;
                const data = items.map(item => ({flowerId: item.id, quantity: item.quantity}))
                const body = JSON.stringify(data);
                custom(url, {
                    method: "POST",
                    headers: auth,
                    body
                })
                .then(res => {
                    const pi = new URLSearchParams(window.location.search).get("payment_intent");
                    localStorage.clear();
                    setItems([]);
                    router.push(`${window.location.origin}/confirmation?payment_intent=${pi}&id=${res.id}`) 
                })
            } catch (e) {
                router.back();
        }    }
    }

    useEffect(() => {
      if(user && !isLoaded) {
        init();
      }
    }, [user])
    
  return (
    <div>...</div>
  )
}
