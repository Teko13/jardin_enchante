"use client"
import React, { useEffect } from 'react'
import { useCart } from '../(context)/cartContext'
import { useRouter } from 'next/navigation';

export default function page() {
    const {clearCart, items} = useCart();
    const router = useRouter();
    const pi = new URLSearchParams(window.location.search).get("payment_intent");
    useEffect(() => {
      if(pi) {
        if(items.length > 0) {
            clearCart();
            console.log("ok");
        }
      }
      else {
        router.back();
      }
    }, [items]);
    useEffect(() => {
      if(items.length === 0) {
        //router.push(`${window.location.origin}/confirmation?payment_intent=${pi}`)
      }
    }, [items]);
    
    
  return (
    <div>...</div>
  )
}
