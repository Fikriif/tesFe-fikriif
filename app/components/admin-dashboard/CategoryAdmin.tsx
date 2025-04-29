import axios from "axios";
import { useEffect, useState } from "react";
import ModalAddCategory from "./ModalAddCategory";
import { set } from "lodash";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

const CategoryAdmin = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [limit] = useState<number>(10);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddClick = () => {
    setOpenModalAddCategory(true)
  };

  const handleEditClick = (id: string, name: string) => {
    setOpenModalEdit(true);
    setIdCategory(id);
    setNameCategory(name);
  };

  const handleDelete = (id: string) => {
    setOpenModalDelete(true);
    setIdCategory(id);
  }

  const fetchGetCategory = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          params: {
            page: currentPage,
            limit: limit,
            search: "",
          },
        }
      );
      setCategory(res.data.data);
      const totalPagesCalculated = Math.ceil(res.data.totalData / limit);
      setTotalPages(totalPagesCalculated);
    };

  useEffect(() => {
    fetchGetCategory();
  }, [currentPage]);
  return (
    <div className="rounded-md border border-gray-300 bg-white">
      <div className="p-4 border-b-1 border-gray-300">
        Total Category: {category.length}
      </div>
      <div className="flex justify-end p-4">
        <button
          className="py-1 px-4 bg-blue-500 rounded-md text-white"
          type="button"
          onClick={handleAddClick}
        >
          + Add Category
        </button>
      </div>
      <table className="min-w-full border-t border-b border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Category</th>
            <th className="p-4">Created At</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
          {category.map((article) => (
            <tr
              key={article.id}
              className="border-t border-gray-300 text-center"
            >
              <td className="p-4">{article.name}</td>
              <td className="p-4">
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button type="button" className="underline text-blue-500" onClick={() => {handleEditClick(article.id, article.name)}}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="underline text-red-500"
                    onClick={() => {
                      handleDelete(article.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

      {openModalAddCategory ? (
        <ModalAddCategory
          onClose={() => setOpenModalAddCategory(false)}
          onSuccess={fetchGetCategory}
        />
      ) : null}
      {openModalDelete ? (
        <ModalDelete
          id={idCategory}
          onClose={() => setOpenModalDelete(false)}
          onSuccess={fetchGetCategory}
          parameter="categories"
          content="Delete category “Technology”? This will remove it from master data permanently."
          title="Delete Category"
          buttonText="Delete"
          bgButton="bg-red-500"
        />
      ) : null}

      {openModalEdit ? (
        <ModalEdit
          id={idCategory}
          onClose={() => setOpenModalEdit(false)}
          onSuccess={fetchGetCategory}
          parameter="categories"
          content={nameCategory}
          title="Edit Category"
          buttonText="Edit"
          bgButton="bg-blue-500"
        />
      ) : null}
    </div>
  );
};

export default CategoryAdmin;
