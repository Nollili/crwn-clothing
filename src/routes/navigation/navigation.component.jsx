import { Outlet, Link } from 'react-router-dom';
import CrwnLogo from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx';
import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector.js';
import{selectIsCartOpen} from '../../store/cart/cart.selector.js';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<img src={CrwnLogo} alt='Logo' className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{ isCartOpen &&<CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
