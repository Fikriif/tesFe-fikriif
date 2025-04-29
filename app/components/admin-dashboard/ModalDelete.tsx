import axios from "axios";

interface ModalDeleteProps {
  id: string;
  onClose: () => void;
  parameter: string;
  onSuccess: () => void
  title: string
  content: string
  buttonText: string
  bgButton: string
}

const ModalDelete = ({ id, onClose, parameter,onSuccess, title, content, buttonText, bgButton }: ModalDeleteProps) => {
    const token = localStorage.getItem('token');
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${parameter}/${id}`, {
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
        <div className="text-lg font-semibold">{title}</div>
        <p className="mt-4">{content}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="mt-4 py-1 px-4 rounded-md bg-white border"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`mt-4 py-1 px-4 rounded-md text-white ${bgButton}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
