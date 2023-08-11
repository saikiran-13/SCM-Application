import React, { useEffect } from 'react';
import ModalComponent from './Modal';
import { useContext, useState } from 'react';
import { Appcontext } from '../App';
import Noproducts from './Noproducts';
const QualityProducts = () => {
  const { products, setProducts, selectedProduct, setSelectedProduct } =
    useContext(Appcontext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem('WareHousetoken');
      const response = await fetch('http://localhost:5000/showProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();

      const updatedResponse = data.map((product) => {
        if (
          (product.location === 'Factory' && product.status === 'Defective') ||
          (product.location === 'Store' && product.status === 'Verified')
        ) {
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

  const handleClick = (product) => {
    setSelectedProduct(product);

    if (product?.status === 'Defective') {
      setSelectedProduct(product);
      handleOpenModal();
    } else if (product?.status === 'Verified') {
      handleOpenModal();
    } else if (product?.status === 'Transited') {
    } else {
    }
  };

  return (
    <div>
      {' '}
      {products?.length ? (
        <div className="w-auto grid grid-cols-1 bg-lightblue place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 font-medium rounded-3xl p-10 my-20 mx-14 ">
          {products?.map((product, key) => {
            let status =
              product.status === 'Sold' ? 'Verified' : product.status;
            product = { ...product, status };
            return (
              <div
                key={key}
                className="flex flex-col items-center gap-2 bg-white font-main  w-80 rounded-3xl text-xl mx-auto py-5 my-10"
              >
                <span className="text-creamblue font-bold ">
                  {product.name}
                </span>
                <img
                  className="h-60 w-45"
                  src={product?.image}
                  alt={product.name}
                />
                <span
                  className={
                    product.status === 'Verified'
                      ? 'text-lightgreen'
                      : 'text-red'
                  }
                >
                  {product.status === 'Verified' ? '✓' : '✗'} {product.status}
                </span>

                <button
                  onClick={() => {
                    handleClick(product);
                  }}
                  className={`${
                    !product?.transited
                      ? 'bg-black text-white '
                      : 'text-darkblue  cursor-not-allowed'
                  } w-48 h-auto px-5 py-1 rounded-lg text-lg flex items-center justify-center`}
                >
                  {product?.transited && (
                    <div className="mr-2 bg-darkblue w-2 h-2 rounded-full"></div>
                  )}

                  {product?.transited ? 'Transited' : 'Transfer'}
                </button>
              </div>
            );
          })}

          {!selectedProduct?.transited && (
            <ModalComponent
              Product={selectedProduct}
              operation={'Transfer Product'}
              open={isModalOpen}
              onCloseModal={handleCloseModal}
              organization={'WareHouse'}
            />
          )}
        </div>
      ) : (
        <Noproducts />
      )}
    </div>
  );
};

export default QualityProducts;
