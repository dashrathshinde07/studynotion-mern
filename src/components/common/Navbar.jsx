import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/HomePage/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import 

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    async () => {
      try {
        const result = apiConnector("GET",);
      } catch (error) {
        console.log("Could not fetch the category list");
      }
    };
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
                    <div></div>
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
