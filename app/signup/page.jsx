"use client"
import React, { useState } from 'react'
import { styles } from '../style'
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${window.location.origin}/api/signup`;
        const body = JSON.stringify({
            first_name,
            last_name,
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
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            router.push("/login");
        })
        .catch((e) => {
            setError(true);
        })
    }
  return (
    <div className='min-w-screen min-h-screen flex items-center justify-center'>
        <div className={`${styles.border} rounded-[2rem] lg:w-[30%] w-[80%] md:w-[40%] flex flex-col items-center gap-10 p-4`}>
            <h1 className='text-[2rem] font-black'>Inscription</h1>
            {
                error && (
                    <span className='text-red text-[0.8rem] '>
                        Une erreur s'est produite, vérifié vos identifiants et mot de passe
                    </span>
                )
            }
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-[1.5rem] w-full'>
                <div className='flex flex-col items-start gap-1'>
                    <label htmlFor="last_name">Nom</label>
                    <input
                     className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                     type="text"
                     value={last_name}
                     name="last_name"
                     id="last_name"
                     onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <label htmlFor="first_name">Prénom</label>
                    <input
                     className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                     type="text"
                     value={first_name}
                     name="first_name"
                     id="first_name"
                     onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <label htmlFor="email">Email</label>
                    <input
                     className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`}
                     type="email"
                     value={email}
                     name="email"
                     id="email"
                     onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <label htmlFor="password">Mot de Passe</label>
                    <input
                      className={`${styles.border} bg-white inline-block p-1 w-full focus:border-pink rounded-lg`} type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password} required />
                </div>
                <button type='submit' className={`${styles.btnPrimary} w-full my-[2rem]`}>S'inscrir</button>
            </form>
        </div>
    </div>
  )
}
