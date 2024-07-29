import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <>
      <div>
        {/* Section - 1 */}
        <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
          <Link to={"/signup"}>
            <div className="group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblue-200 transition-all duration-200 hover:scale-95 w-fit">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblue-900">
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>

          <div className="text-center text-4xl font-semibold mt-6">
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
          </div>

          <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
          {/* two buttons */}
          <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>

          {/* Hero Video */}
          <div className="mx-3 my-12 shadow-blue-200 ">
            <video muted loop autoPlay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* Code section - 1 */}
          <div>
            <CodeBlocks
              position={"flex-row"}
              heading={
                <div className="text-4xl font-semibold">
                  Unlock Your
                  <HighlightText text={"coding potential"} />
                  with our online courses
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: true,
              }}
              codeblock={`<!DOCTYPE html> \
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>          `}
              codeColor={"text-yellow-25"}
            />
          </div>

          {/* Code Section - 2 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="text-4xl font-semibold">
                  Unlock Your
                  <HighlightText text={"coding potential"} />
                  with our online courses
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: true,
              }}
              codeblock={`<!DOCTYPE html> \
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>          `}
              codeColor={"text-yellow-25"}
            />
          </div>

          <ExploreMore/>
        </div>

        {/* Section - 2 */}
        <div className="bg-pure-greys-5 text-richblack-700">
          <div className="homepage_bg h-[310px]">
            <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto">
              <div className="h-[150px]"></div>

              <div className="flex flex-row gap-7 text-white">
                <CTAButton active={true} linkto={"/signup"}>
                  <div
                    className="flex items-center
                   gap-3"
                  >
                    Explore Full Catalog
                    <FaArrowRight />
                  </div>
                </CTAButton>

                <CTAButton active={false} linkto={"/signup"}>
                  <div>Learn more</div>
                </CTAButton>
              </div>
            </div>
          </div>
          {/* Get the skills you need for a job that is in demand - section */}
          <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
            <div className="flex flex-row gap-5 mb-10 mt-[95px]">
              <div className="text-4xl font-semibold w-[45%]">
                Get the skill you need fro a
                <HighlightText text={"Job that is in demand."} />
              </div>

              <div className="flex flex-col gap-10 w-[40%] items-start">
                <div className="text-[16px]">
                  The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </div>
                <CTAButton active={true} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>

            {/* Timeline vala section */}

            <TimeLineSection />

            <LearningLanguageSection />
          </div>
        </div>

        {/* Section - 3 */}
        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
         
         <InstructorSection/>

                <div>
                  
         <h2 className="text-center text-4xl font-semibold mt-10">Review from Other learners</h2>
         {/* Review Slider here */}
                </div>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
};

export default Home;
