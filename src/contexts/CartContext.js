import { createContext, useState, useContext } from "react";
import { CART_URL } from "../config/constants";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [productsInCart, setProductInCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [error, setError] = useState(null);

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

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const countTotalAmount = () => {
    const total = productsInCart.reduce((acc, element) => {
      return acc + element.quantity * element.price; // Akumulasi total
    }, 0); // Mulai akumulasi dari 0
    setTotalAmount(total);
  };

  const fetchCartData = async (token) => {
    await axios
      .get(CART_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const result = response.data;
        const data = result.data;
        if (result && data.length > 0) {
          const id = data[0]._id;
          setCartId(id);
          setCartItems(result.data);
          let totalAmount = 0;
          const products = data.flatMap((obj) => {
            return obj.items.map((item) => {
              // Hitung total sambil memetakan produk
              totalAmount += item.quantity * item.product.price;
              return {
                ...item.product,
                quantity: item.quantity,
                cartId: obj._id,
              };
            });
          });

          setProductInCart(products);
          setTotalAmount(totalAmount);
        } else {
          setCartItems([]);
          setProductInCart([]);
          setError("Failed to update cart: No items found in response");
        }
      })
      .catch((err) => {
        console.log("Error adding item to cart:", err);

        // More detailed error handling
        if (err.response) {
          // The request was made, but the server responded with an error
          setError(err.response.data.message || "An error occurred");
        } else if (err.request) {
          // The request was made, but no response was received
          setError("No response received from server");
        } else {
          // Something else went wrong
          setError(err.message);
        }
      });
  };

  const createItemToCart = async (item, token) => {
    try {
      const response = await axios.post(
        CART_URL,
        {
          items: [{ id: item.id, quantity: item.quantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;
      if (result && result.data && result.data.items) {
        console.log(result.data.items);
      } else {
        setError("Failed to update cart: No items found in response");
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);

      // More detailed error handling
      if (err.response) {
        // The request was made, but the server responded with an error
        setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
        // The request was made, but no response was received
        setError("No response received from server");
      } else {
        // Something else went wrong
        setError(err.message);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        productsInCart,
        totalAmount,
        countTotalAmount,
        fetchCartData,
        createItemToCart,
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
