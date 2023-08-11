import React from 'react';
import Modal from '@material-ui/core/Modal';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Appcontext } from '../App';
import Loader from '../utils/loader';
import { toastify } from '../utils/toastify';
import Confetti from 'react-confetti';
import '../App.css';

const ModalComponent = ({
  Product,
  open,
  onCloseModal,
  operation,
  organization,
  handleStartConfetti,
}) => {
  const location = useLocation();
  const { loading, setLoading } = useContext(Appcontext);
  console.log(location, Product, '............................');
  const token = localStorage.getItem('Storetoken');
  let username;

  try {
    const decodedToken = jwtDecode(token);
    username = decodedToken.username;
    if (username) {
      Product = { ...Product, name: username };
    }
    console.log('Decoded Token:', decodedToken);
  } catch (error) {
    console.error('Error decoding token:', error);
  }
  const linkMap = {
    '/factory': 'createAndTransferProduct',
    '/warehouse': 'verifyAndTransferProduct',
    '/store': 'sellProduct',
  };

  async function handleModal() {
    setLoading(true);
    const token = localStorage.getItem(`${organization}token`);
    const response = await fetch(
      `http://localhost:5000/${linkMap[location.pathname]}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...Product, operation: 'transfer' }),
      },
    );

    console.log('hoooooooooooooooooooooooooooo', await response.json());
    setTimeout(() => {
      setLoading(false);
      if (response.status == 200) {
        toastify(
          'success',
          location.pathname === '/store'
            ? 'Product Sold Successfully'
            : 'Product Transfered successfully',
        );
        try {
          handleStartConfetti();
        } catch (error) {}
      } else {
        toastify('error', 'Product Transfer failed');
      }

      onCloseModal();
    }, 1000);
  }
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center mb-40"
    >
      <div className="modal-container bg-white  rounded-lg w-1/4 mx-auto mt-40 font-main text-xl ">
        <h2 id="modal-title" className="text-xl p-4 font-bold ">
          {operation}
        </h2>
        <div className="w-full bg-black h-0.5"></div>
        <p id="modal-description" className="text-gray-600 mb-8 p-4 pb-2">
          {location.pathname === '/store'
            ? 'Are you sure you want to buy the product?'
            : 'Are you sure you want to transfer the product?'}
        </p>
        <div className="flex justify-end space-x-4 font-main font-bold pb-4 pr-4 text-lg ">
          <button
            className="bg-gray-600 text-black px-4 py-2 rounded tracking-wider"
            onClick={onCloseModal}
          >
            Cancel
          </button>
          <button
            className="flex justify-center items-center bg-blue-600 tracking-wider  text-white bg-black px-4 py-2 rounded"
            onClick={handleModal}
          >
            {loading && <Loader />}
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
