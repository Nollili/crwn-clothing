import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CartState } from './cart.reducer';

// Selects the entire 'cart' slice from the RootState.
const selectCartReducer = (state: RootState): CartState => state.cart;

// Creates a memoized selector to get the 'isCartOpen' boolean from the cart state.
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// Creates a memoized selector to get the 'cartItems' array from the cart state.
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// Creates a memoized selector to calculate the total price of all items in the cart.
// It depends on 'selectCartItems' to get the current list of items.
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

// Creates a memoized selector to calculate the total number of items (quantity) in the cart.
// It depends on 'selectCartItems' to get the current list of items.
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
