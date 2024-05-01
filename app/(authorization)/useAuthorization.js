"use client"
import Cookies from 'js-cookie';
import { useUser } from '../(context)/userContext';
import { useRouter } from 'next/navigation';

export const useAuthorization = () => {
    const router = useRouter();
    const { cookiesName, login, user } = useUser();
    const token = Cookies.get(cookiesName);

    if (!token) {
        router.push('/login');
        return
    }
    const auth = { Authorization: `Bearer ${token}` }
    return auth;
};
