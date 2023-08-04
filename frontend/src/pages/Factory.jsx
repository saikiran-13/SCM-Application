import React from 'react';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../utils/constants/product';
import Details from '../components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Products from '../components/Products';
import FactoryPath from '../assets/Images/Factory.png';

const Factory = () => {
  const navigateTo = useNavigate();
  const [btnText, setBtnText] = useState('CreateProduct');
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        {' '}
        <Header
          logoPath={FactoryPath}
          logo={'Factory'}
          text={'Create Product'}
        />
        <div>
          <div className="flex flex-col font-main ">
            <h1 className="text-7xl font-bold tracking-widest text-primary">
              Building the Future of Mobile Technology
            </h1>
            <span className="text-secondary tracking-wider text-2xl mt-5 text-left pl-56">
              Designing Mobiles For Today's Connected World
            </span>
          </div>
          <div className="flex justify-center items-center font-main tracking-wider mt-10">
            <div className="bg-lightnavyblue px-10 py-2 rounded-full flex gap-3 items-center">
              <span className="text-xl text-white font-bold ">
                Products List
              </span>
              <FontAwesomeIcon
                icon={faFilter}
                style={{ fontSize: '18px', color: 'white' }}
              />
            </div>
          </div>
          <Products />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Factory;
