"use client";

import React, { useEffect, useState } from "react";
import TopBar from "../TopBar";
import Avatar from "../Avatar";
import axios from "axios";
import FooterUserDashboard from "../user-dashboard/FooterUserDashboard";
import Link from "next/link";

interface ProfileProps {
  setActivePage: (page: string) => void;
}

const Profile = ({setActivePage} : ProfileProps) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchGetProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRole(res.data.role);
        setUsername(res.data.username);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchGetProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {role === "User" ? (
        <TopBar
          imgWhiteVector="hiden md:block"
          logoColor="text-black"
          colorUsername="text-black"
          border="border-b border-gray-300"
          setActivePage={() => {}}
        />
      ) : null}
      <div className="flex-grow">
        <div
          className={
            role === "Admin" ? "rounded-md border border-gray-300 bg-white h-screen" : ""
          }
        >
          <div className="flex items-center justify-center pt-20">
            <div className="flex flex-col items-center w-2xs">
              <p className="text-xl font-medium py-4">User Profile</p>
              <div className="mb-4">
                <Avatar name={username} />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="border rounded-sm py-1 pr-16 pl-2 flex justify-between gap-10 bg-gray-300">
                  <div className="flex justify-between gap-6">
                    <p>Username</p> <p>:</p>
                  </div>
                  <div className="max-w-full">{username}</div>
                </div>
                <div className="border rounded-sm py-1 pr-8 pl-2 flex justify-around gap-8 bg-gray-300">
                  <div className="flex justify-between gap-10">
                    <p>Role</p> <p>:</p>
                  </div>
                  <div>{role}</div>
                </div>
                {/* <div className="border rounded-sm py-1 pr-8 pl-2 flex justify-between gap-8">
                <div>Password :</div>
                <div>{password}</div>
              </div> */}
                <div>
                  <Link
                    href={`/pages/${
                      role === "User" ? "user-dashboard" : "admin-dashboard"
                    }`}
                    onClick={() => setActivePage(role === "Admin" ? "Articles" : "")}
                    className="block w-full text-center justify-center mt-4 bg-blue-500 text-white rounded-md py-1"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {role === "User" ? <FooterUserDashboard /> : null}
    </div>
  );
};

export default Profile;
