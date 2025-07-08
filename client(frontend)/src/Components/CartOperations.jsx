import { createContext, useContext, useState, useEffect } from "react";

console.log("CartProvider loaded");

const CartOperations = createContext();

export function CartProvider({children}){
    // const [cartItems, setCartItems] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});

    useEffect(() => {
      console.log("🧺 CART STATE:", cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (car) => {
      console.log("🟢 Adding to cart:", car);

      setCartItems((prev) => {
        const carExists = prev.find((item) => item.id === car.id);
        const updated = carExists ? prev : [...prev, car];
        console.log("🟢 Updated Cart:", updated);
        return updated;
      });
    };

    const removeItemFromCart = (id) => {
        setCartItems((prev) => {
            const newCart = [];

            for(let i=0; i<prev.length; i++){
                if(prev[i].id !== id){
                    newCart.push(prev[i]);
                }
            }
            return newCart;
        });
    };

    return(
        <CartOperations.Provider value={{cartItems, addToCart, removeItemFromCart}}>{children}</CartOperations.Provider>
    )
}

export const useCart = () =>useContext(CartOperations);