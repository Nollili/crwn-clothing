import { RootState } from '../store';
import { UserState } from './user.reducer';

/**
 * Selector function to retrieve the current user from the Redux store.
 * Selectors are pure functions that take the Redux state as an argument
 * and return a specific piece of data from that state.
 *
 * @param state The entire RootState of the Redux store.
 * @returns The currentUser object, typed as UserState['currentUser'].
 */
export const selectCurrentUser = (state: RootState): UserState['currentUser'] => state.user.currentUser;
