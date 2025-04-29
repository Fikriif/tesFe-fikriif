"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { set } from "react-hook-form";
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
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/articles`,
          {
            params: {
              page: 1,
              limit: 10,
              categoryId: selectedCategoryId || undefined, // hanya dikirim kalau ada kategori
            },
          }
        );
        setArticles(res.data.data);
        setTotalArticles(res.data.total);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [selectedCategoryId]);

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
    </div>
  );
};

export default ArticleDashboard;
