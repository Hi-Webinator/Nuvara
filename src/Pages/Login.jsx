import { Link } from "react-router-dom";

import Input from "../components/Input";
import shop1 from "../Assets/login.webp";

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import usePageMeta from "../utils/usePageMeta";

const Login = () => {
  usePageMeta({
    title: "Login",
    description: "Sign in to your Nuvara account.",
  });

  return (
    <div className="login mt-5 mb-5">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-12 col-lg-6">
            <div className="image">
              <img src={shop1} alt="shoping online" className="img-fluid" />
            </div>
          </div>

          <div className="col-12 col-lg-5 mt-4 mt-lg-0 text-center text-lg-start">
            <div className="form">
              <div className="form-title d-flex align-items-center gap-2">
                <h1 className="fs-2 mb-2 fw-bold">Log in to Exclusive</h1>
                <Link className="form-register" to="/register">(Create account)</Link>
              </div>
              <h1 className="fs-6 mb-4">Enter your details below</h1>

              <form className="mb-4">
                <div className="inputs d-flex flex-column">
                  <Input type="email" ph="email or phone number" />
                  <Input type="password" ph="password" />
                </div>

                <div className="buttons m-auto mt-3 d-flex justify-content-between align-items-center">
                  <input
                    className="submit p-2 ps-5 pe-5 fw-bold"
                    type="submit"
                    value="Log In"
                  />
                  <Link
                    to="#"
                    className="forget text-danger text-capitalize text-decoration-none pt-2 pb-2 fs-6"
                  >
                    forgot password?
                  </Link>
                </div>
              </form>

              <span className="or position-relative p-0 mb-4 m-auto">
                <b>or</b>
              </span>

              <div className="social mt-0">
                <Link className="fb me-4" to="#" aria-label="Continue with Facebook">
                  <FaFacebookF size={23} />
                </Link>
                <Link className="google" to="#" aria-label="Continue with Google">
                  <FcGoogle size={23} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
