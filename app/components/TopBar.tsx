"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";
import ModalLogout from "./ModalLogout";

interface TopBarProps {
  colorUsername?: string;
  logoColor?: string;
  imgWhiteVector?: string;
  imgVector?: string;
  border?: string;
  titleTopBar?: string;
  setActivePage: (page: string) => void;
}

const TopBar = ({
  colorUsername,
  logoColor,
  imgWhiteVector,
  imgVector,
  border,
  titleTopBar,
  setActivePage
}: TopBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = React.useState("");
  const [modalLogout, setModalLogout] = useState(false);
  const [role, setRole] = useState("");
  const logo = logoColor;
  const router = useRouter();

  const handleMyAccount = () => {
    {role === "Admin" ? setActivePage("User Profile") : router.push("/pages/profile")}
    setIsModalOpen(false);
  };

  const handleOpenModalLogout = () => {
    setIsModalOpen(false); 
    setModalLogout(true);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isModalOpen) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModalAvatar = () => {
    setIsModalOpen(false);
  };
  const userLogout = () => {
    setModalLogout(false);
    localStorage.removeItem("token");
    router.push("/");
  };

  const cancelLogout = () => {
    setModalLogout(false);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      if (isModalOpen) {
        closeModalAvatar();
      }
      if (modalLogout) {
        cancelLogout();
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsername(res.data.username);
        setRole(res.data.role);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="z-20">
      <div
        className={`text-[#000150] py-4 px-8 md:bg-transparent bg-white ${border}`}
      >
        <div
          className={`flex justify-between items-center text-xl font-semibold ${
            role == "Admin" ? "pl-6 md:pl-0" : "pl-0"
          }`}
        >
          {titleTopBar ? (
            titleTopBar
          ) : (
            <div className="flex flex-row gap-1">
              <div className="flex items-center">
                <Image
                  src="/white-vector.png"
                  width={20}
                  height={22}
                  style={{ height: "auto", width: "auto" }}
                  alt="logo"
                  className={`${imgWhiteVector}`}
                />
                <Image
                  src="/Vector.png"
                  width={20}
                  height={22}
                  alt="logo"
                  className={`${imgVector}`}
                />
              </div>
              <p className={`text-lg font-bold md:${logo}`}>Logoipsum</p>
            </div>
          )}

          <div className="flex flex-row gap-2 items-center text-sm">
            <div onClick={openModal}>
              <Avatar name={username} />
            </div>
            <div
              className={`hidden md:block text-md md:underline ${colorUsername}`}
            >
              {username}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="absolute top-14 right-6 mt-2 bg-white rounded-md shadow-md w-40 flex flex-col z-50"
          onClick={(e) => e.stopPropagation()} 
        >
          <button
            onClick={handleMyAccount}
            className="px-4 py-2 text-left hover:bg-gray-100 rounded-md"
          >
            My Account
          </button>

          <button
            onClick={handleOpenModalLogout}
            className="px-4 py-2 text-left hover:bg-gray-100 rounded-md text-red-500"
          >
            Logout
          </button>
        </div>
      )}

      {modalLogout && (
        <ModalLogout
          userLogout={userLogout}
          cancelLogout={cancelLogout}
          handleOutsideClick={handleOutsideClick}
        />
      )}
    </div>
  );
};

export default TopBar;
