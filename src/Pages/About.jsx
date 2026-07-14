import usePageMeta from "../utils/usePageMeta";
import shoping from "../Assets/about.webp";

const About = () => {
  usePageMeta({
    title: "About",
    description:
      "Nuvara brings the world's best products into one seamless shopping experience.",
  });

  return (
    <div className="about mt-3 mt-lg-5 mb-5">
      <div className="container">
        <div className="row mt-4 mt-lg-5 mb-lg-5 pb-lg-5 d-flex align-items-center text-center text-lg-start">
          <div className="col-12 col-lg-6">
            <div className="story pe-0 pe-lg-5">
              <h1 className="story-title fw-bold text-capitalize mb-3 mb-lg-4">
                our story
              </h1>
              <p className="story-desc fs-6 lh-base text-justify">
                Nuvara was created with a simple vision: to bring the world’s
                best products into one seamless shopping experience. From
                everyday essentials to unique finds, we curate items that
                combine quality, style, and value—so you don’t have to search
                everywhere.
                <br /> <br />
                As a global store, Nuvara connects customers with trusted
                suppliers across different markets, ensuring a diverse selection
                that fits every lifestyle. Whether you’re upgrading your home,
                refreshing your wardrobe, or discovering something new, we aim
                to make shopping easy, reliable, and enjoyable.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="image">
              <img src={shoping} alt="Two people shopping online" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
