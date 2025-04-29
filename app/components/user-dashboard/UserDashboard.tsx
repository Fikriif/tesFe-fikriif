'use client';

import Image from "next/image";
import React from "react";
import TopBar from "../TopBar";
import SelectCategories from "./SelectCategories";
import ArticleDashboard from "./ArticleDashboard";
import FooterUserDashboard from "./FooterUserDashboard";

const UserDashboard = () => {
  
  return (
    <div>
      <div className="relative w-screen h-[65vh]">
        <Image
          src="/bgHeader.jpg"
          fill
          style={{ objectFit: "cover" }}
          alt="user"
          className="z-0"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-50 z-10"></div>
        <div className="absolute top-0 left-0 w-full z-30">
          <TopBar
            imgWhiteVector="hidden md:block"
            imgVector="block md:hidden"
            logoColor="text-[#000150] md:text-white"
            colorUsername="text-white"
            setActivePage={() => {}}
          />
        </div>
        <div className="absolute z-20 md:top-1/2 top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-white">
          <p className="text-xs font-semibold pb-2">Blog genzet</p>
          <p className="md:text-4xl text-xl text-center">
            The Journal : Design Reqources, Interviews, and Industry News
          </p>
          <p className="text-sm pt-1">Your daily dose of design insights!</p>
          <div className="py-6">
            <SelectCategories />
          </div>
        </div>
      </div>
      <ArticleDashboard />

      <div className="pt-5">
        <FooterUserDashboard />
      </div>
    </div>
  );
};

export default UserDashboard;
