import React, { useState, useContext } from 'react';
import { Verifiedproducts } from '../utils/constants/product';
import { Tooltip } from '@mui/material';
import Details from './Accordion';
import { producthistory } from '../utils/constants/product';
import { makeStyles } from '@material-ui/core/styles';
import ModalComponent from './Modal';

import '../App.css';

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    fontSize: '16px',
    maxWidth: '300px',
  },
}));

const VerifiedProducts = ({ admin }) => {
  const classes = useStyles();

  console.log(producthistory[1][0].From);
  const [showHistoryIndex, setShowHistoryIndex] = useState(null);
  const [showContent, setShowContent] = useState(true);
  const [productState, setProductState] = useState('created');
  const [isModalOpen, setIsModalOpen] = useState(false); // Add the state for the modal

  const handleHistoryClick = (index) => {
    setShowHistoryIndex(showHistoryIndex === index ? null : index);
    setShowContent(true);
  };

  const handleBackToHome = () => {
    setShowContent(true);
    setShowHistoryIndex(null);
  };

  const handleStateChange = (state) => {
    setProductState(state);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-auto grid grid-cols-1 place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 p-2 px-10  my-20 mx-14 py-10">
      {Verifiedproducts.map((product, key) => {
        const isRotated = showHistoryIndex === key;
        const isContentVisible = showContent && !isRotated;

        return (
          <div
            key={key}
            className={`glassmorphism-form h-auto flex flex-col  items-center gap-2 bg-lightblue border-2 border-black 
            font-main w-80 rounded-3xl text-xl mx-auto py-5 my-10 
            transform ${
              isRotated
                ? 'rotate-y-180 transition-transform duration-300 ease-in-out'
                : 'rotate-y-0 transition-transform duration-300 ease-in-out'
            }`}
          >
            {/* Show product name and image only when content is visible */}
            {isContentVisible && (
              <>
                <span className="text-creamblue font-bold">{product.name}</span>
                <img
                  className="h-60 w-45"
                  src={product.url}
                  alt={product.name}
                />
              </>
            )}

            {/* Show Details component only when content is visible */}
            {isContentVisible && (
              <div className="bg-lightblue">
                <Details />
              </div>
            )}

            {/* Show buttons only when content is visible */}
            {!admin ? (
              <button
                onClick={() => {
                  console.log('hello');
                  handleOpenModal();
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
                    onClick={() => handleHistoryClick(key)}
                  >
                    {isRotated ? 'Product' : 'Product History'}
                  </button>
                </div>
              )
            )}

            {/* Show "Back to Home" button only when content is hidden */}
            {admin && !isContentVisible && (
              <div className="flex flex-col rounded-xl justify-around items-center rotate-y-180 transition-transform duration-300 ease-in-out">
                <div className=" text-black w-fit mb-5  px-5 py-1 rounded-xl font-main font-bold">
                  Product History
                </div>
                <Tooltip
                  placement="top"
                  classes={{ tooltip: classes.customTooltip }}
                  describeChild
                  title={`From: ${producthistory[1][0].From}\nTo:${producthistory[1][0].To}\nTimestamp:${producthistory[1][0].Timestamp}`}
                >
                  <div className="text-white bg-creamblue  w-36 px-5 py-1 rounded-full">
                    Created
                  </div>
                </Tooltip>
                <div className="h-5 w-0.5 bg-lightgreen"></div>
                <Tooltip
                  placement="top"
                  classes={{ tooltip: classes.customTooltip }}
                  describeChild
                  title={`From: ${producthistory[1][1].From}\nTo:${producthistory[1][1].To}\nTimestamp:${producthistory[1][1].Timestamp}`}
                >
                  <div className="text-white bg-creamblue  w-36 px-5 py-1 rounded-full">
                    Defective
                  </div>
                </Tooltip>
                <div className="h-5 w-0.5 bg-lightgreen"></div>
                <Tooltip
                  placement="top"
                  classes={{ tooltip: classes.customTooltip }}
                  describeChild
                  title={`From: ${producthistory[1][2].From}\nTo:${producthistory[1][2].To}\nTimestamp:${producthistory[1][2].Timestamp}`}
                >
                  <div className="text-white bg-creamblue  w-36 px-5 py-1 rounded-full">
                    Updated
                  </div>
                </Tooltip>
                <div className="h-5 w-0.5 bg-lightgreen"></div>
                <Tooltip
                  placement="top"
                  classes={{ tooltip: classes.customTooltip }}
                  describeChild
                  title={`From: ${producthistory[1][3].From}\nTo:${producthistory[1][3].To}\nTimestamp:${producthistory[1][3].Timestamp}`}
                >
                  <div className="text-white bg-creamblue w-36  px-5 py-1 rounded-full">
                    Verified
                  </div>
                </Tooltip>
                <button
                  className="bg-black text-white px-10 py-2 mt-10 rounded-xl text-md font-bold "
                  onClick={handleBackToHome}
                >
                  View Product
                </button>
              </div>
            )}
          </div>
        );
      })}
      <ModalComponent
        operation={'Buy Product'}
        open={isModalOpen}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default VerifiedProducts;
