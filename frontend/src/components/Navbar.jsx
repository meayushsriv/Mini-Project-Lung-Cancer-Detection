import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/curanet"}>
          <li className="py-1">CURANET</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/healtheducation"}>
          <li className="py-1">DOCS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/ehr"}>
          <li className="py-1">EHR</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/healthaccess"}>
          <li className="py-1">CARELINK</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/lungcancerdetection"}>
          <li className="py-1">CANCER</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <hr />
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData?.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base text-gray-600 z-10 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointment");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => {
            setShowMenu(true);
          }}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/**mobile nav */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink to={"/"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                HOME
              </p>
            </NavLink>
            <NavLink to={"/doctors"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                DOCTORS
              </p>
            </NavLink>
            <NavLink to={"/about"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                ABOUT
              </p>
            </NavLink>
            <NavLink to={"/contact"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CONTACT
              </p>
            </NavLink>
            <NavLink to={"/curanet"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CURANET
              </p>
            </NavLink>
            <NavLink to={"/healtheducation"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                DOCS
              </p>
            </NavLink>
            <NavLink to={"/ehr"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                EHR
              </p>
            </NavLink>
            <NavLink to={"/healthaccess"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CARELINK
              </p>
            </NavLink>
            <NavLink to={"/sponsors"}>
              <p
                className={`px-4 py-2 rounded inline-block `}
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                SPONSORS
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
