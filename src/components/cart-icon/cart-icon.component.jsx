import "./cart-icon.styles.scss";
import cartIcon from "../../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <img src={cartIcon} alt="Cart Icon" className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
