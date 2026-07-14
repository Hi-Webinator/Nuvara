import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteFromCart, clearCart } from "../Redux/Api/cartsApi";

import { FaTrashAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import Button from "../components/Button";
import usePageMeta from "../utils/usePageMeta";
import { activate } from "../utils/interactive";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  usePageMeta({
    title: "Cart",
    description: "Review the items in your Nuvara shopping cart before checkout.",
  });

  const percontageToSubstract = 2.5;

  const subtotal = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const total = subtotal + percontageToSubstract;

  const handleDeleteFromCart = (product) => {
    dispatch(deleteFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-title d-flex justify-content-between align-items-center mt-4 mb-4 mt-lg-5 mb-lg-5">
          <h5 className="fw-bold mb-0">Your Cart</h5>
          <div className={cart.length === 0 ? "d-none" : ""}>
            <Button title="Clear All" funct={handleClearCart} />
          </div>
        </div>

        {cart.map((product) => {
          return (
            <div key={product.id} className="card mb-4">
              <div className="card-body p-3 p-lg-4">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="card-body-col col-img mb-2 mb-lg-0">
                    <img src={product.image} alt={product.title} />
                    <span
                      className="del"
                      aria-label={`Remove ${product.title} from cart`}
                      {...activate(() => handleDeleteFromCart(product))}
                    >
                      <FaXmark color="white" />
                    </span>
                  </div>

                  <div className="card-body-col col-title text-center text-lg-start mb-2 mb-lg-0">
                    <p className="lead fw-normal mb-0">{product.title}</p>
                  </div>

                  <div className="card-body-col offset-lg-1 mb-2 mb-lg-0">
                    <h6 className="mb-0">${product.price}</h6>
                  </div>

                  <div className="card-body-col mb-2 mb-lg-0">
                    <h6 className="mb-0">{product.quantity}</h6>
                  </div>

                  <div className="card-body-col offset-lg-1 mb-2 mb-lg-0">
                    <h6 className="mb-0">
                      ${product.price * product.quantity}
                    </h6>
                  </div>

                  <div className="card-body-col d-none d-lg-block">
                    <span
                      className="text-danger fs-5"
                      style={{ cursor: "pointer" }}
                      aria-label={`Remove ${product.title} from cart`}
                      {...activate(() => handleDeleteFromCart(product))}
                    >
                      <FaTrashAlt />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className={`helpers ${cart.length === 0 ? "d-none" : ""}`}>
          <div className="row mt-2 mt-lg-4">
            <div className="col-12 col-lg-7 mb-4 mb-lg-0 d-none d-lg-block">
              <Link to="/products" className="return btn p-2 ps-4 pe-4">
                return to shop
              </Link>
            </div>

            <div className="col-12 col-lg-5 mt-1 mt-lg-0">
              <div className="total p-3 pb-4">
                <h4 className="mb-3 text-capitalize">cart total</h4>
                <div className="line pb-2">
                  <h6>subtotal:</h6>
                  <h1 className="fs-6 fw-bold">${subtotal.toFixed(2)}</h1>
                </div>
                <div className="line mt-4 pb-2">
                  <h6>shipping:</h6>
                  <h6>${percontageToSubstract}</h6>
                </div>
                <div className="line last mt-4 mb-4">
                  <h6>total:</h6>
                  <h6>${total.toFixed(2)}</h6>
                </div>
                <Link
                  className="text-decoration-none d-flex justify-content-center"
                  to="/checkout"
                >
                  <Button title="Proceed to checkout" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
