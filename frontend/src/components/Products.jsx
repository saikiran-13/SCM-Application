import React, { useState, useContext, useEffect } from 'react';
import Details from '../components/Accordion';
import ModalComponent from './Modal';
import { Appcontext } from '../App';
import { useNavigate } from 'react-router-dom';
import phone from '../../src/assets/Images/phone.webp';
import Noproducts from './Noproducts';

const Products = () => {
  const { setProductDetails, selectedProduct, setSelectedProduct } =
    useContext(Appcontext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem('Factorytoken');
      const response = await fetch('http://localhost:5000/showProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();
      const updatedResponse = data?.map((product) => {
        if (product.location === 'WareHouse' || product.location === 'Store') {
          return { ...product, transited: true };
        }
        return product;
      });
      setProducts(updatedResponse);
    }

    fetchProducts();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = async (product) => {
    if (product?.status === 'Defective') {
      setProductDetails({
        id: product.id,
        name: product.name,
        image: product.image,
        battery: product.battery,
        camera: product.camera,
        price: product.price,
      });
      navigateTo('/createProduct');
    } else if (product?.status === 'Transited') {
    } else {
      setSelectedProduct(product);
      handleOpenModal();
    }
  };

  return (
    <div className="w-auto grid grid-cols-1 place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 p-2 px-10 glassmorphism-form my-20 mx-14 py-10">
      {products?.length ? (
        products?.map((product, key) => (
          <div
            key={key}
            className="flex flex-col items-center gap-2 bg-lightblue font-main  w-80 rounded-3xl text-xl mx-auto py-5 my-10"
          >
            <span className="text-creamblue font-bold ">{product?.name}</span>
            <img
              className="h-60 w-45"
              src={product?.image}
              alt={product?.name}
            />

            <Details Product={product} />
            <button
              onClick={() => {
                handleClick(product);
              }}
              className={`${
                (product?.status === 'Created' ||
                  product?.status === 'Updated') &&
                !product?.transited
                  ? 'bg-black text-white '
                  : product.status === 'Defective'
                  ? 'bg-red text-white '
                  : 'text-lightgreen  cursor-not-allowed'
              } w-48 h-auto px-5 py-1 rounded-lg text-lg flex items-center justify-center`}
            >
              {product?.transited && product?.status != 'Defective' && (
                <div className="mr-2 bg-lightgreen w-2 h-2 rounded-full"></div>
              )}
              {(product?.status === 'Created' ||
                product?.status === 'Updated') &&
              !product?.transited
                ? 'Transfer'
                : product.status === 'Defective'
                ? product.status
                : 'Transited'}
            </button>
          </div>
        ))
      ) : (
        <Noproducts />
      )}

      {!selectedProduct?.transited && (
        <ModalComponent
          Product={selectedProduct}
          operation={'Transfer Product'}
          open={isModalOpen}
          onCloseModal={handleCloseModal}
          organization={'Factory'}
        />
      )}
    </div>
  );
};

export default Products;
