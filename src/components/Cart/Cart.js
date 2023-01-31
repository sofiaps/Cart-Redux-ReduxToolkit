import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Backdrop = (props) => (
  <div className={classes.backdrop} onClick={props.onClick}></div>
);
const Overlay = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={`${classes.cart} ${classes.modal}`}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length ? cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        )): 
        <span>Your cart is empty</span>}
      </ul>
    </Card>
  );
};

const CartModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay props={props} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default CartModal;
