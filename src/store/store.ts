// import { compose, createStore, applyMiddleware } from 'redux';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// Defines the type for the entire Redux state by inferring it from the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Sets up an array of middleware.
// The logger middleware is conditionally added only in development environment.
// The .filter() method removes any falsy values (like `false` when not in development).
const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// Configuration for redux-persist.
const persistConfig = {
  key: 'root', // The key to use for storing the state in storage
  storage, // The storage engine to use (local storage in this case)
  blacklist: ['user'], // Reducers whose state should NOT be persisted (e.g., 'user' state)
};

// Creates a persisted reducer by wrapping the rootReducer with persistReducer.
// This allows the Redux state to be saved and rehydrated from storage.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configures the Redux store using Redux Toolkit's configureStore.
export const store = configureStore({
  reducer: persistedReducer, // Uses the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializable check for non-serializable values (e.g., Redux-persist actions)
    }).concat(middleWares), // Concatenates custom middleware (like logger) with default middleware
});

// Creates a persistor object from the store.
// This object is used to rehydrate and persist the Redux state.
export const persistor = persistStore(store);
