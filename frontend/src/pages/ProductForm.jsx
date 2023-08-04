import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductForm from '../components/form';
import Factory from '../assets/Images/Factory.png';
import { useContext } from 'react';
import { Appcontext } from '../App';

const Product = () => {
  const { productDetails } = useContext(Appcontext);
  console.log(productDetails.id);
  //check the productid in the database if doesn't exists,set data to null
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // You can handle updating the product data here
  };
  return (
    <div>
      <Header logoPath={Factory} logo={'Factory'} text={'Home'} />
      <ProductForm product={productDetails} onSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
};

export default Product;
