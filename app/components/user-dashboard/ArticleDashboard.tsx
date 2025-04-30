"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  user: {
    username: string;
  };
  category: {
    name: string;
  };
}

const ArticleDashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
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
        const totalPagesCalculated = Math.ceil(res.data.total / limit);
        setTotalPages(totalPagesCalculated);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [currentPage, limit]);

  return (
    <div>
      <div className="p-4 text-gray-600">{`Showing: ${articles.length} of ${totalArticles} Artikel`}</div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-2 ">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/pages/article/${article.id}`}
              className="w-80 rounded-lg overflow-hidden shadow-md bg-white"
            >
              <div className="h-44 relative">
                <Image
                  src={article.imageUrl || "/bgHeader.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {article.content}
                </p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{article.user.username}</span>
                  <span>{article.category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
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
    </div>
  );
};

export default ArticleDashboard;
