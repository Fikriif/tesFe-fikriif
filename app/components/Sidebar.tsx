import Image from "next/image";
import React from "react";

interface Props {
  setActivePage: (page: string) => void;
}

const Sidebar = ({ setActivePage }: Props) => {
  return (
    <div>
      <nav className="flex flex-col p-4 gap-4 overflow-y-auto">
        <div className="flex flex-row gap-2 py-3">
          <Image src={"/white-vector.png"} width={20} height={20} alt="logo" />
          <p className="text-white font-semibold">Logoipsum</p>
        </div>
        <button
          onClick={() => setActivePage("Articles")}
          className="hover:bg-blue-500 p-2 rounded"
        >
          <div className="flex flex-row gap-2">
            <div className="flex items-center">
              <Image src={"/newspaper.png"} width={14} height={14} alt="logo" />
            </div>
            Articles
          </div>
        </button>
        <button
          onClick={() => setActivePage("Category")}
          className="hover:bg-blue-500 p-2 rounded"
        >
          <div className="flex flex-row gap-2">
            <div className="flex items-center">
              <Image src={"/tag.png"} width={14} height={14} alt="logo" />
            </div>
            Category
          </div>
        </button>
        <button
          onClick={() => setActivePage("logout")}
          className="hover:bg-blue-500 p-2 rounded"
        >
          <div className="flex flex-row gap-2">
            <div className="flex items-center">
              <Image src={"/log-out.png"} width={14} height={14} alt="logo" />
            </div>
            <div>Logout</div>
          </div>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
