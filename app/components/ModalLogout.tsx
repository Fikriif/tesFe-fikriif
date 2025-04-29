

interface ModalLogoutProps {
    userLogout: () => void;
    cancelLogout: () => void;
    handleOutsideClick: (event: React.MouseEvent) => void
}
const ModalLogout = ({userLogout, cancelLogout, handleOutsideClick} : ModalLogoutProps) => {
  return (
    <div
      className="modal-overlay fixed inset-0 flex justify-center items-center bg-gray-700/50 z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-4 rounded-md md:w-1/3 w-11/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold">Logout</div>
        <p className="mt-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={cancelLogout}
            className="mt-4 py-1 px-4 rounded-md bg-white border"
          >
            Cancel
          </button>
          <button
            onClick={userLogout}
            className="mt-4 py-1 px-4 rounded-md text-white bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLogout
