import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*left section*/}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Healthconnect is dedicated to bridging healthcare gaps in
            underserved communities by providing access to essential health
            services at little to no cost. Through partnerships with local
            governments and NGOs, we address critical health issues, including
            maternal care, chronic illness management, and malnutrition. Our
            platform empowers communities by organizing health camps, mobile
            clinics, and vaccination drives, making healthcare more accessible
            and improving quality of life. By sponsoring these initiatives,
            Providence not only enhances public health but also fosters
            long-term relationships, building a foundation for a healthier
            future for all.
          </p>
        </div>
        {/*center section*/}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/*right section*/}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+0123456789</li>
            <li>TheVerse@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ HealthConnect -All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
