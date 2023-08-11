import React from 'react';
import productnotfound from '../assets/Images/productnotfound.png';
const Noproducts = () => {
  return (
    <div className="flex flex-col justify-center m-auto mt-10 mb-60 w-screen">
      {' '}
      <img className="m-auto w-40 h-40 opacity-80" src={productnotfound}></img>
      <div className="text-2xl font-main mt-5">No Products Found</div>
    </div>
  );
};

export default Noproducts;
