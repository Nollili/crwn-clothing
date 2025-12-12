import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cart.types';
import { CategoryItem } from '../categories/category.types';

/**
 * Helper function to add a product to the cart.
 * If the product already exists in the cart, its quantity is incremented.
 * Otherwise, the product is added as a new item with a quantity of 1.
 * @param cartItems The current array of cart items.
 * @param productToAdd The product (CategoryItem) to add to the cart.
 * @returns A new array of cart items with the product added or quantity updated.
 */
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  // Check if the product already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If the item exists, map through the cart items and increment its quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increment quantity
        : cartItem
    );
  }

  // If the item does not exist, add it to the cart with a quantity of 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

/**
 * Helper function to remove or decrease the quantity of a cart item.
 * If the item's quantity is 1, it's completely removed from the cart.
 * Otherwise, its quantity is decremented by 1.
 * @param cartItems The current array of cart items.
 * @param cartItemToRemove The cart item to remove or decrease quantity.
 * @returns A new array of cart items after removal or quantity decrement.
 */
const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  // Find the cart item to remove or decrease quantity
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // If the existing item's quantity is 1, filter it out of the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // Otherwise, map through the cart items and decrement the quantity of the matching item
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 } // Decrement quantity
      : cartItem
  );
};

/**
 * Helper function to completely clear an item from the cart, regardless of its quantity.
 * @param cartItems The current array of cart items.
 * @param cartItemToClear The cart item to completely remove.
 * @returns A new array of cart items with the specified item removed.
 */
const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id); // Filter out the item to clear

// Define the shape of the cart state
export type CartState = {
  readonly isCartOpen: boolean; // Indicates if the cart dropdown is open
  readonly cartItems: CartItem[]; // Array of items currently in the cart
};

// Define the initial state for the cart
const CART_INITIAL_STATE: CartState = {
  isCartOpen: false, // Cart is closed by default
  cartItems: [],     // Cart is empty by default
};

// Create the cart slice using Redux Toolkit's createSlice
export const cartSlice = createSlice({
  name: 'cart', // Name of the slice, used as a prefix for generated action types
  initialState: CART_INITIAL_STATE, // The initial state for this slice
  reducers: {
    /**
     * Reducer to toggle or set the cart's open/closed state.
     * @param state The current cart state.
     * @param action PayloadAction<boolean> containing the new `isCartOpen` value.
     */
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload; // Directly mutate state thanks to Immer
    },
    /**
     * Reducer to add an item to the cart.
     * Uses the `addCartItem` helper function to manage cart items.
     * @param state The current cart state.
     * @param action PayloadAction<CategoryItem> containing the product to add.
     */
    addItemToCart(state, action: PayloadAction<CategoryItem>) {
      state.cartItems = addCartItem(state.cartItems, action.payload); // Update cartItems
    },
    /**
     * Reducer to remove an item from the cart or decrease its quantity.
     * Uses the `removeCartItem` helper function.
     * @param state The current cart state.
     * @param action PayloadAction<CartItem> containing the item to remove/decrease.
     */
    removeItemFromCart(state, action: PayloadAction<CartItem>) {
      state.cartItems = removeCartItem(state.cartItems, action.payload); // Update cartItems
    },
    /**
     * Reducer to completely clear a specific item from the cart.
     * Uses the `clearCartItem` helper function.
     * @param state The current cart state.
     * @param action PayloadAction<CartItem> containing the item to clear.
     */
    clearItemFromCart(state, action: PayloadAction<CartItem>) {
      state.cartItems = clearCartItem(state.cartItems, action.payload); // Update cartItems
    },
  },
});

// Destructure and export the action creators generated by createSlice
export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

// Export the reducer function generated by createSlice
export const cartReducer = cartSlice.reducer;
