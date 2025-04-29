"use client";

import axios from "axios";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalDelete from "./ModalDelete";

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  user: {
    username: string;
  };
  username: string;
  category: {
    name: string;
  };
  name: string;
}

interface ArticlesAdminProps {
  setActivePage: (page: string) => void;
  setArticleId: (id: string) => void;
}
const ArticlesAdmin = ({ setActivePage, setArticleId }: ArticlesAdminProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [id, setId] = useState("");
  const [limit] = useState<number>(10);

  const handleEditClick = (id: string) => {
    setActivePage("Edit-article");
    setArticleId(id);
  };
  const handleDeleteClick = (id: string) => {
    setIsModalDeleteOpen(true);
    setId(id);
  };

  const handleAddClick = () => {
    setActivePage("Add-article");
  };

  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        {
          params: {
            page: currentPage,
            limit: limit,
          },
        }
      );
      setArticles(res.data.data);
      setTotalArticles(res.data.total);
      // setTotalPages(res.data.page);

      const totalPagesCalculated = Math.ceil(res.data.total / limit);
      setTotalPages(totalPagesCalculated);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="rounded-md border border-gray-300 bg-white">
      <div className="border-b border-gray-300 rounded-t-md bg-white">
        <div className="p-4">{`Total Articles : ${totalArticles}`}</div>
      </div>
      <div className="p-2 flex justify-end">
        <button
          type="button"
          onClick={handleAddClick}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          + Add Articles
        </button>
      </div>
      <table className="min-w-full border border-gray-300 py-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Thumbnails</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
          {articles.map((article) => (
            <tr key={article.id} className="py-2">
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex justify-center">
                  <Image
                    src={article.imageUrl || "/bgHeader.jpg"}
                    alt="Thumbnail"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {article.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {article.category.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex flex-row gap-2">
                  <span>
                    <Link
                      href={`/pages/article/${article.id}`}
                      className="underline text-blue-500"
                    >
                      Preview
                    </Link>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEditClick(article.id)}
                    className="underline text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(article.id)}
                    className="underline text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 py-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md"
        >
          {"<"} Previous
        </button>
        <span className="px-4 py-2">
          Page{" "}
          <span className="border border-gray-400 rounded-sm py-3 px-4">
            {currentPage}
          </span>{" "}
          of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md"
        >
          Next {">"}
        </button>
      </div>

      {isModalDeleteOpen && (
        <ModalDelete
          parameter="articles"
          id={id}
          onClose={() => setIsModalDeleteOpen(false)}
          onSuccess={fetchArticles}
          title="Delete Article"
          content="Are you sure you want to delete this article?"
          buttonText="Delete"
          bgButton="bg-red-500"
        />
      )}
    </div>
  );
};

export default ArticlesAdmin;
