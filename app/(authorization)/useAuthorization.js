"use client"
import Cookies from 'js-cookie';
import { useUser } from '../(context)/userContext';
import { useRouter } from 'next/navigation';

export const useAuthorization = () => {
    const router = useRouter();
     const {token} = useUser();
    const auth = { Authorization: `Bearer ${token}` }
    return auth;
};
