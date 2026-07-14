import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../Redux/Api/cartsApi";

import { HiMiniXMark } from "react-icons/hi2";

import Button from "../components/Button";
import usePageMeta from "../utils/usePageMeta";
import { activate } from "../utils/interactive";
import bank from "../Assets/banks.webp";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  usePageMeta({
    title: "Checkout",
    description: "Enter your billing details and place your Nuvara order.",
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

  return (
    <div className="checkout mt-4 mt-lg-5 mb-5">
      <div className="container">
        <h6 className="fw-bold mb-4 mb-lg-5">
          <span className="text-muted">Cart</span> / Checkout
        </h6>

        <form>
          <div className="row d-flex justify-content-center justify-content-lg-between">
            <div className="col-12 col-md-10 col-lg-5 mb-5 mb-lg-0">
              <div className="infos d-flex flex-column">
                <h4 className="text-capitalize text-center text-lg-start mb-4">
                  Billing details
                </h4>
                <label htmlFor="firstName">first name</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  placeholder="Enter first name"
                />

                <label htmlFor="streetAddress">street address</label>
                <input
                  id="streetAddress"
                  type="text"
                  placeholder="Enter street address"
                  required
                />

                <label htmlFor="apartment">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  id="apartment"
                  type="text"
                  placeholder="Enter apartment"
                />

                <label htmlFor="townCity">town/city</label>
                <input
                  id="townCity"
                  type="text"
                  required
                  placeholder="Enter town or city"
                />

                <label htmlFor="phone">phone number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  required
                />

                <label htmlFor="email">email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                />

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="defaultCheck1"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Save this information for faster check-out next time
                  </label>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-10 col-lg-5">
              <div className="payment d-flex flex-column">
                {cart.map((product) => {
                  return (
                    <div className="prod mb-4" key={product.id}>
                      <div className="prod-img">
                        <img
                          src={product.image}
                          className="img-fluid"
                          alt={product.title}
                        />
                        <span
                          className="delete"
                          aria-label={`Remove ${product.title} from order`}
                          {...activate(() => handleDeleteFromCart(product))}
                        >
                          <HiMiniXMark />
                        </span>

                        <h6 className="quantity">
                          <HiMiniXMark />
                          {product.quantity}
                        </h6>
                      </div>
                      <h6 className="fw-bold">${product.price}</h6>
                    </div>
                  );
                })}

                <div className="line">
                  <h6>Subtotal:</h6>
                  <h6>${subtotal.toFixed(2)}</h6>
                </div>
                <div className="line">
                  <h6>shipping:</h6>
                  <h6>${percontageToSubstract}</h6>
                </div>
                <div className="line mb-4">
                  <h6>total:</h6>
                  <h6>${total.toFixed(2)}</h6>
                </div>

                <div className="bank form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Bank
                    <span>
                      <img
                        src={bank}
                        alt="Accepted bank cards"
                        className="img-fluid"
                      />
                    </span>
                  </label>
                </div>

                <div className="bank form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Cash on delivery
                  </label>
                </div>

                <div className="coupon mb-4">
                  <input
                    className="col-lg-7"
                    type="text"
                    name="coupon"
                    id="coupon"
                    aria-label="Coupon code"
                    placeholder="Enter coupon"
                  />
                  <Button title="Apply coupon" />
                </div>

                <div className="submit">
                  <input
                    className="p-2 ps-4 pe-4"
                    type="submit"
                    value="place order"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
