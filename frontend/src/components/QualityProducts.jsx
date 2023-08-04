import React from 'react';
import { Qualitycheckedproducts } from '../utils/constants/product';

import { useState } from 'react';
import { set } from 'zod';
const QualityProducts = () => {
  const [symbol, setSymbol] = useState('');
  return (
    <div>
      {' '}
      <div className="w-auto grid grid-cols-1 bg-lightblue place-items-center phone:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3  grid-gap-5 font-medium rounded-3xl p-10 my-20 mx-14 ">
        {Qualitycheckedproducts.map((product, key) => {
          return (
            <div
              key={key}
              className="flex flex-col items-center gap-2 bg-white font-main  w-80 rounded-3xl text-xl mx-auto py-5 my-10"
            >
              <span className="text-creamblue font-bold ">{product.name}</span>
              <img className="h-60 w-45" src={product.url} alt={product.name} />
              <span
                className={
                  product.status === 'Verified' ? 'text-lightgreen' : 'text-red'
                }
              >
                {product.status === 'Verified' ? '✓' : '✗'} {product.status}
              </span>

              <button
                //   onClick={() => {
                //     handleClick(product.operation);
                //   }}
                className={`${
                  product.operation === 'Transfer'
                    ? 'bg-black text-white '
                    : 'text-darkblue  cursor-not-allowed'
                } w-48 h-auto px-5 py-1 rounded-lg text-lg flex items-center justify-center`}
              >
                {product.operation == 'Transited' && (
                  <div className="mr-2 bg-darkblue w-2 h-2 rounded-full"></div>
                )}

                {product.operation}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QualityProducts;
