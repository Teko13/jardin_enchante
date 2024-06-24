"use client"
import React, { useState } from 'react'
import { styles } from '../style'
import { useUser } from '../(context)/userContext'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const {login, saveToken, cookiesName} = useUser();
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${window.location.origin}/api/login`;
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
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        })
        .catch((e) => {
            console.log(e.message);
            setError(true);
        })
    }
  return (
    <div className='min-w-screen min-h-screen flex items-center justify-center'>
        <div className={`${styles.border} rounded-[2rem] lg:w-[30%] w-[80%] md:w-[40%] flex flex-col items-center gap-10 p-4`}>
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
                    <label htmlFor="password">Mot de passe</label>
                    <input
                      className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`} type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password} />
                </div>
                <button type='submit' className={`${styles.btnPrimary} w-full my-[2rem]`}>Se Connecter</button>
                <Link href="/signup" className="text-pink underline" >Ou créer un compte</Link>
            </form>
        </div>
    </div>
  )
}
