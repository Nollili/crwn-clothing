import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import CrwnLogo from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context.jsx';
import './navigation.styles.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

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
