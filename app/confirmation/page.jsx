"use client"
import { useEffect, useState } from 'react';
import { customFetch } from '@/app/customeFetch';
import { useAuthorization } from '@/app/(authorization)/useAuthorization';
import { useUser } from '../(context)/userContext';
import Link from 'next/link';
import { styles } from '../style';

export default function ConfirmOrder({params}) {
  const [pi, setPi] = useState("");
  const { user } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { custom } = customFetch();

  // Déclarer `urlParams` et `orderId` dans `useEffect` pour éviter l'accès à `window` côté serveur
  const [orderId, setOrderId] = useState(null);
  const auth = useAuthorization();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setOrderId(urlParams.get("id"));
    }
  }, []);

  const checkStatus = () => {
    setIsLoaded(true);
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentIntent = urlParams.get('payment_intent');
      const url = `${window.location.origin}/api/order/checkout/${paymentIntent}`;
      try {
        custom(url, {
          method: "GET",
          headers: auth,
        })
        .then(res => {
          setPi(res.status);
        });
      } catch (e) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    if (user && !isLoaded) {
      checkStatus();
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          CONFIRMATION
        </h1>
      </div>
      {(pi && !error) && (
        <div className='flex items-center flex-col w-[50%] m-auto justify-start'>
          <h1 className='text-[3rem] text-green-800'>Merci: Votre commande a bien été validée</h1>
          <p className='text-[2rem] text-green-800'>Votre numéro de commande est: {orderId}</p>
          <Link href="/" className={`${styles.btnPrimary}`}>Retourner à l'accueil</Link>
        </div>
      )}
      {error && (
        <div className='flex items-center flex-col w-[50%] m-auto justify-start'>
          <h1 className='text-[3rem] text-red-500'>Merci: Votre commande a bien été validée</h1>
          <Link href="/shop" className={`${styles.btnPrimary}`}>Retour au boutique</Link>
        </div>
      )}
    </div>
  );
}
