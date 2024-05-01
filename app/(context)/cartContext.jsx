"use client"
const { useContext, createContext, useState, useEffect } = require("react");

const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [items, setItems] = useState([]);
    const localStorageName = "le-jardin-enchante-storage";
    const init = () => {
        const localItems = localStorage.getItem(localStorageName);
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
        if(quantity < 1) {
            quantity = 1;
        }
        const checkExistingIndex = items.findIndex(current => current.id === id);
        const item = {id, quantity};
        if(Number.isInteger(checkExistingIndex) && checkExistingIndex >= 0 ) {
            const updateItems = items;
            updateItems[checkExistingIndex].quantity = quantity;
            setItems(updateItems);
            return;
        }
        setItems(prevItems => [...prevItems, item]);
    }
    const saveToLocalStorage = () => {
        localStorage.setItem(localStorageName, JSON.stringify(items));
    }
    useEffect(() => {
      init();
    }, []);
    useEffect(() => {
      if(items.length > 0) {
        saveToLocalStorage();
      }
    }, [items]);
    return (
        <CartContext.Provider value={{items, setItems, addItem}}>
            {children}
        </CartContext.Provider>
    )
    
}

export const useCart = () => useContext(CartContext);