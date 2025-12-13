import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.reducer';
import { UserData } from './store/user/user.types';

const App = () => {
  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  useEffect(() => {
    // Set up a listener for authentication state changes (login/logout)
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // If a user is authenticated, create or update their document in Firestore
        createUserDocumentFromAuth(user);
      }
      // Pick only the accessToken and email from the user object, if user exists
      const pickedUser =
        user && (({ accessToken, email }) => ({ accessToken, email }))(user as any);

      // Dispatch the setCurrentUser action to update the Redux store with the user data
      dispatch(setCurrentUser(pickedUser as unknown as UserData));
    });

    // Cleanup: unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
