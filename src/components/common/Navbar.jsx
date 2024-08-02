import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom"; // Ensure matchPath is imported correctly
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/HomePage/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const subLinks = [
  {
    title: "python",
    link: "/catelog/python",
  },
  {
    title: "web dev",
    link: "/catalog/web-development",
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // const [subLinks, setSubLinks] = useState([]);

  // const fetchSublinks = async () => {
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     console.log("Printing Sublinks result:", result);
  //     setSubLinks(result.data.data);
  //   } catch (error) {
  //     console.log("Could not fetch the category list");
  //   }
  // };

  useEffect(() => {
    // fetchSublinks();
  }, []);

  return (
    <>
      <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* logo image */}
          <Link to={"/"}>
            <img
              src={logo}
              alt="studyNotionLogo"
              width={160}
              height={42}
              loading="lazy"
            />
          </Link>

          {/* nav links */}
          <nav>
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-2 group relative">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="invisible absolute
                      translate-x-[-50%] translate-y-[50%] lef-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblue-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]"
                      >
                        <div className="absolute left-[70%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5"></div>

                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link to={`${subLink.link}`} key={index}>
                              <p>{subLink.title}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Login- signup - dashboard */}
          <div className="flex flex-row gap-x-4 items-center">
            {user && user?.accountType !== "Instructor" && (
              <Link to={"/dashboard/cart"} className="relative">
                <AiOutlineShoppingCart />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            )}

            {/* show login or signup */}
            {token === null && (
              <Link to={"/login"}>
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to={"/signup"}>
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Sign Up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
