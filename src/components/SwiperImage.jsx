import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import jbl from "../Assets/jbl.webp";

import Button from "./Button";

const SwiperImage = () => {
  // Flash date
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-5-30").getTime();
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="swiperImage d-none d-lg-block mt-5 mb-5">
      <div className="container">
        <div className="image position-relative">
          <img
            src={jbl}
            className="position-relative"
            alt="JBL wireless speaker promotion"
          />
          <h1 className="categories fs-5 position-absolute text-capitalize">
            categories
          </h1>
          <div className="center position-absolute d-flex flex-column">
            <h1 className="col- desc ">
              Enhance Your Music <br /> Experience
            </h1>
            <ul className="d-flex list-unstyled mt-4 ">
              <li className="days me-4 d-flex justify-content-center align-items-center flex-column">
                <span className="fs-6 mb-0">{timeLeft.days}</span>
                days
              </li>
              <li className="hours me-4 d-flex justify-content-center align-items-center flex-column">
                <span className="fs-6 mb-0">{timeLeft.hours}</span>
                hours
              </li>
              <li className="minutes me-4 d-flex justify-content-center align-items-center flex-column">
                <span className="fs-6 mb-0">{timeLeft.minutes}</span>
                minutes
              </li>
              <li className="seconds me-4 d-flex justify-content-center align-items-center flex-column">
                <span className="fs-6 mb-0">{timeLeft.seconds}</span>
                seconds
              </li>
            </ul>
          </div>

          <div className="butt position-absolute">
            <Button title="Buy Now!" bg="#00FF66" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperImage;
