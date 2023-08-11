import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductForm from '../components/form';
import Factory from '../assets/Images/Factory.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  return (
    <div>
      <ToastContainer />
      <Header logoPath={Factory} logo={'Factory'} text={'Home'} />
      <ProductForm />
      <Footer />
    </div>
  );
};

export default Product;
