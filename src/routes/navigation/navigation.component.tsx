import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import CrwnLogo from "../../assets/crown.svg";
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      {/* Main navigation container */}
      <NavigationContainer>
      {/* Logo links to the home page */}
      <LogoContainer to='/'>
        <img src={CrwnLogo} alt="Crown Logo" className='logo' />
      </LogoContainer>
      {/* Navigation links */}
      <NavLinks>
        {/* Link to the shop page */}
        <NavLink to='/shop'>SHOP</NavLink>

        {/* Show SIGN OUT if user is logged in, otherwise show SIGN IN */}
        {currentUser ? (
        <NavLink to='/auth' as='span' onClick={signOutUser}>
          SIGN OUT
        </NavLink>
        ) : (
        <NavLink to='/auth'>SIGN IN</NavLink>
        )}
        {/* Cart icon component */}
        <CartIcon />
      </NavLinks>
      {/* Show cart dropdown if cart is open */}
      {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      {/* Render child routes */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
