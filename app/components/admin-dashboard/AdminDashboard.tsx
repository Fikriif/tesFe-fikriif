"use client";

import React, { useEffect } from "react";
import TopBar from "../TopBar";
import Sidebar from "../Sidebar";
import ModalLogout from "../ModalLogout";
import { useRouter } from "next/navigation";
import ArticlesAdmin from "./ArticlesAdmin";
import EditArticles from "./EditArticles";
import AddArticles from "./AddArticles";
import CategoryAdmin from "./CategoryAdmin";
import Profile from "./Profile";

const AdminDashboard = () => {
  const [activePage, setActivePage] = React.useState("Articles");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [articleId, setArticleId] = React.useState<string | null>("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const router = useRouter();


  const handleSetActivePage = (page: string, id?: number) => {
    if (page === "logout") {
      setIsLogoutModalOpen(true);
    } else {
      setActivePage(page);
      if (page === "edit-article" && id) {
        setArticleId(String(id));
      }
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "Articles":
        return (
          <div>
            <ArticlesAdmin
              setActivePage={handleSetActivePage}
              setArticleId={setArticleId}
            />
          </div>
        );
      case "Edit-article":
        return (
          <div>
            {articleId ? (
              <EditArticles
                articleId={articleId}
                setActivePage={handleSetActivePage}
              />
            ) : null}
          </div>
        );
      case "Add-article":
        return (
          <div>
            <AddArticles setActivePage={handleSetActivePage} />
          </div>
        );
      case "Category":
        return <div>
          <CategoryAdmin />
        </div>;
      case "User Profile":
        return <div>
          <Profile setActivePage={handleSetActivePage}/>
        </div>;
      default:
        return null;
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <div
        className={`fixed top-0 left-0 z-40 bg-blue-600 text-white w-64 min-h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar setActivePage={handleSetActivePage} />
      </div>

      <div className="flex flex-col w-full">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className=" text-black border-b border-gray-300">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden absolute top-4 left-4 z-30 p-2"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <TopBar
            titleTopBar={activePage}
            setActivePage={handleSetActivePage}
          />
        </div>

        <div className="flex-1 p-4">{renderContent()}</div>
      </div>
      {isLogoutModalOpen && (
        <ModalLogout
          userLogout={handleConfirmLogout}
          cancelLogout={handleCancelLogout}
          handleOutsideClick={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
