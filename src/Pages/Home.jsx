import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

import OurProducts from "../components/OurProducts";
import SwiperImage from "../components/SwiperImage";
import FlashSales from "../components/FlashSales";
import ThisMonth from "../components/ThisMonth";
import Services from "../components/Services";
import Arrivals from "../components/Arrivals";
import Browse from "../components/Browse";

import usePageMeta from "../utils/usePageMeta";
import { activate } from "../utils/interactive";

import image1 from "../Assets/parfum.webp";
import image2 from "../Assets/ps5.webp";
import image3 from "../Assets/psp.webp";
import image4 from "../Assets/pc.webp";
import image5 from "../Assets/ip15.webp";

const Home = () => {
  usePageMeta({
    title: "Home",
    description:
      "Nuvara — premium fragrances, skincare, and beauty essentials delivered worldwide.",
  });

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);

  const images = [image1, image2, image3, image4, image5];

  const handleClick1 = () => {
    setActive1(!active1);
  };
  const handleClick2 = () => {
    setActive2(!active2);
  };

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="aside pt-4 d-flex flex-column">
                <span
                  className="aside-item d-flex align-items-center position-relative"
                  aria-expanded={active1}
                  {...activate(handleClick1)}
                >
                  Woman’s Fashion
                  {active1 ? (
                    <FaAngleRight className="angle position-absolute ms-2" />
                  ) : (
                    <FaAngleDown className="angle position-absolute " />
                  )}
                </span>
                <span
                  className="aside-item d-flex align-items-center position-relative"
                  aria-expanded={active2}
                  {...activate(handleClick2)}
                >
                  Men’s Fashion
                  {active2 ? (
                    <FaAngleRight className="angle position-absolute ms-2" />
                  ) : (
                    <FaAngleDown className="angle position-absolute" />
                  )}
                </span>
                <span className="aside-item">Electronics</span>
                <span className="aside-item">Home & Lifestyle</span>
                <span className="aside-item">Medicine</span>
                <span className="aside-item">Sports & Outdoor</span>
                <span className="aside-item">Baby’s & Toys</span>
                <span className="aside-item">Groceries & Pets</span>
                <span className="aside-item mb-0">Health & Beauty</span>
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <div className="image pt-4">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                  {images?.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <img
                          className="img-fluid"
                          src={img}
                          alt="Featured product"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlashSales />
      <Browse />
      <ThisMonth />
      <SwiperImage />
      <OurProducts />
      <Arrivals />
      <Services />
    </>
  );
};

export default Home;
