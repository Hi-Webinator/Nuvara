import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addPrdToWishlist,
  clearWishlist,
  deleteFromWishList,
} from "../Redux/Api/wishlistApi";
import { fetchProducts } from "../Redux/Slices/productSlice";
import { addPrdToCart } from "../Redux/Api/cartsApi";

import { FaStar, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";

import Header from "../components/Title";
import Button from "../components/Button";
import usePageMeta from "../utils/usePageMeta";
import { activate } from "../utils/interactive";

const WishList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishList);

  usePageMeta({
    title: "Wishlist",
    description: "The products you've saved for later at Nuvara.",
  });

  const fourProducts = products.slice(5, 9);
  const fiveProducts = products.slice(14, 18);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  //handle click
  const [isClicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!isClicked);
  };

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

  return (
    <div className="wishlist mt-5 mb-5">
      <div className="container">
        <div className="wishlist-frame d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 mb-5">
          <h5 className="wishlist-title fw-bold mb-3 mb-md-0">
            Wishlist ({wishlist.length})
          </h5>
          <span
            className={`clear p-4 pt-2 pb-2 ${wishlist.length === 0 ? "d-none" : ""}`}
            aria-label="Remove all items from wishlist"
            {...activate(() => dispatch(clearWishlist()))}
          >
            Remove All
          </span>
        </div>

        <div className="row">
          {wishlist.map((product) => {
            return (
              <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="product">
                  <div className="card">
                    <div className="image position-relative">
                      <img
                        src={product.image}
                        className="card-img-top p-5"
                        alt={product.title}
                      />
                      <div className="outils position-absolute">
                        <span
                          className="heart"
                          aria-label="Remove from wishlist"
                          {...activate(() => dispatch(deleteFromWishList(product)))}
                        >
                          <FaTrashAlt />
                        </span>
                      </div>
                      <div className="addCart btn position-absolute w-100 text-center pt-2 pb-1">
                        <h1
                          className="fs-6 fw-bold d-flex align-items-center text-capitalize p-0"
                          aria-label="Add to cart"
                          {...activate(() => handleAddPrdToCart(product))}
                        >
                          <FiShoppingCart className="me-2" />
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`mt-5 ${wishlist.length == 0 && "d-none"}`}>
          <Header title="Just For You" />
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <h1 className="fs-2 fw-bold text-center mb-3 mb-lg-0">
              Relative products
            </h1>
            <Button
              title={isClicked ? "View Less" : "View All"}
              funct={handleClicked}
            />
          </div>

          {loading && <h1>Loading...</h1>}

          {!loading && fourProducts.length ? (
            <div className="row mt-4 mt-lg-5">
              {fourProducts.map((product) => (
                <div key={product.id} className="col-12 col-md-6 col-lg-3">
                  <div className="product">
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
                            {wishlist?.find(
                              (item) => item?.id === product?.id,
                            ) ? (
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
                            <span className="fw-bold me-3">
                              ${product.price}
                            </span>
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

              {fiveProducts.map((product) => (
                <div
                  key={product.id}
                  className={
                    isClicked ? "col-12 col-md-6 col-lg-3" : "col d-none"
                  }
                >
                  <div className="product">
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
                            {wishlist?.find(
                              (item) => item?.id === product?.id,
                            ) ? (
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
                            <span className="fw-bold me-3">
                              ${product.price}
                            </span>
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
            </div>
          ) : null}

          {!loading && error ? <h1>Error: {error}</h1> : null}
        </div>
      </div>
    </div>
  );
};

export default WishList;
