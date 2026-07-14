import { Link } from "react-router-dom";

import Input from "../components/Input";
import shop1 from "../Assets/register.webp";

import { FcGoogle } from "react-icons/fc";

import usePageMeta from "../utils/usePageMeta";

const Register = () => {
  usePageMeta({
    title: "Create Account",
    description: "Create your Nuvara account to start shopping.",
  });

  return (
    <div className="register up mt-5 mb-5">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-12 col-lg-6">
            <div className="image">
              <img src={shop1} alt="shoping online" className="img-fluid" />
            </div>
          </div>

          <div className="col-12 col-lg-5 mt-4 mt-lg-0 text-center text-lg-start">
            <div className="form">
              <h1 className="fs-2 mb-2">Create an account</h1>
              <h1 className="fs-6 mb-4">Enter your details below</h1>
              <form>
                <div className="inputs d-flex flex-column">
                  <Input type="text" ph="Name" />
                  <Input type="email" ph="email or phone number" />
                  <Input type="password" ph="password" />
                </div>

                <div className="buttons m-auto mt-3 d-flex flex-column text-center">
                  <input
                    className="submit pt-2 pb-2"
                    type="submit"
                    value="Create Account"
                  />
                  <span className="gg pt-2 pb-2 btn mt-3">
                    <FcGoogle className="me-2 fs-5" />
                    Sign up with Google
                  </span>
                </div>
              </form>

              <div className="toLogin d-flex justify-content-center gap-2 mt-4">
                Already have an account?
                <Link to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
