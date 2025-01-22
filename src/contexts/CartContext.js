import { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartCheckoutItems, setCartCheckoutItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Add item to the cart
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartCheckoutItems,
        cartItems,
        setCartCheckoutItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
