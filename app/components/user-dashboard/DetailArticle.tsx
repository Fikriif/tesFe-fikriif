"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import TopBar from "@/app/components/TopBar";
import Image from "next/image";
import FooterUserDashboard from "@/app/components/user-dashboard/FooterUserDashboard";

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  user: {
    username: string;
  };
  category: {
    name: string;
  };
}

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const params = useParams();
  const articleId = params.id as string;

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`
          );
          setArticle(res.data);
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };

      fetchArticle();
    }
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div>
          <TopBar
            imgWhiteVector="hiden md:block"
            logoColor="text-black"
            colorUsername="text-black"
            border="border-b border-gray-300"
            setActivePage={() => {}}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-gray-500 text-sm py-6">
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            • Created by {article.user.username}
          </div>
          <div className="font-semibold text-2xl max-w-3/4 pb-4 text-center">
            {article.title}
          </div>
          <div className="relative md:w-[920px] md:h-[380px] w-[300px] h-[200px] ">
            <Image
              src={article.imageUrl || "/bgHeader.jpg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="py-6 text-gray-700 text-center">
            {article.content}
          </div>
        </div>
      </div>

      <FooterUserDashboard />
    </div>
  );
};

export default ArticleDetail;
