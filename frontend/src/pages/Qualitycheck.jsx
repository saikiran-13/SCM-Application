import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WarehousePath from '../assets/Images/Warehouse.png';
import QualityControl from '../components/QualityControl';
import Dropdown from '../components/Dropdown';

const Qualitycheck = () => {
  return (
    <div>
      <Header logoPath={WarehousePath} logo={'Warehouse'} text={'Home'} />
      <QualityControl />
      <Footer />
    </div>
  );
};

export default Qualitycheck;
