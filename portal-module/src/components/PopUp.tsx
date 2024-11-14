import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isConfirm?: boolean;  // Optional to control if a confirmation button is needed
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose, onConfirm, isConfirm = true }) => {
  const openModal = () => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    modal.close();
    onClose(); // Optionally trigger a close action from the parent
  };

  return (
    <div>
      {/* Trigger button for modal */}
      <button className="btn" onClick={openModal}>Open Modal</button>

      {/* Modal Structure */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>

          <div className="modal-action">
            {/* Confirmation Button */}
            {isConfirm && (
              <button className="btn btn-success" onClick={onConfirm}>
                Confirm
              </button>
            )}

            {/* Close Button */}
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
