import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../Redux/Slices/productSlice";
import { addPrdToWishlist, deleteFromWishList } from "../Redux/Api/wishlistApi";
import { addPrdToCart } from "../Redux/Api/cartsApi";

import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

import Header from "./Title";
import Arrows from "./Arrows";
import Button from "./Button";
import { activate } from "../utils/interactive";

const FlashSales = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  //Calculate Flash Date
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-12-31").getTime();
    const now = new Date().getTime();

    const difference = targetDate - now;
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Clear Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch products once (avoids refetching the shared list on every mount)
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const fourProducts = products.slice(0, 4);
  const fiveProducts = products.slice(10, 14);

  // Handle Visibility
  const [hiddenProducts, setHiddenProducts] = useState([]);

  const handleProductVisiblity = (product) => {
    setHiddenProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  // Handle Toggle Wishlist And Cart
  const handleTogglePrdToWishlist = (product) => {
    const findProduct = wishlist?.find((item) => item?.id === product?.id);

    if (!findProduct) {
      dispatch(addPrdToWishlist(product));
    } else {
      dispatch(deleteFromWishList(product));
    }
  };

  const handleAddPrdToCart = (product) => {
    dispatch(addPrdToCart(product));
  };

  // Handle Click
  const [isClicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!isClicked);
  };

  return (
    <div className="flash mt-5 mb-5">
      <div className="container">
        <Header title="Today's" />
        <div className="timing d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <div className="time d-flex flex-column flex-md-row align-items-center">
            <h2 className="fs-3 text-capitalize me-0 me-md-4 fw-bold">
              christmas sales
            </h2>
            <div className="d-flex mb-2 mt-2">
              <span className="days position-relative fs-3 me-4 me-lg-3 fw-bold ms-0 ms-lg-5">
                {timeLeft.days} :
              </span>
              <span className="hours position-relative fs-3 me-4 me-lg-3 fw-bold">
                {timeLeft.hours} :
              </span>
              <span className="minutes position-relative fs-3 me-4 me-lg-3 fw-bold">
                {timeLeft.minutes} :
              </span>
              <span className="seconds position-relative fs-3 fw-bold">
                {timeLeft.seconds}
              </span>
            </div>
          </div>
          <Arrows />
        </div>

        <div className="row mt-4 mt-lg-5">
          {loading && <h1>Loading...</h1>}

          {fourProducts?.map((product) => (
            <div
              key={product?.id}
              className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-3"
            >
              <div className="flash-prd">
                <div className="card">
                  <div className="image position-relative">
                    <img
                      src={product.image}
                      className={`card-img-top p-5 ${hiddenProducts.includes(product.id) ? "disable" : ""}`}
                      alt={product.title}
                    />
                    <span className="discount position-absolute pt-1 pb-1 ps-2 pe-2">
                      New
                    </span>
                    <div className="outils d-flex flex-column position-absolute">
                      <span
                        className="heart mb-2"
                        aria-label="Toggle wishlist"
                        {...activate(() => handleTogglePrdToWishlist(product))}
                      >
                        {wishlist?.find((item) => item?.id === product?.id) ? (
                          <FaHeart className="fill" />
                        ) : (
                          <FaRegHeart className="empty" />
                        )}
                      </span>
                      <span
                        className="visibility fs-5"
                        aria-label="Toggle product preview"
                        {...activate(() => handleProductVisiblity(product))}
                      >
                        {hiddenProducts.includes(product.id) ? (
                          <IoIosEyeOff />
                        ) : (
                          <IoMdEye />
                        )}
                      </span>
                    </div>
                    <div className="addCart btn position-absolute w-100 text-center pt-2 pb-1">
                      <h1
                        className="fs-6 fw-bold text-capitalize p-0"
                        aria-label="Add to cart"
                        {...activate(() => handleAddPrdToCart(product))}
                      >
                        add to cart
                      </h1>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <h5 className="card-title mt-3">{product.title}</h5>
                    <div>
                      <p className="card-price d-flex mb-1">
                        <span className="fw-bold me-3">${product.price}</span>
                        <del className="fw-bold">
                          ${Math.floor(product.price + 20)}
                        </del>
                      </p>
                      <p className="card-rate d-flex">
                        <span className="me-2 d-flex align-items-center fw-bold">
                          {product.rating.rate}
                          <FaStar className="ms-1" />
                        </span>
                        <span className="rating fw-bold">
                          ({product.rating.count})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {fiveProducts?.map((product) => (
            <div
              key={product.id}
              className={
                isClicked
                  ? "col-12 col-md-6 col-lg-3 mb-4 mb-lg-3"
                  : "col d-none"
              }
            >
              <div className={`product`}>
                <div className="card">
                  <div className="image position-relative">
                    <img
                      src={product.image}
                      className={`card-img-top p-5 ${hiddenProducts.includes(product.id) ? "disable" : ""}`}
                      alt={product.title}
                    />
                    <span className="discount position-absolute pt-1 pb-1 ps-2 pe-2">
                      New
                    </span>
                    <div className="outils d-flex flex-column position-absolute">
                      <span
                        className="heart mb-2"
                        aria-label="Toggle wishlist"
                        {...activate(() => handleTogglePrdToWishlist(product))}
                      >
                        {wishlist?.find((item) => item?.id === product?.id) ? (
                          <FaHeart className="fill" />
                        ) : (
                          <FaRegHeart className="empty" />
                        )}
                      </span>
                      <span
                        className="visibility fs-5"
                        aria-label="Toggle product preview"
                        {...activate(() => handleProductVisiblity(product))}
                      >
                        {hiddenProducts.includes(product.id) ? (
                          <IoIosEyeOff />
                        ) : (
                          <IoMdEye />
                        )}
                      </span>
                    </div>
                    <div className="addCart btn position-absolute w-100 text-center pt-2 pb-1">
                      <h1
                        className="fs-6 fw-bold text-capitalize p-0"
                        aria-label="Add to cart"
                        {...activate(() => handleAddPrdToCart(product))}
                      >
                        add to cart
                      </h1>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <h5 className="card-title mt-3">{product.title}</h5>
                    <div>
                      <p className="card-price d-flex mb-1">
                        <span className="fw-bold me-3">${product.price}</span>
                        <del className="fw-bold">
                          ${Math.floor(product.price + 20)}
                        </del>
                      </p>
                      <p className="card-rate d-flex">
                        <span className="me-2 d-flex align-items-center fw-bold">
                          {product.rating.rate}
                          <FaStar className="ms-1" />
                        </span>
                        <span className="rating fw-bold">
                          ({product.rating.count})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && error ? <h1>Error: {error}</h1> : null}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-0">
        <Button
          title={isClicked ? "View Less" : "View All Products"}
          funct={handleClicked}
        />
      </div>
    </div>
  );
};

export default FlashSales;
