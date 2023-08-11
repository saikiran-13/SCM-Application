import React, { useState, useContext, useEffect } from 'react';

import Details from './Accordion';

import Producthistory from './Producthistory';
import { makeStyles } from '@material-ui/core/styles';
import ModalComponent from './Modal';
import { Appcontext } from '../App';

import '../App.css';
import Noproducts from './Noproducts';

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    fontSize: '16px',
    maxWidth: '300px',
  },
}));

const VerifiedProducts = ({ admin, searchText, handleStartConfetti }) => {
  const classes = useStyles();
  const { selectedProduct, setSelectedProduct } = useContext(Appcontext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showHistoryIndex, setShowHistoryIndex] = useState(null);
  const [productHistory, setProductHistory] = useState(null);
  const [showContent, setShowContent] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem('Storetoken');
      let verifiedProducts = await fetch('http://localhost:5000/showProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${token}`,
        },
      });
      verifiedProducts = await verifiedProducts.json();
      setProducts(verifiedProducts);
      setFilteredProducts(verifiedProducts); // Initialize filteredProducts with all products
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = products?.map((product) => ({ ...product })); // Create a copy

    if (searchText) {
      filteredProducts = filteredProducts?.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else {
      filteredProducts = products?.map((product) => ({ ...product })); // Revert to the original copy
    }

    console.log(searchText, products, filteredProducts);
    setFilteredProducts(filteredProducts); // Update the filteredProducts state
  }, [searchText]);

  const handleHistoryClick = async (index, product) => {
    const token = localStorage.getItem('Storetoken');
    const response = await fetch(
      `http://localhost:5000/productHistory/${product.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      },
    );
    const history = await response.json();
    const inputArray = history[0].history;
    const mergedArray = inputArray
      .map((element, index) => {
        if (index % 2 === 0) {
          const nextElement = inputArray[index + 1];
          if (nextElement && index !== inputArray.length - 1) {
            return { element, nextElement };
          } else {
            return { element };
          }
        }
      })
      .filter((element) => element !== undefined);

    console.log(mergedArray);
    setProductHistory(mergedArray);
    setSelectedProduct(product);
    setShowHistoryIndex(showHistoryIndex === index ? null : index);
    setShowContent(true);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToHome = async () => {
    setShowContent(true);
    setShowHistoryIndex(null);
  };

  return (
    <div className="overflow-x-hidden">
      {filteredProducts?.length ? (
        <div className="w-auto  grid grid-cols-1 place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 p-2 px-10  my-20 mx-14 py-10">
          {filteredProducts?.map((product, key) => {
            const isRotated = showHistoryIndex === key;
            const isContentVisible = showContent && !isRotated;

            return (
              <div
                key={key}
                className={`glassmorphism-form min-h-[450px] h-auto flex flex-col justify-center items-center gap-2 bg-light border-2 border-black 
            font-main w-80 rounded-3xl text-xl mx-auto py-5 my-10 
            transform ${
              isRotated
                ? 'rotate-y-180 transition-transform duration-300 ease-in-out'
                : 'rotate-y-0 transition-transform duration-300 ease-in-out'
            }`}
              >
                {isContentVisible && (
                  <>
                    <span className="text-creamblue font-bold">
                      {product.name}
                    </span>
                    <img
                      className="h-60 w-45"
                      src={product?.image}
                      alt={product.name}
                    />
                  </>
                )}

                {/* Show Details component only when content is visible */}
                {isContentVisible && (
                  <div className="bg-lightblue">
                    {' '}
                    <Details Product={product} />{' '}
                  </div>
                )}

                {/* Show buttons only when content is visible */}
                {!admin ? (
                  <button
                    onClick={() => {
                      handleOpenModal(product);
                    }}
                    className="bg-black text-white px-10 py-2 mt-2 rounded-xl text-md font-bold"
                  >
                    Buy Product
                  </button>
                ) : (
                  isContentVisible && (
                    <div>
                      <button
                        className="bg-black text-white px-8 py-2 mt-2 rounded-xl font-bold"
                        onClick={() => handleHistoryClick(key, product)}
                      >
                        {isRotated ? 'Product' : 'Product History'}
                      </button>
                    </div>
                  )
                )}

                {/* Show "Back to Home" button only when content is hidden */}
                {admin && !isContentVisible && (
                  <Producthistory
                    handleClick={handleBackToHome}
                    history={productHistory}
                  />
                )}
              </div>
            );
          })}

          {!selectedProduct?.transited && (
            <ModalComponent
              Product={selectedProduct}
              operation={'Buy Product'}
              open={isModalOpen}
              onCloseModal={handleCloseModal}
              organization={'Store'}
              handleStartConfetti={handleStartConfetti}
            />
          )}
        </div>
      ) : (
        <Noproducts />
      )}
    </div>
  );
};

export default VerifiedProducts;
