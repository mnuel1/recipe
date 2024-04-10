/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import SignUp from "./SignUp";
import { Link, useLocation } from "react-router-dom";
import { getLoggedInUserId, userLogout } from "../services/authService";

export default function Navigation(props) {
  const { activeUser } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const navRef = useRef();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    const activeUserId = getLoggedInUserId();

    userLogout(activeUserId)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          console.error("Logout failed with status:", res.status);
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation();

  const isContactPage = location.pathname === "/contact-us";
  useEffect(() => {
    if (location.pathname === "/contact-us") {
      document.body.classList.add("bg-black");
      document.body.classList.remove("bg-white200");
    } else {
      document.body.classList.add("bg-white200");
      document.body.classList.remove("bg-black");
    }
  }, [location]);

  return (
    <>
      <div
        className={`container flex justify-between py-6 items-center font-sans ${
          isContactPage ? "text-white200 bg-black" : "text-black"
        } m-auto`}
      >
        <p className="hidden sm:flex">{activeUser ? activeUser : "Guest"}</p>
        <div className="items-center lg:gap-24 md:gap-12 sm:gap-6 absolute left-1/2 transform -translate-x-1/2 hidden sm:flex">
          <Link to="/recipes">Recipes</Link>
          <Link to="/">
            <img
              className="w-16"
              src={isContactPage ? "images/alt-logo.png" : "images/logo.png"}
              alt="Tito Zah's Logo"
            />
          </Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
        {activeUser ? (
          <div
            className=" bg-black px-3.5 py-2 rounded-lg items-center gap-1 hover:cursor-pointer hidden sm:flex hover:bg-gray"
            onClick={handleLogoutClick}
          >
            <a href="#" className="text-white200 text-xs">
              Logout
            </a>
          </div>
        ) : (
          <div
            className={`${
              isContactPage ? "bg-white200" : "bg-black"
            }  px-3.5 py-2 rounded-lg items-center gap-1 hover:cursor-pointer hidden sm:flex hover:bg-gray`}
            onClick={handleSignUpClick}
          >
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/doodle/48/user.png"
              alt="user"
            />
            <a
              href="#"
              className={`${
                isContactPage ? "text-black" : "text-white200"
              } text-xs`}
            >
              Sign Up
            </a>
          </div>
        )}

        <div className="container flex justify-between items-center w-full sm:hidden">
          <Link to="/">
            <img
              className="w-14 sm:hidden"
              src={`${!isOpen ? "images/logo.png" : "images/alt-logo.png"}`}
              alt="Tito Zah's Logo"
            />
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="sm:hidden hover:cursor-pointer"
            onClick={handleMenuClick}
          >
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div
          ref={navRef}
          className="fixed flex flex-col text-white200 text-sm right-0 top-0 h-full w-64 bg-green-500 p-4 bg-green rounded-tl-2xl rounded-bl-2xl z-20 py-8 px-7"
        >
          <div className="flex justify-between items-center gap-5 ">
            <Link to="/">
              <img
                className="w-14 sm:hidden"
                src="images/alt-logo.png"
                alt="Tito Zah's Logo"
              />
            </Link>
            <p className="text-xl font-serif leading-5">Tito Zah's Kitchen</p>
          </div>
          <div className="flex justify-center m-auto mt-4 w-full h-[1px] bg-white200 mb-5 opacity-50"></div>
          <Link to="/recipes" className="mb-2 text-lg">
            Recipes
          </Link>
          <a href="#" className="mb-2 text-lg">
            Contact
          </a>
          <div className="flex justify-center m-auto mt-4 w-full h-[1px] bg-white200 mb-5 opacity-50"></div>

          <div
            className=" bg-black px-3.5 py-2 rounded-lg items-center gap-1 flex justify-center hover:cursor-pointer"
            onClick={handleSignUpClick}
          >
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/doodle/48/user.png"
              alt="user"
            />
            <a href="#" className="text-white200 text-xs">
              Sign Up
            </a>
          </div>
        </div>
      )}
      {isSignUpOpen && (
        <SignUp
          isOpen={isSignUpOpen}
          onClose={handleSignUpClose}
          onLogin={props.onLogin}
        />
      )}
    </>
  );
}
