"use client"
import React, { useState } from 'react'
import { styles } from '../style'
import { useUser } from '../(context)/userContext'
import { useRouter } from 'next/navigation';

export default function Login() {
    const {login, saveToken, cookiesName} = useUser();
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/api/login";
        const body = JSON.stringify({
            email,
            password
        })
        fetch(url, {
            method: "POST",
            body
        }).then((res) => {
            return res.json();
        })
        .then((res) => {
            login(res.user);
            saveToken(res.token, cookiesName);
            setEmail("");
            setPassword("");
            router.push("/");
        })
        .catch((e) => {
            setError(true);
        })
    }
  return (
    <div className='min-w-screen min-h-screen flex items-center justify-center'>
        <div className={`${styles.border} rounded-[2rem] w-[30%] flex flex-col items-center gap-10 p-4`}>
            <h1 className='text-[2rem] font-black'>Connexion</h1>
            {
                error && (
                    <span className='text-red text-[0.8rem] '>
                        Une erreur s'est produite, vérifié vos identifiants et mot de passe
                    </span>
                )
            }
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-[1.5rem] w-full'>
                <div className='flex flex-col items-start gap-1'>
                    <label htmlFor="email">Email</label>
                    <input
                     className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                     type="email"
                     value={email}
                     name="email"
                     id="email"
                     onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <label htmlFor="password">Email</label>
                    <input
                      className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`} type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password} />
                </div>
                <button type='submit' className={`${styles.btnPrimary} w-full my-[2rem]`}>Se Connecter</button>
            </form>
        </div>
    </div>
  )
}
