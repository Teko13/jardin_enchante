"use client"
import { useEffect, useState } from 'react';
import getStripe from './stripe'; // Assurez-vous d'importer getStripe du nouveau fichier
import { Elements } from '@stripe/react-stripe-js';
import { customFetch } from '../customeFetch';
import { useAuthorization } from '../(authorization)/useAuthorization';

export default function CartTable() {
  const [clientSecret, setClientSecret] = useState("");
  const {custom} = customFetch();
  const auth = useAuthorization();

  const getSecret = async () => {
    const url = `${window.location.origin}/api/order/checkout`;
    const secret = await custom(url, {
        method: "POST",
        headers: auth,
        body: {}
    });
    return secret.clientSecret;
  };
  let loaded = false;
  useEffect(() => {
    if(!clientSecret && !loaded) {
        loaded = true;
      getSecret()
      .then(res => {
          setClientSecret(res);
          console.log("secret = ", res);
      })
    }
  }, [])

  const stripePromise = getStripe(); // Utilisez getStripe au lieu de loadStripe directement

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="flex w-full h-[50vh] bg-black items-center justify-center">
        <h1 className='text-white text-[4rem] font-black'>
          VOTRE COMMANDE
        </h1>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <form className="" id="form">
				<div id="target" className=""></div>
				<button id="submit" type="submit" className="">
					<div id="button-text" className="">Obtenir</div>
					<div id="spinner" className=""></div>
				</button>
			</form>
			<div id="payment-message"></div>
        </Elements>
      )}
    </div>
  );
}
