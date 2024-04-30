"use client"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const { createContext, useState, useContext, useEffect } = require("react");

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    //login user likes
    const [likes, setLikes] = useState([]);
    const cookiesName = "flower-token";
    // handleUserLikes to make action an action(s) if user like some flower
    const [handleUserLikes, setHandleUserLikes] = useState(false);
    const router = useRouter

    const login = (data) => {
        setUser(data);
    }

    const saveToken = (token, name) => {
        Cookies.set(name, token, {expires: 7, path: ""});
    } 

    const logout = () => {
        setUser(null);
    }
    // if token is set but user is null, set user with token user data
    const init = () => {
        const checkToken = Cookies.get(cookiesName);
        if(!user && checkToken) {
            const url = "http://localhost:3000/api/user";
            const auth = { Authorization: `Bearer ${checkToken}` }
            return fetch(url, {
                next: {
                    revalidate: 0
                },
                headers: auth
            })
            .then(res => res.json())
            .then((res) => {
                setUser(res);
                setLikes(res.like)
            })
            .catch((e) => {
                router.push("/login")
            })
        }
    }
    useEffect( () => {
      init();
    }, [])
    
    return (
        <UserContext.Provider value={{login, logout, user, likes, cookiesName, setLikes, saveToken, handleUserLikes, setHandleUserLikes}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);