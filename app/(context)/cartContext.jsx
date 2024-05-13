"use client"

import { useRouter } from "next/navigation";
import { useUser } from "./userContext";

const { useContext, createContext, useState, useEffect } = require("react");

const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [localStorageName, setLocalStorageName] = useState(null);
    const {user} = useUser();
    const init = () => {
        setLocalStorageName(`le-jardin-enchante-storage_${user.email}`)
        const localItems = localStorage.getItem(`le-jardin-enchante-storage_${user.email}`);
        if(localItems) {
            try {
                const itemsArray = JSON.parse(localItems);
                if(Array.isArray(itemsArray)) {
                    setItems(itemsArray);
                }
            } catch (error) {
                localStorage.setItem(localStorageName, "[]");
            }
        }
    }
    const addItem = (id, quantity) => {
        if(user) {
            if(quantity < 1) {
                quantity = 1;
            }
            const checkExistingIndex = items.findIndex(current => current.id === id);
            const item = {id, quantity};
            if(Number.isInteger(checkExistingIndex) && checkExistingIndex >= 0 ) {
                // create new array with item's value, (NO SIMPLY REFERENCE BUT NEW ARRAY);
                const updateItems = [...items];
                updateItems[checkExistingIndex].quantity = Number(quantity);
                setItems(updateItems);
                return;
            }
            setItems(prevItems => [...prevItems, item]);
        }
        else {
            router.push("/login")
        }
    }
    const saveToLocalStorage = () => {
        localStorage.setItem(localStorageName, JSON.stringify(items));
    }
    const clearCart = () => {
        localStorage.setItem(localStorageName, JSON.stringify([]));
        setItems([]);
    }
    useEffect(() => {
      if(user) {
        init();
      }
      else {
        setItems([]);
        setLocalStorageName(null);
      }
    }, [user]);
    useEffect(() => {
      if(items.length > 0) {
        saveToLocalStorage();
      }
    }, [items]);
    return (
        <CartContext.Provider value={{items, setItems, addItem, clearCart}}>
            {children}
        </CartContext.Provider>
    )
    
}

export const useCart = () => useContext(CartContext);