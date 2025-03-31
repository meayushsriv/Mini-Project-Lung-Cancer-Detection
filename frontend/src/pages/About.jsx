import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          <span className="text-gray-700 font-medium">ABOUT </span>US
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to HealthConnect. Your trusted partner in managing your
            healthcare needs conventiently and efficiently at HealthConnect.we
            understand the challanges individuals face when it comes to
            scheduling doctor appointment and managing their health record.
          </p>
          <p>
            HealthConnect is commited to excellence in healthcare technology. we
            continously strive to enhance our platform, integrating the latest
            advancement to improve user experience and deliver superior service
            whether you're booking your first appointment or managing ongoing
            care. HealthConnect is here to support you every step of the way
          </p>
          <p className="text-gray-900 text-lg">Our vision</p>
          <p>
            Our vision at HealthConnect is to create a seamless healthcare
            experience for every user. we aim to bridge the gap between patients
            and healthcare providers. making it easier for you to access the
            care you need. when you need it.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US ?</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-30 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-30 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-30 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Tailored recommedations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
