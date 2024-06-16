"use client"
import React from 'react'
import { useUser } from '../(context)/userContext';
import Link from 'next/link';
import { styles } from '../style';

export default function Auth() {
    const {user, logout} = useUser();
    return (
        <>
            {!user && (
                <div className="flex items-center gap-[1rem]">
                    <Link href="/login" className={`${styles.btnPrimary}`}>Connexion</Link>
                    <Link href="/signup" className={`${styles.btnSecondary}`}>Inscription</Link>
                </div>
            ) || (
                <div className="flex items-center gap-[1rem]">
                    <Link href="/profile" className="p-3 cursor-pointer rounded-full bg-black text-white font-black">
                        {`${user.first_name.charAt(0).toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`}
                    </Link>
                    <button onClick={() => logout()} className={`${styles.btnPrimary}`}>
                        Déconnexion
                    </button>
                </div>
            )}
        </>
    );
}
