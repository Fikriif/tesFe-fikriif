import axios from "axios";
import { useState } from "react";

interface ModalDeleteProps {
  id: string;
  onClose: () => void;
  parameter: string;
  onSuccess: () => void;
  title: string;
  content: string;
  buttonText: string;
  bgButton: string;
}

const ModalEdit = ({
  id,
  onClose,
  parameter,
  onSuccess,
  title,
  content,
  buttonText,
  bgButton,
}: ModalDeleteProps) => {
    const [contentEdit, setContentEdit] = useState(content);
  const token = localStorage.getItem("token");
  const handleEdit = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/${parameter}/${id}`,{
            name: contentEdit
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <div className="text-lg font-semibold py-4">{title}</div>
        <div className="text-md font-semibold">Category</div>
        <p className="w-full">
            <input type="text" value={contentEdit} onChange={(e) => setContentEdit(e.target.value)} className="border border-gray-300 rounded-md w-full p-2" />
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="mt-4 py-1 px-4 rounded-md bg-white border"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            className={`mt-4 py-1 px-4 rounded-md text-white ${bgButton}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
