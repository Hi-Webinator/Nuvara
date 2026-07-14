import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Route-level code splitting: each page ships in its own chunk so the initial
// bundle only loads what the landing route needs.
const Home = lazy(() => import("../Pages/Home"));
const Contact = lazy(() => import("../Pages/Contact"));
const About = lazy(() => import("../Pages/About"));
const Register = lazy(() => import("../Pages/Register"));
const Login = lazy(() => import("../Pages/Login"));
const Cart = lazy(() => import("../Pages/Cart"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const WishList = lazy(() => import("../Pages/WishList"));
const Products = lazy(() => import("../Pages/Products"));

const Routing = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
