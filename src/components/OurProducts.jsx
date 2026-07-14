import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../Redux/Slices/productSlice";

import Header from "./Title";
import Arrows from "./Arrows";
import Button from "./Button";
import MainProduct from "./MainProduct";

const OurProducts = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const fourProducts = products.slice(15, 19);
  const fiveProducts = products.slice(3, 7);

  const handleClicked = () => setClicked((prev) => !prev);

  return (
    <div className="flash mt-5 mb-5">
      <div className="container">
        <Header title="Our Products" />
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center mt-3">
          <h1 className="fs-3 fw-bold">Explore Our Products</h1>
          <Arrows />
        </div>

        <div className="row mt-4 mt-lg-5">
          {loading && <h1>Loading...</h1>}

          {fourProducts.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3">
              <MainProduct product={product} />
            </div>
          ))}

          {fiveProducts.map((product) => (
            <div
              key={product.id}
              className={
                isClicked
                  ? "col-12 col-md-6 col-lg-3 mb-4 mb-lg-3"
                  : "col d-none"
              }
            >
              <MainProduct product={product} />
            </div>
          ))}

          {!loading && error ? <h1>Error: {error}</h1> : null}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <Button
          title={isClicked ? "View Less" : "View All Products"}
          funct={handleClicked}
        />
      </div>
    </div>
  );
};

export default OurProducts;
