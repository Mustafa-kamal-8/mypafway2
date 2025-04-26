"use client";

import useStore from "../hooks/useStore";

const Stores = () => {
  const [cartItems, setCartItems] = useStore<any[]>("cartItems", []);

  // Remove an item from cart by ID
  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Update quantity of an item in cart
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return;

    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Add item to cart with quantity
  const addToCart = (product: any) => {
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      // If product exists, update quantity
      const updatedCart = [...cartItems];
      const existingItem = updatedCart[existingItemIndex];
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 1) + 1,
      };
      setCartItems(updatedCart);
    } else {
      // If product doesn't exist, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Save item for later (new function)
  const saveForLater = (productId: number) => {
    // This is a placeholder function that could be implemented
    // to move items to a saved items list
    console.log("Save for later:", productId);
  };

  return {
    cartItems,
    setCartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToCart,
    saveForLater,
  };
};

export default Stores;
