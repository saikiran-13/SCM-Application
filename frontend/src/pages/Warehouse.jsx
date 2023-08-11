import React from 'react';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import WarehousePath from '../assets/Images/Warehouse.png';
import QualityProducts from '../components/QualityProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Warehouse = () => {
  return (
    <div>
      <ToastContainer />
      <Header
        logoPath={WarehousePath}
        logo={'Warehouse'}
        text={'Quality Control'}
      />
      <div className="flex flex-col justify-center font-main ">
        <h1 className="text-7xl font-bold tracking-widest text-primary">
          Quality Assured Mobiles
        </h1>
        <span className="text-black tracking-wider text-5xl mt-10  ">
          Our Dedicated Approach to Mobile Quality Assurance
        </span>
      </div>
      <div className="flex justify-center items-center font-main tracking-wider mt-10">
        <div className="bg-lightnavyblue px-10 py-2 rounded-full flex gap-3 items-center">
          <span className="text-xl text-white font-bold ">
            Quality Checked Products
          </span>
          <FontAwesomeIcon
            icon={faFilter}
            style={{ fontSize: '18px', color: 'white' }}
          />
        </div>
      </div>
      <QualityProducts />

      <Footer />
    </div>
  );
};

export default Warehouse;
