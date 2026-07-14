import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

import usePageMeta from "../utils/usePageMeta";

const Contact = () => {
  usePageMeta({
    title: "Contact",
    description:
      "Get in touch with the Nuvara team — we respond within 24 hours.",
  });

  return (
    <div className="contact mt-3 mt-lg-5 mb-5">
      <div className="container">
        <h3 className="fw-bold fs-6 mb-5 text-black">
          <span className="text-muted">Home</span> / Contact
        </h3>

        <div className="row d-flex align-items-center">
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <div className="infoContact p-3 ps-4 pe-4 d-flex flex-column">
              <h1 className="phone fs-5 fw-bold mt-2 mb-4 text-capitalize d-flex align-items-center">
                <FiPhone className="icon fs-6 me-3" />
                call to us
              </h1>
              <p className="mt-0 mb-3">We are available 24/7, 7 days a week</p>
              <span className="mt-0  mb-4">Phone: +2125465xxxxx</span>

              <hr className="w-100" />

              <h1 className="email mt-3 mb-4 fs-5 fw-bold text-capitalize d-flex align-items-center">
                <MdOutlineMail className="icon  me-3" />
                write to us
              </h1>
              <p className="mt-0 mb-3">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <span className="mt-0 mb-3">Emails: customer@nuvara.com</span>
              <span className="mt-0 mb-2">Emails: support@nuvara.com</span>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <form className="form p-3 ps-4 pe-4 d-flex flex-column">
              <div className="infos mb-4 d-flex flex-column flex-lg-row">
                <input
                  type="text"
                  placeholder="Your Name *"
                  aria-label="Your name"
                  className="mb-2 mb-lg-0 p-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  aria-label="Your email"
                  className="mb-2 mb-lg-0 p-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  aria-label="Your phone number"
                  className="p-2"
                  required
                />
              </div>

              <textarea
                className="message p-2 mb-3"
                rows={11}
                placeholder="Write Your Message Here!"
                aria-label="Your message"
                required
              ></textarea>

              <input
                className="send p-2 ps-3 pe-3 ps-lg-4 pe-lg-4"
                type="submit"
                value="Send Message"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
