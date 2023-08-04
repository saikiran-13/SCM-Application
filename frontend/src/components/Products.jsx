import React from 'react';
import { products } from '../utils/constants/product';
import Details from '../components/Accordion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalComponent from './Modal';
import { useContext } from 'react';
import { Appcontext } from '../App';
const Products = () => {
  const { productDetails, setProductDetails } = useContext(Appcontext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProductDetails = (product) => {
    setProductDetails({
      id: 1 || '',
      name: 'Oneplus 7T' || '',
      image: 'http://dsfjaksjfkfsakdfl.com' || '',
      battery: '5000mAh' || '',
      camera: '64MP' || '',
      price: 16000 || '',
    });
  };

  const navigateTo = useNavigate();
  function handleClick(operation) {
    if (operation === 'Defective') {
      navigateTo('/createProduct');
    } else {
      handleOpenModal();
    }
  }

  return (
    <div className="w-auto grid grid-cols-1 place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 p-2 px-10 glassmorphism-form my-20 mx-14 py-10">
      {products.map((product, key) => {
        return (
          <div
            key={key}
            className="flex flex-col items-center gap-2 bg-lightblue font-main  w-80 rounded-3xl text-xl mx-auto py-5 my-10"
          >
            <span className="text-creamblue font-bold ">{product.name}</span>
            <img className="h-60 w-45" src={product.url} alt={product.name} />
            <Details />
            <button
              onClick={() => {
                if (product.status === 'Defective') {
                  handleProductDetails(product);
                }
                handleClick(product.status);
              }}
              className={`${
                product.status === 'Transfer'
                  ? 'bg-black text-white '
                  : product.status === 'Defective'
                  ? 'bg-red text-white '
                  : 'text-lightgreen  cursor-not-allowed'
              } w-48 h-auto px-5 py-1 rounded-lg text-lg flex items-center justify-center`}
            >
              {product.status == 'Transferred' && (
                <div className="mr-2 bg-lightgreen w-2 h-2 rounded-full"></div>
              )}

              {product.status}
            </button>
          </div>
        );
      })}
      <ModalComponent
        operation={'Transfer Product'}
        open={isModalOpen}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Products;
