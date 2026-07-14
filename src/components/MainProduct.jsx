import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrdToCart } from "../Redux/Api/cartsApi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { addPrdToWishlist, deleteFromWishList } from "../Redux/Api/wishlistApi";
import { activate } from "../utils/interactive";

const MainProduct = ({ product }) => {
  const wishlist = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

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

  const discountClassName = "discount position-absolute pt-1 pb-1 ps-2 pe-2";
  return (
    <>
      <div className="product">
        <div className="card">
          <div className="image position-relative">
            <img
              src={product?.image}
              className={`card-img-top p-5 ${hiddenProducts.includes(product.id) ? "disable" : ""}`}
              alt={product.title}
            />
            <span
              className={`${discountClassName} d-block`}
              style={{ backgroundColor: "#00FF66" }}
            >
              Popular
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
            <div className="addCart  position-absolute w-100 text-center pt-2 pb-1">
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
            <h5 className="card-title mt-3">{product?.title}</h5>
            <div className="d-flex">
              <p className="card-price d-flex mb-1">
                <span className="fw-bold me-3">${product?.price}</span>
              </p>
              <p className="card-rate d-flex">
                <span className="me-1 d-flex">⭐⭐⭐⭐⭐</span>
                <span className="rating fw-bold">(100)</span>
              </p>
            </div>

            <div className="colors position-absolute d-flex gap-1">
              <span style={{ backgroundColor: "#db4444" }}></span>
              <span style={{ backgroundColor: "#008000" }}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainProduct;
