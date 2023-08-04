import React from 'react';
import Modal from '@material-ui/core/Modal';

const ModalComponent = ({ open, onCloseModal, operation }) => {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center mb-40"
    >
      <div className="modal-container bg-white p-4 rounded-lg w-96 mx-auto mt-40">
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {operation}
        </h2>
        <p id="modal-description" className="text-gray-600 mb-8">
          Please confirm your purchase.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-600 text-black px-4 py-2 rounded"
            onClick={onCloseModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white bg-black px-4 py-2 rounded"
            onClick={() => {
              // Add your logic for confirming the purchase here
              onCloseModal();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
