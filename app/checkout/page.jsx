"use client"
import { useEffect, useState } from 'react';
import getStripe from './stripe'; // Assurez-vous d'importer getStripe du nouveau fichier
import { Elements } from '@stripe/react-stripe-js';
import { customFetch } from '../customeFetch';
import { useAuthorization } from '../(authorization)/useAuthorization';
import CheckoutForm from './CheckoutForm';
import { useCart } from '../(context)/cartContext';

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const {custom} = customFetch();
  const {items, clearCart,} = useCart();
  const auth = useAuthorization();

  const getSecret = async () => {
    const url = `${window.location.origin}/api/order/checkout`;
    const secret = await custom(url, {
        method: "POST",
        headers: auth,
        body: JSON.stringify(items)
    });
    return {secret: secret.clientSecret, amount: secret.amount};
  };
  let loaded = false;
  useEffect(() => {
    if(!clientSecret && !loaded && (items.length > 0)) {
        loaded = true;
      getSecret()
      .then(res => {
          setClientSecret(res.secret);
          setTotalAmount(res.amount);
      })
    }
  }, [items])

  const stripePromise = getStripe(); // Utilisez getStripe au lieu de loadStripe directement

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className='flex flex-col items-center gap-10 w-full'>
      <div className="flex w-full lg:h-[50vh] h-[30vh] bg-black items-center justify-center">
        <h2 className='text-white text-[4rem] font-black'>
          PAIEMENT
        </h2>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <h1 className='text-[2rem] font-black'>Information de paiement</h1>
          <p className="p-3 bg-red lg:max-w-[40%] max-w-[90%] rounded-[1rem] text-white flexmy-6">
            Attention : Ne saisissez pas vos informations bancaires réelles.
            Ceci est un démo. Pour effectuer des tests,
             vous pouvez accéder à des cartes de crédit de test sur le site officiel de Stripe en cliquant <a className='font-black' target="_blank" href="https://docs.stripe.com/testing?locale=fr-FR">ICI</a>.
          </p>
          <CheckoutForm totalAmount={totalAmount} clearCart={clearCart} />
        </Elements>
      )}
    </div>
  );
}
