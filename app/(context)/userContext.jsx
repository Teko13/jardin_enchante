"use client"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { customFetch } from "../customeFetch";

const { createContext, useState, useContext, useEffect } = require("react");

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    //login user likes
    const [likes, setLikes] = useState([]);
    const cookiesName = "flower-token";
    const {custom} = customFetch();
    const [token, setToken] = useState(Cookies.get(cookiesName));
    // handleUserLikes to make action an action(s) if user like some flower
    const [handleUserLikes, setHandleUserLikes] = useState(false);
    const router = useRouter();

    const login = (data) => {
        setUser(data);
    }

    const saveToken = (token, name) => {
        setToken(token);
        Cookies.set(name, token, {expires: 7, path: ""});
    } 

    const logout = () => {
        setUser(null);
        Cookies.remove(cookiesName);
        router.push("/");
    }
    const init = () => {
        if(!user) {
            const url = "http://localhost:3000/api/user";
            const auth = { Authorization: `Bearer ${token}` }
            return custom(url, {
                next: {
                    revalidate: 0
                },
                headers: auth
            })
            .then((res) => {
                setUser(res);
                setLikes(res.like)
            })
            .catch((e) => {
                router.push("login");
            })
        }
    }
    useEffect( () => {
      if(token) {
        init();
      }
    }, [token])
    
    return (
        <UserContext.Provider value={{login, logout, user, likes, cookiesName, setLikes, saveToken, handleUserLikes, setHandleUserLikes, token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);