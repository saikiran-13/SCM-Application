import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WarehousePath from '../assets/Images/Warehouse.png';
import QualityControl from '../components/QualityControl';
import Dropdown from '../components/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Qualitycheck = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer />
      <Header logoPath={WarehousePath} logo={'Warehouse'} text={'Home'} />
      <QualityControl />
      <Footer />
    </div>
  );
};

export default Qualitycheck;
