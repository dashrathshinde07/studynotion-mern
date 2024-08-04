import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";

const About = () => {
  return (
    <div className="mt-[100px] text-white">
      {/* section - 1 */}
      <section>
        <div>
          <header>
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p>
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="flex gap-x-3 mx-auto">
            <img src={BannerImage1} alt="bannerimage1" />
            <img src={BannerImage2} alt="bannerimage2" />
            <img src={BannerImage3} alt="bannerimage3" />
          </div>
        </div>
      </section>

      {/* section - 2 */}
      <section>
        <div>
            <Quote/>
        </div>
      </section>

      {/* section - 3 */}
      <section>
        <div>
            <div></div>
        </div>
      </section>
    </div>
  );
};

export default About;
