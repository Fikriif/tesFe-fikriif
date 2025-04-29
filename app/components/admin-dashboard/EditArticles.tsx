"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { set } from "lodash";

interface EditArticlesProps {
  articleId: string | null;
  setActivePage: (page: string) => void;
}
interface Category {
  id: string;
  name: string;
}

const EditArticles: React.FC<EditArticlesProps> = ({
  articleId,
  setActivePage,
}) => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleBackArticles = () => {
    setActivePage("Articles");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`
          );
          setArticle(response.data.id);
          setTitle(response.data.title);
          setPreviewImage(response.data.imageUrl);
          setContent(response.data.content);
          setSelectedCategory(response.data.categoryId);
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };

      fetchArticle();
    }
  }, [articleId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories?page=1&limit=10&search=`
        );
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [searchTerm, selectedCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!selectedImage || !title || !content || !selectedCategory) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const resImage = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = resImage.data.imageUrl;

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}`,
        {
          title: title,
          content: content,
          categoryId: selectedCategory,
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Article updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading article.");
    }
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="rounded-md border border-gray-300 bg-white h-screen">
          <button
            type="button"
            className="flex flex-row gap-1 p-4"
            onClick={handleBackArticles}
          >
            <div>
              <Image src="/Frame.png" width={20} height={20} alt="iconBack" />
            </div>
            <p>Edit Articles</p>
          </button>

          <form className="px-6 pt-3" onSubmit={handleSubmit}>
            <div>Thumbnails</div>
            <div>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-50 h-30 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Image
                      src="/uploadGambar.png"
                      alt="Upload Icon"
                      width={20}
                      height={20}
                    />
                    <p className="mt-2 text-sm text-blue-500 underline">
                      Click to select files
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Support File Type : jpg or png
                    </p>
                  </div>
                )}

                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <div className="pt-4">Title</div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Input title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
                />
              </div>
              <div className="py-3">
                <div>Category</div>
                <select
                  className="border border-gray-300 p-2 pr-10 rounded-md text-sm text-gray-500 w-full"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="py-3">
                <textarea
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="w-full h-[200px] border border-gray-300 rounded-md pl-2 pt-2 text-sm"
                  placeholder="Type a content"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleBackArticles}
                className="border border-gray-300 rounded-md py-1 px-3"
              >
                <p>Cancel</p>
              </button>
              <button
                type="button"
                className="border border-gray-300 rounded-md py-1 px-3 bg-gray-300"
              >
                <p>Preview</p>
              </button>
              <button
                type="submit"
                className="border border-gray-300 rounded-md py-1 px-3 bg-blue-500 text-white"
              >
                <p>Upload</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticles;
