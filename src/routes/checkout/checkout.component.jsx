import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className='checkout-header'>
        <span className="header-block">Product</span>
        <span className="header-block">Description</span>
        <span className="header-block">Quantity</span>
        <span className="header-block">Price</span>
        <span className="header-block">Remove</span>
      </div>
      {
        cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            cartItem={item} />))
      }
      <span className='total'>Total: ${total}</span>
    </div>
  );
};

export default Checkout;