import axios from "axios";
import { useState } from "react";

interface ModalAddCategoryProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ModalAddCategory = ({ onClose, onSuccess }: ModalAddCategoryProps) => {
    const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const handleAdd = async () => {
    if (!name) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`,{
        name: name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 flex justify-center items-center bg-gray-700/50 z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-4 rounded-md md:w-1/3 w-11/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold">Add Category</div>
        <p className="mt-4">
          Category
        </p>
        <input type="text" placeholder="Input Category" className="mt-1 py-1 px-4 rounded-md w-full border border-gray-300" onChange={(e) => setName(e.target.value)} />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="mt-4 py-1 px-4 rounded-md bg-white border"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="mt-4 py-1 px-4 rounded-md text-white bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCategory;
