"use client"
import { useEffect, useState } from 'react';
import { customFetch } from '@/app/customeFetch';
import { useAuthorization } from '@/app/(authorization)/useAuthorization';

export default function ConfirmOrder({params}) {
  const [pi, setPi] = useState("");
  const [error, setError] = useState(false);
  const {custom} = customFetch();
  const auth = useAuthorization();
  const checkStatus = () => {
    const params = new URLSearchParams(window.location.search);
    const paymentIntent = params.get('payment_intent');
    //console.log(paramValue);
    const url = `${window.location.origin}/api/order/checkout/${paymentIntent}`;
    try {
        custom(url, {
          method: "GET",
          headers: auth,
        })
        .then(res => {
          setPi(res.status);
        })
    } catch (e) {
        setError(true);
    }
  }
  let isLoaded = false;
  useEffect(() => {
    if(pi.length === 0 && !isLoaded) {
        isLoaded = true;
        checkStatus();
    }
  }, []);
  

  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          CONFIRMATION
        </h1>
      </div>
      {(pi && !error) && (
        <div>
            merci commande confirmé
        </div>
      )}
      {
        error && (
            <div>
                Une erreur s'est produit
            </div>
        )
      }
    </div>
  );
}
