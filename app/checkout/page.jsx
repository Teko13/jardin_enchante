"use client"
import React, { useEffect, useState } from 'react';
import { customFetch } from '../customeFetch';
import { useAuthorization } from '../(authorization)/useAuthorization';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

export default function CartTable() {
  const [clientSecret, setClientSecret] = useState(null);
  const {custom} = customFetch();
  const stripePromiss = loadStripe("pk_test_51PEc3aGvSvbw4SQ69DJnJWSNIkXv0F2Q0RgLsJIzmrnJJ5BAEj6aXfUAPax6kqRilyAlDpcIkrjqZAp9Q8vx45Ka000MEw9xoU")
  const auth = useAuthorization();
  const getSecret = async () => {
    const url = `${window.location.origin}/api/order/checkout`;
    const secret = await custom(url, {
        method: "POST",
        headers: auth,
        body: {}
    });
    const json = await secret.json();
    console.log("le secret est", json.clientSecret);
    return json.clientSecret;
  };
  const appearance = {
    theme: "stripe"
  }
  const options = {
    appearance,
    clientSecret
  }
  useEffect(() => {
    if(typeof clientSecret !== "string") {
        setClientSecret(getSecret());
    }
  }, [])
  
  return (
    <div>
        {clientSecret && (
            <Elements options={options} stripe={stripePromiss}>
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' />
                    </div>
                </form>
            </Elements>
        )}
    </div>
  );
}
