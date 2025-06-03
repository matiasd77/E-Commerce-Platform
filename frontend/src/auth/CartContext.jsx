import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart as apiRemoveItemFromCart,
  clearCart as apiClearCart
} from '../api/cart';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend on mount
  useEffect(() => {
    fetchCart();
    // Optionally, add auth dependency if you want to refetch on login/logout
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCartItems(
        res.data.items
          ? Array.from(res.data.items).map(item => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              imageUrl: item.product.imageUrl,
              quantity: item.quantity,
              cartItemId: item.id // needed for update/remove
            }))
          : []
      );
    } catch (err) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await addItemToCart({ productId: product.id, quantity });
      await fetchCart();
    } catch (err) {
      // handle error (e.g. show toast)
    }
  };

  const removeFromCart = async (productId) => {
    // Find the cartItemId for this product
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
    try {
      await apiRemoveItemFromCart(item.cartItemId);
      await fetchCart();
    } catch (err) {
      // handle error
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();
      setCartItems([]);
    } catch (err) {
      // handle error
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
    try {
      await updateCartItemQuantity(item.cartItemId, item.quantity + 1);
      await fetchCart();
    } catch (err) {
      // handle error
    }
  };

  const decreaseQuantity = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item || item.quantity <= 1) return;
    try {
      await updateCartItemQuantity(item.cartItemId, item.quantity - 1);
      await fetchCart();
    } catch (err) {
      // handle error
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loading }}>
      {children}
    </CartContext.Provider>
  );
}; 