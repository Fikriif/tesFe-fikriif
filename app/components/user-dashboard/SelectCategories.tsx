"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

const SelectCategories = ({}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories?page=1&limit=10&search=`
        );
        setCategories(res.data.data); // ambil array kategorinya
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };    

  return (
    <div className="bg-blue-400 p-2 rounded-md flex md:flex-row flex-col gap-2 w-full text-sm">
      <select className="border p-2 pr-10 rounded-md text-gray-700 bg-white" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="relative">
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <Image src="/search.png" width={16} height={16} alt="search" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Articles"
          className="border p-2 pr-32 pl-6 rounded-md text-gray-700 bg-white"
        />
      </div>
    </div>
  );
};

export default SelectCategories;
