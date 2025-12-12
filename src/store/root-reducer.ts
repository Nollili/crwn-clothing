import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';

/**
 * Combines the application's main reducers into a single root reducer.
 *
 * This root reducer is used to configure the Redux store and manage the overall state shape.
 * 
 * No explicit types are needed here because `combineReducers` infers the state shape
 * from the provided reducer functions. TypeScript will automatically infer the correct
 * types for the root state and dispatch based on the reducers passed in.
 */
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
