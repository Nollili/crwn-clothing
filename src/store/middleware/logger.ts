import { Middleware, AnyAction } from 'redux';
import { RootState } from '../store';

// Define a logger middleware for Redux.
// Middleware has access to the store, the next dispatch function, and the action being dispatched.
export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // If the action does not have a type, pass it along without logging.
  if (!(action as AnyAction).type) {
    return next(action);
  }

  // Log the action type.
  console.log('type: ', (action as AnyAction).type);
  // Log the action payload.
  console.log('payload: ', (action as AnyAction).payload);
  // Log the current state before the action is processed.
  console.log('currentState: ', store.getState());

  // Pass the action to the next middleware or reducer.
  next(action);

  // Log the state after the action has been processed.
  console.log('next state: ', store.getState());
};
